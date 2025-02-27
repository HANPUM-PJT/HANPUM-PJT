package backend.hanpum.exception.format.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    /* 예시 */
    TEST_NOT_FOUND(HttpStatus.NOT_FOUND, "NOT FOUND 에러 예시용 테스트 코드 입니다."),

    /* 공통 */
    JSON_MAPPING_ERROR(HttpStatus.BAD_REQUEST, "JSON 매핑 중 오류가 발생했습니다. JSON 구조와 Java 객체 간의 불일치로 인해 매핑이 실패하는 경우 발생합니다."),
    JSON_PROCESSING_ERROR(HttpStatus.BAD_REQUEST, "JSON 처리 중 오류가 발생했습니다. JSON 데이터의 직렬화 또는 역직렬화 과정에서 발생하는 일반적인 예외입니다."),
    URI_SYNTAX_ERROR(HttpStatus.BAD_REQUEST, "URI로 변환도중 오류가 발생했습니다. URI의 형식이나 구문이 잘못되어 URI 객체를 생성할 수 없는 경우에 이 예외가 발생합니다"),

    /* 일정 */
    SCHEDULE_NOT_FOUND(HttpStatus.NOT_FOUND, "조회된 일정이 없습니다."),
    GROUP_SCHEDULE_NOT_FOUND(HttpStatus.NOT_FOUND, "조회된 모임 일정이 없습니다."),
    SCHEDULE_DAY_NOT_FOUND(HttpStatus.NOT_FOUND, "조회된 세부 일정이 없습니다."),
    INVALID_DATE_FORMAT(HttpStatus.BAD_REQUEST, "유효하지 않은 날짜 형식입니다."),
    SCHEDULE_WAY_POINT_NOT_FOUND(HttpStatus.NOT_FOUND, "조회된 경유지 정보가 없습니다."),
    VALID_SCHEDULE_NOT_FOUND(HttpStatus.NOT_FOUND, "유효한 일정이 없습니다."),
    NEARBY_ATTRACTION_NOT_FOUND(HttpStatus.NOT_FOUND, "거리 조건에 맞는 관광지 정보가 없습니다."),
    BAD_SCHEDULE_STATE_UPDATE_REQUEST(HttpStatus.BAD_REQUEST, "올바르지 않은 일정 상태 전환 요청입니다."),
    CREATE_COUNT_EXCEEDED(HttpStatus.BAD_REQUEST, "개인 일정 생성 횟수 제한을 초과하였습니다."),
    BAD_SCHEDULE_DATE_SETTING(HttpStatus.BAD_REQUEST, "요청 일정이 기존 일정과 중복됩니다."),

    /* 날씨 */
    WEATHER_PARSING_EXCEPTION(HttpStatus.BAD_REQUEST, "날씨 정보를 불러오는 중 에러가 발생했습니다."),

    /* 경로 */
    COURSE_LIST_NOT_FOUND(HttpStatus.NOT_FOUND, "조회된 경로 목록이 없습니다."),
    COURSE_NOT_FOUND(HttpStatus.NOT_FOUND, "조회된 경로 정보가 없습니다."),
    COURSE_DAY_NOT_FOUND(HttpStatus.NOT_FOUND, "조회된 경로 일차정보가 없습니다."),
    COURSE_REVIEWS_NOT_FOUND(HttpStatus.NOT_FOUND, "조회된 경로 리뷰가 없습니다."),
    REVIEW_ALREADY_EXIST(HttpStatus.CONFLICT, "이미 리뷰를 작성한 회원입니다."),
    INTEREST_NOT_FOUND(HttpStatus.NOT_FOUND, "조회된 관심목록이 없습니다."),
    INTEREST_ALREADY_EXIST(HttpStatus.CONFLICT, "이미 관심목록에 추가한 경로입니다."),

    /* 모임 */
    GROUP_ALREADY_JOINED(HttpStatus.BAD_REQUEST, "이미 가입된 모임이 있습니다."),
    GROUP_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 모임을 찾을 수 없습니다."),
    GROUP_MEMBER_NOT_FOUND(HttpStatus.BAD_REQUEST, "가입하거나 신청한 모임이 존재하지 않습니다."),
    GROUP_MEMBER_FULL(HttpStatus.BAD_REQUEST, "해당 모임에 인원수가 초과하였습니다."),
    GROUP_PERMISSION(HttpStatus.BAD_REQUEST, "해당 모임에 허가되지 않은 접근입니다."),
    GROUP_DELETE_FAILED(HttpStatus.BAD_REQUEST, "신청 중인 회원 또는 가입 중인 멤버가 있습니다."),
    GROUP_ALREADY_LIKE(HttpStatus.BAD_REQUEST, "이미 관심 목록에 등록된 모임 입니다."),
    GROUP_LIKE_NOT_FOUND(HttpStatus.BAD_REQUEST, "관심 목록에 등록된 모임이 아닙니다."),

    /* 이미지 업로드 */
    FILE_FORMAT_UNSUPPORTED(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "지원하지 않는 파일 형식입니다."),
    FILE_PUT_FAILED(HttpStatus.BAD_REQUEST, "파일 업로드에 실패했습니다."),
    FILE_DELETE_FAILED(HttpStatus.BAD_REQUEST, "파일 삭제에 실패했습니다."),

    /* 인증 */
    EMAIL_DUPLICATED(HttpStatus.CONFLICT, "이미 사용 중인 이메일입니다."),
    AUTHENTICATION_MAIL_SEND_FAILED(HttpStatus.BAD_REQUEST, "인증번호 메일 전송에 실패했습니다."),
    AUTHENTICATION_MAIL_TIMEOUT(HttpStatus.REQUEST_TIMEOUT, "인증번호 입력 시간이 초과했습니다."),
    AUTHENTICATION_CODE_INVALID(HttpStatus.BAD_REQUEST, "잘못된 인증번호 입니다."),
    LOGIN_ID_DUPLICATED(HttpStatus.CONFLICT, "이미 사용 중인 아이디입니다."),
    NICKNAME_DUPLICATED(HttpStatus.CONFLICT, "이미 사용 중인 닉네임입니다."),
    LOGIN_ID_EXPIRED(HttpStatus.REQUEST_TIMEOUT, "아이디 검증 시간이 만료되었습니다. 회원가입을 다시 시도해 주세요."),
    EMAIL_EXPIRED(HttpStatus.REQUEST_TIMEOUT, "이메일 검증 시간이 만료되었습니다. 회원가입을 다시 시도해 주세요."),
    EMAIL_NOT_AUTHENTICATED(HttpStatus.BAD_REQUEST, "이메일 인증이 완료되지 않았습니다. 인증을 완료한 후 다시 시도해 주세요."),
    NICKNAME_EXPIRED(HttpStatus.REQUEST_TIMEOUT, "닉네임 검증 시간이 만료되었습니다."),
    EMAIL_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 이메일을 가진 회원을 찾을 수 없습니다."),
    LOGIN_INFO_INVALID(HttpStatus.BAD_REQUEST, "로그인 정보가 잘못되었습니다."),
    TOKEN_INVALID(HttpStatus.BAD_REQUEST, "잘못된 토큰 입니다."),
    TOKEN_BLACKLISTED(HttpStatus.BAD_REQUEST, "다시 로그인해주세요."),
    MEMBER_INFO_INVALID(HttpStatus.BAD_REQUEST, "접근 권한이 없습니다."),
    ACCESS_TOKEN_EXPIRED(HttpStatus.REQUEST_TIMEOUT, "엑세스 토큰이 만료되었습니다."),
    TOKEN_NOT_FOUND(HttpStatus.NOT_FOUND, "토큰이 존재하지 않습니다."),
    REFRESH_TOKEN_NOT_FOUND(HttpStatus.NOT_FOUND, "리프레쉬 토큰이 존재하지 않습니다. 다시 로그인해 주세요."),
    ACCESS_TOKEN_INVALID(HttpStatus.BAD_REQUEST, "잘못된 엑세스 토큰입니다."),
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "일치하는 회원 정보가 없습니다."),

    /* 멤버 */
    DELETE_MEMBER_FAILED_BY_GROUP(HttpStatus.BAD_REQUEST, "가입 또는 신청 중인 모임이 있는 경우 회원 탈퇴가 불가능합니다."),
    ;

    private final HttpStatus status;
    private final String message;
}