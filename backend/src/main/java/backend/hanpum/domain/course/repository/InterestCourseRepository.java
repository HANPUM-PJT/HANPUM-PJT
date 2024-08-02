package backend.hanpum.domain.course.repository;

import backend.hanpum.domain.course.entity.InterestCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterestCourseRepository extends JpaRepository<InterestCourse, Long> {
    void deleteByMemberIdAndCourseId(Long memberId, Long courseId);
}