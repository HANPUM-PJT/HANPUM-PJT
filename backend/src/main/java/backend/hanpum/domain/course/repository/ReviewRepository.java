package backend.hanpum.domain.course.repository;

import backend.hanpum.domain.course.entity.Course;
import backend.hanpum.domain.course.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByCourse_CourseId(Long courseId, Pageable pageable);
    List<Review> findByCourse(Course course);
    Review findByCourse_CourseIdAndMember_MemberId(Long courseId, Long memberId);
    void deleteByCourse_CourseIdAndMember_MemberId(Long courseId, Long memberId);
}
