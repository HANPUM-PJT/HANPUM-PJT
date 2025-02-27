import Icon from '@/components/common/Icon/Icon';
import * as R from '@/components/Style/Route/RouteListMorePage.styled';
import { useNavigate } from 'react-router-dom';
import defaultImg from '@/assets/img/mountain.jpg';
import { useRecoilValue } from 'recoil';
import { isAuthEnticatedAtom } from '@/atoms/isAuthEnticatedAtom';
import { setRouteLike } from '@/api/route/GET';
import { RouteLikeDelete } from '@/api/route/Delete';
import { useEffect, useState } from 'react';
import { setDefaultImg } from '@/utils/Image';

interface RouteListMoreCardProps {
  title: string;
  start: string;
  end: string;
  score: number;
  review: number;
  img: string;
  id: number;
  totalDays: number;
  interestFlag: boolean;
  routeId: string;
  distance: number;
}

function RouteListMoreCard(props: RouteListMoreCardProps) {
  const navigator = useNavigate();
  const isAuth = useRecoilValue(isAuthEnticatedAtom);
  const [like, setLike] = useState<boolean>(false);

  useEffect(() => {
    setLike(props.interestFlag);
  }, []);

  const likeHandler = () => {
    if (isAuth) {
      if (!like) {
        setRouteLike(String(props.routeId))
          .then((result) => {
            if (result.status === 200 && result.data.status === 'SUCCESS') {
              setLike(true);
            }
          })
          .catch((err) => {
            // console.log(err);
          });
      } else {
        RouteLikeDelete(String(props.routeId))
          .then((result) => {
            if (result.status === 200 && result.data.status === 'SUCCESS') {
              setLike(false);
            }
          })
          .catch((err) => {
            // console.log(err);
          });
      }
    } else {
      navigator('/login');
    }
  };
  return (
    <R.RouteCard
      onClick={() => {
        navigator(`/route/detail/${props.id}`);
      }}
    >
      <R.ContentBox>
        <R.Img src={setDefaultImg(props.img || null)} />
        <R.TextBox>
          <R.Title>{props.title}</R.Title>
          <R.RouteTextBox>
            {props.start.includes('특별')
              ? props.start.split('특별')[0]
              : props.start}
            <Icon name="IconGreyLeftArrow" size={10} />
            {props.end.includes('특별')
              ? props.end.split('특별')[0]
              : props.end}
            <R.RouteDistanceBox>
              {Math.round(props.distance)}km
            </R.RouteDistanceBox>
          </R.RouteTextBox>
          <R.ScoreBox>
            <Icon name="IconGrenStar" size={10} />
            <R.Score>{props.score}</R.Score>
            <R.Review>({props.review})</R.Review>
          </R.ScoreBox>
        </R.TextBox>
        <R.DateBox>
          <Icon
            name={like ? 'IconModiHeartFill' : 'IconModiHeartNonFill'}
            size={18}
            onClick={(e) => {
              e.stopPropagation();
              likeHandler();
            }}
          />
          <R.Date>{`${props.totalDays - 1}박${props.totalDays}일`}</R.Date>
        </R.DateBox>
      </R.ContentBox>
    </R.RouteCard>
  );
}

export default RouteListMoreCard;
