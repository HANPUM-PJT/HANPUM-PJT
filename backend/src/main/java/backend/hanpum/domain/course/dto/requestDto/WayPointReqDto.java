package backend.hanpum.domain.course.dto.requestDto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WayPointReqDto {
    private String type;
    private String name;
    private String address;
    private Float lat;
    private Float lon;
    private String pointNumber;
    private String distance;
    private String duration;
    private String calorie;
}