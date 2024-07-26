package backend.hanpum.domain.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CheckEmailAuthCodeReqDto {
    @NotNull
    @Email
    String email;
    @NotNull
    String inputAuthCode;
}