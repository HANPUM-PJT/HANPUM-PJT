package backend.hanpum.domain.schedule.dto.responseDto;

import backend.hanpum.domain.course.dto.responseDto.AttractionResDto;
import backend.hanpum.domain.course.dto.responseDto.GetCourseDayResDto;
import backend.hanpum.domain.weather.dto.WeatherResDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScheduleInProgressResDto {
    Long scheduleId;        // 일정 ID
    String startPoint;      // 출발지
    String endPoint;        // 도착지
    String startDate;       // 시작일
    String endDate;         // 종료일
    String totalDistance;   // 총 거리
    int rate;            // 달성률
    WeatherResDto weatherResDto;         // 날씨
    List<ScheduleDayResDto> scheduleDayResDtoList;
}