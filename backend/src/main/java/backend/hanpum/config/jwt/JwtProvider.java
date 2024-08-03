package backend.hanpum.config.jwt;

import backend.hanpum.config.redis.RedisDao;
import backend.hanpum.domain.auth.dto.responseDto.TokenResDto;
import backend.hanpum.domain.member.enums.MemberType;
import backend.hanpum.exception.exception.auth.TokenExpiredException;
import backend.hanpum.exception.exception.auth.TokenInvalidException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtProvider {

    public static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String AUTHORIZATION_KEY = "type";
    private static final String BEARER_PREFIX = "Bearer ";

    private static final long ACCESS_TOKEN_TIME = 1000 * 60 * 30L; // 30 분 1000ms(=1s) *60=(1min)*30 =(30min)
    private static final long REFRESH_TOKEN_TIME = 1000 * 60 * 60 * 24 * 14L; // 14일

    private final RedisDao redisDao;

    @Value("${jwt.secret.key}")
    private String secretKey;

    private Key key;

    @PostConstruct
    public void init() {
        key = Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (bearerToken != null && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(7);
        }
        return null;
    }

    private String createToken(String email, MemberType role, Long tokenExpireTime) {
        Date date = new Date();
        String token =
                BEARER_PREFIX + Jwts.builder()
                        .claim(AUTHORIZATION_KEY, role)
                        .setSubject(email)
                        .setIssuedAt(date)
                        .setExpiration(new Date(date.getTime() + tokenExpireTime))
                        .signWith(key, SignatureAlgorithm.HS256)
                        .compact();
        return token;
    }

    public TokenResDto createTokenByLogin(String email, MemberType role) {
        String accessToken = createToken(email, role, ACCESS_TOKEN_TIME);
        String refreshToken = createToken(email, role, REFRESH_TOKEN_TIME);
        redisDao.setRefreshToken(email, refreshToken, REFRESH_TOKEN_TIME);
        return new TokenResDto(accessToken, refreshToken);
    }

    public TokenResDto reissueAtk(String email, MemberType role, String reToken) {
        if (!redisDao.getRefreshToken(email).equals(reToken)) {
            throw new TokenInvalidException();
        }
        String accessToken = createToken(email, role, ACCESS_TOKEN_TIME);
        String refreshToken = createToken(email, role, REFRESH_TOKEN_TIME);
        redisDao.setRefreshToken(email, refreshToken, REFRESH_TOKEN_TIME);
        return new TokenResDto(accessToken, refreshToken);
    }

    public String getEmailFromJwt(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            log.info("Invalid JWT token, 만료된 jwt 토큰 입니다.");
            throw new TokenExpiredException();
        } catch (SecurityException | MalformedJwtException |
                 UnsupportedJwtException e) {
            log.info("JWT claims is empty, 잘못된 JWT 토큰 입니다.");
            throw new TokenExpiredException();
        } catch (IllegalArgumentException e) {
            log.info("JWT claims is empty, JWT 클레임이 비어 있습니다.");
            throw new TokenInvalidException();
        }
    }

    public void addToBlacklist(String token) {
        long expiration = getExpiration(token);
        redisDao.setBlackList(token, "logout", expiration);
    }

    public boolean isTokenInBlacklist(String token) {
        return redisDao.hasKey(token);
    }

    private long getExpiration(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getExpiration().getTime();
    }
}