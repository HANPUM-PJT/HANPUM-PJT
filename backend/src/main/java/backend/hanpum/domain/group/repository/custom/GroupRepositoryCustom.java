package backend.hanpum.domain.group.repository.custom;

import backend.hanpum.domain.group.dto.responseDto.GroupDetailGetResDto;
import backend.hanpum.domain.group.dto.responseDto.GroupListGetResDto;
import backend.hanpum.domain.group.dto.responseDto.GroupResDto;
import backend.hanpum.domain.group.dto.responseDto.LikeGroupListGetResDto;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface GroupRepositoryCustom {
    GroupListGetResDto findGroupList(Long memberId, String startPoint, String endPoint, Integer maxTotalDays,
                                     Integer maxRecruitmentCount, Pageable pageable);
    LikeGroupListGetResDto findMemberLikeGroupList(Long memberId);
    Optional<GroupDetailGetResDto> findGroupById(Long memberId, Long groupId);
    GroupResDto findGroupByMemberId(Long memberId, Long groupId);
}