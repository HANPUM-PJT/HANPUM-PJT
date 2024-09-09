import Icon from '@/components/common/Icon/Icon';
import * as R from '@/components/Style/Route/ReviewModal.styled';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import Button from '@/components/common/Button/Button';
import { colors } from '@/styles/colorPalette';
import { SetRouteReview } from '@/api/route/POST';
import { toast } from 'react-toastify';

interface ReviewModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isVisible: boolean;
  routeid: string;
}

function ReviewModal(props: ReviewModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');

  const reviewAddHandler = () => {
    SetRouteReview(props.routeid, review, rating, 0)
      .then((res) => {
        if (res.status === 200 && res.data.status === 'SUCCESS') {
          props.setIsOpen(false);
        } else {
          if (res.data.message === '이미 리뷰를 작성한 회원입니다.') {
            props.setIsOpen(false);
            toast.info('이미 리뷰를 작성하셨습니다.');
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <R.Container
      isVisible={props.isVisible}
      onClick={() => {
        props.setIsOpen(false);
      }}
    >
      <R.ModalCard
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <R.ModalHeader>
          리뷰 작성
          <R.CloseBox
            onClick={(e) => {
              props.setIsOpen(false);
            }}
          >
            <Icon name="IconClose" size={15} />
          </R.CloseBox>
        </R.ModalHeader>
        <R.RatingBox>
          <R.RatingText>별점등록{` (${rating}/5)`}</R.RatingText>
          <R.Rating>
            <Rating
              name="rating"
              value={rating}
              onChange={(event: any, newValue: number | null) => {
                if (newValue !== null) {
                  setRating(newValue);
                }
              }}
              precision={0.5}
              size="large"
              sx={{
                fontSize: '4.5rem',
              }}
            />
          </R.Rating>
        </R.RatingBox>
        <R.ReviewWriteBox>
          <R.ReviewTitle>리뷰{` (${review.length}/100)`}</R.ReviewTitle>
          <R.ReviewWrite
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
        </R.ReviewWriteBox>
        <R.BtnBox>
          <Button
            width={65}
            height={6}
            fc="ffffff"
            bc={rating > 0 && review.length > 0 ? '#1A823B' : colors.grey4}
            radius={0.7}
            fontSize={1.6}
            children="작성완료"
            color="#ffffff"
            onClick={() => {
              reviewAddHandler();
            }}
          />
        </R.BtnBox>
      </R.ModalCard>
    </R.Container>
  );
}

export default ReviewModal;
