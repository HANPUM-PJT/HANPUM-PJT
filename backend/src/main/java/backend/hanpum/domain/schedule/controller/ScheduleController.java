package backend.hanpum.domain.schedule.controller;

import backend.hanpum.config.jwt.UserDetailsImpl;
import backend.hanpum.domain.schedule.dto.requestDto.*;
import backend.hanpum.domain.schedule.dto.responseDto.*;
import backend.hanpum.domain.schedule.service.ScheduleService;
import backend.hanpum.exception.format.code.ApiResponse;
import backend.hanpum.exception.format.response.ResponseCode;
import com.amazonaws.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;
import java.util.List;

@Tag(name = "Schedule 컨트롤러", description = "Schedule Controller API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/schedule")
public class ScheduleController {

    private final ApiResponse response;
    private final ScheduleService scheduleService;

    @Operation(summary = "개인 일정 생성", description = "개인 일정 생성")
    @PostMapping
    public ResponseEntity<?> createSchedule(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                            @RequestBody SchedulePostReqDto schedulePostReqDto) {
        Long memberId = userDetails.getMember().getMemberId();
        Long scheduleId = scheduleService.createSchedule(memberId, schedulePostReqDto);
        return response.success(ResponseCode.SCHEDULE_CREATED, scheduleId);
    }

    @Operation(summary = "모임 일정 생성", description = "모임 일정 생성")
    @PostMapping("/group")
    public ResponseEntity<?> updateSchedule(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                            @RequestBody SchedulePostReqDto schedulePostReqDto) {
        Long memberId = userDetails.getMember().getMemberId();
        Long scheduleId = scheduleService.createGroupSchedule(memberId, schedulePostReqDto);
        return response.success(ResponseCode.GROUP_SCHEDULE_CREATED, scheduleId);
    }

    @Operation(summary = "멤버별 일정 조회", description = "내 개인 일정 조회")
    @GetMapping
    public ResponseEntity<?> getMySchedule(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long memberId = userDetails.getMember().getMemberId();
        List<ScheduleResDto> scheduleResDto = scheduleService.getMyScheduleList(memberId);
        return response.success(ResponseCode.SCHEDULE_LIST_FETCHED, scheduleResDto);
    }

    @Operation(summary = "모임 일정 조회", description = "내가 속해있는 모임 일정 조회")
    @GetMapping("/group")
    public ResponseEntity<?> getGroupSchedule(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long memberId = userDetails.getMember().getMemberId();
        GroupScheduleResDto GroupScheduleResDto = scheduleService.getGroupScheduleList(memberId);
        return response.success(ResponseCode.GROUP_SCHEDULE_LIST_FETCHED, GroupScheduleResDto);
    }

    @Operation(summary = "일정 상세 조회", description = "개인 일정 상세 조회")
    @GetMapping("/detail/{scheduleId}")
    public ResponseEntity<?> getScheduleDetail(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                               @PathVariable Long scheduleId) {
        Long memberId = userDetails.getMember().getMemberId();
        ScheduleDetailResDto result = scheduleService.getScheduleDetail(memberId, scheduleId);
        return response.success(ResponseCode.SCHEDULE_DETAIL_FETCHED, result);
    }


    @Operation(summary = "일차별 일정 조회", description = "일차별 일정 조회")
    @GetMapping("/day/{dayNumber}")
    public ResponseEntity<?> getMyScheduleDay(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                              @RequestParam Long scheduleId,
                                              @PathVariable(name = "dayNumber") int day) {
        Long memberId = userDetails.getMember().getMemberId();
        ScheduleDayResDto result = scheduleService.getMyScheduleDay(memberId, scheduleId, day);
        return response.success(ResponseCode.SCHEDULE_DAY_FETCHED, result);
    }

    @Operation(summary = "전체 일정 시작, 종료", description = "정해진 날짜가 되면 전체 일정 시작용, 시작상태에서 사용하면 종료")
    @PutMapping("/start")
    public ResponseEntity<?> startAndStopSchedule(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                  @RequestBody ScheduleStartReqDto scheduleRunReqDto) {
        Long memberId = userDetails.getMember().getMemberId();
        Long scheduleId = scheduleService.startSchedule(memberId, scheduleRunReqDto);
        return response.success(ResponseCode.SCHEDULE_STATE_CHANGED, scheduleId);
    }

    @Operation(summary = "일차별 일정 상태 전환", description = "쉴때, 걸을때 구분할 수 있는 트리거")
    @PutMapping("/run")
    public ResponseEntity<?> runAndStop(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                        @RequestBody ScheduleRunReqDto scheduleRunReqDto) {
        Long memberId = userDetails.getMember().getMemberId();
        scheduleService.runAndStop(memberId, scheduleRunReqDto);
        return response.success(ResponseCode.SCHEDULE_RUN_STATE_CHANGED);
    }

    @Operation(summary = "일정 삭제", description = "일정 삭제")
    @DeleteMapping
    public ResponseEntity<?> deleteSchedule(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                            Long scheduleId) {
        Long memberId = userDetails.getMember().getMemberId();
        scheduleService.deleteSchedule(memberId, scheduleId);
        return response.success(ResponseCode.SCHEDULED_DELETED);
    }

    @Operation(summary = "메모 작성", description = "경유지 메모작성")
    @PostMapping("/memo")
    public ResponseEntity<?> createMemo(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                        @RequestBody MemoPostReqDto memoPostReqDto) {
        Long memberId = userDetails.getMember().getMemberId();
        scheduleService.createMemo(memberId, memoPostReqDto);
        return response.success(ResponseCode.MEMO_CREATED);
    }

    @Operation(summary = "진행중인 일정", description = "진행중 일정 조회")
    @GetMapping("/running")
    public ResponseEntity<?> getRunningSchedule(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long memberId = userDetails.getMember().getMemberId();
        ScheduleInProgressResDto result = scheduleService.getRunningSchedule(memberId);
        return response.success(ResponseCode.RUNNING_SCHEDULE_FETCHED, result);
    }

    @Operation(summary = "경유지 방문처리", description = "현재 위치가 다음 경유지에 일정 수준 이상 가까워지면 방문처리")
    @PutMapping("/arrive")
    public ResponseEntity<?> setArriveScheduleWayPoint(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                       @RequestBody ScheduleWayPointReqDto scheduleWayPointReqDto) {
        Long memberId = userDetails.getMember().getMemberId();
        Long scheduleDayId = scheduleService.setArriveScheduleWayPoint(memberId, scheduleWayPointReqDto);
        return response.success(ResponseCode.SCHEDULE_WAY_POINT_STATE_CHANGED, scheduleDayId);
    }

    @Operation(summary = "주변 관광지 정보 가져오기", description = "주변 관광지 정보 가져오기")
    @GetMapping("/nearby")
    public ResponseEntity<?> getNearByAttractionList(@RequestParam double lat,
                                                     @RequestParam double lon) {
        List<NearByAttractionResDto> result = scheduleService.getNearByAttractionList(lat, lon);
        return response.success(ResponseCode.NEARBY_ATTRACTION_LIST_FETCHED, result);
    }

    @Operation(summary = "일정 날짜 수정", description = "생성된 일정의 날짜를 수정")
    @PutMapping("/modify")
    public ResponseEntity<?> updateScheduleDate(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                @RequestBody ScheduleUpdateReqDto scheduleUpdateReqDto) {
        Long memberId = userDetails.getMember().getMemberId();
        Long scheduleId = scheduleService.updateScheduleDate(memberId, scheduleUpdateReqDto);
        return response.success(ResponseCode.SCHEDULE_DATE_STATE_CHANGED, scheduleId);
    }

}
