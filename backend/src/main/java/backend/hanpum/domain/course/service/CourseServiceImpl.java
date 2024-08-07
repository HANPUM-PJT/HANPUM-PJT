package backend.hanpum.domain.course.service;

import backend.hanpum.domain.course.dto.responseDto.CourseDetailResDto;
import backend.hanpum.domain.course.dto.responseDto.CourseReviewResDto;
import backend.hanpum.domain.course.dto.responseDto.GetCourseDayResDto;
import backend.hanpum.domain.course.entity.Course;
import backend.hanpum.domain.course.entity.InterestCourse;
import backend.hanpum.domain.course.entity.Review;
import backend.hanpum.domain.course.repository.CourseRepository;
import backend.hanpum.domain.course.repository.InterestCourseRepository;
import backend.hanpum.domain.course.repository.ReviewRepository;
import backend.hanpum.domain.member.repository.MemberRepository;
import backend.hanpum.exception.exception.course.CourseDayNotFoundException;
import backend.hanpum.exception.exception.course.CourseNotFoundException;
import backend.hanpum.exception.exception.course.CourseReviewsNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final InterestCourseRepository interestCourseRepository;
    private final MemberRepository memberRepository;
    private final ReviewRepository reviewRepository;

    @Override
    @Transactional(readOnly = true)
    public CourseDetailResDto getCourseDetail(Long courseId) {
        CourseDetailResDto courseDetailResDto = courseRepository.getCourseDetailByCourseId(courseId).orElseThrow(CourseNotFoundException::new);
        return courseDetailResDto;
    }

    @Override
    @Transactional(readOnly = true)
    public GetCourseDayResDto getCourseDay(Long courseId, Integer day) {
        GetCourseDayResDto getCourseDayResDto = courseRepository.getCourseDayByCourseIdAndDay(courseId, day).orElseThrow(CourseDayNotFoundException::new);
        return getCourseDayResDto;
    }

    @Override
    @Transactional
    public void addInterestCourse(Long courseId, Long memberId) {
//        Member member = memberRepository.findByMemberId(memberId).orElse(null);
        Course course = courseRepository.findById(courseId).orElseThrow(CourseNotFoundException::new);
        InterestCourse interestCourse = InterestCourse.builder()
//                .member(member)
                .course(course)
                .build();

        interestCourseRepository.save(interestCourse);
    }

    @Override
    @Transactional
    public void deleteInterestCourse(Long courseId, Long memberId) {
        interestCourseRepository.deleteByMember_MemberIdAndCourse_CourseId(courseId, memberId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CourseReviewResDto> getCourseReviews(Long courseId) {
        List<CourseReviewResDto> courseReviewResDtoList = new ArrayList<>();
        List<Review> ReviewList = reviewRepository.findByCourse_CourseId(courseId);

        if(ReviewList.isEmpty()) {
            throw new CourseReviewsNotFoundException();
        } else {
            for(Review review : ReviewList) {
                CourseReviewResDto courseReviewResDto = CourseReviewResDto.builder()
                        .memberId(review.getMember().getMemberId())
                        .courseId(review.getCourse().getCourseId())
                        .content(review.getContent())
                        .score(review.getScore())
                        .writeDate(review.getWriteDate())
                        .like(review.getLikeCount())
                        .build();
                courseReviewResDtoList.add(courseReviewResDto);
            }
        }

        return courseReviewResDtoList;
    }

    @Override
    public void writeCourseReview(Long courseId, String content, Double score) {
//        Review review = reviewRepository.findByCourse_CourseIdAndMember_MemberId(courseId, memberId);
//        if(review != null) {
//            // 리뷰 1회 작성 가능?
//        }

        Course course = courseRepository.findById(courseId).orElseThrow(CourseNotFoundException::new);
//      Member member = memberRepository.findMemberByLoginId(memberId);

        Date currentDate = new Date();
        Review review = Review.builder()
                .content(content)
                .score(score)
                .writeDate(currentDate)
                .likeCount(0)
//                .member(member)
                .course(course)
                .build();

        reviewRepository.save(review);
    }

    @Override
    public void editCourseReview(Long reviewId, String content, Double score) {
        Review review = reviewRepository.findById(reviewId).orElseThrow(CourseReviewsNotFoundException::new);

        Date currentDate = new Date();
        review = Review.builder()
                .reviewId(reviewId)
                .content(content)
                .score(score)
                .writeDate(currentDate) // 작성일? 수정일?
                .likeCount(review.getLikeCount())
                .member(review.getMember())
                .course(review.getCourse())
                .build();

        reviewRepository.save(review);
    }

}
