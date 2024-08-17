package backend.hanpum.domain.member.dto.requestDto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePasswordReqDto {
    @NotNull
    String currentPassword;
    @NotNull
    String updatePassword;
}