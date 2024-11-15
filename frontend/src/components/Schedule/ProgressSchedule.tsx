/** 내일정 - 진행중 tab 진행상황 + 일정 달성률 */
import React from 'react';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import * as S from '@/components/Style/Schedule/SchduleMainPage.styled';
import { FeedInfoProps } from '@/models/route';

const ProgressSchedule = ({
  /** n일차 진행상황 */
  proceessDay,
  /** 출발, 도착 */
  endPoint,
  startPoint,
  /** 현재 거리, 전체 거리 계산 */
  totalDuration,
  totalDistance,
  percentage,
  rate,
  /** 오늘 일정률 */
  currentWayPoint,
  nextWayPoint,
  currentVisitCount,
  todayTotalVisitCount,
  todayTotalDistance,
}: FeedInfoProps) => {
  return (
    <>
      <R.RouteDateBox>
        <R.RouteName>{proceessDay}일차 진행 상황을 확인해보세요.</R.RouteName>
        <R.StartDateBox>
          <R.PlaceBox>
            <R.PlaceText>
              출발지 <span className="bold-text">{startPoint}</span>
            </R.PlaceText>
            <R.PlaceText>
              도착지 <span className="bold-text">{endPoint}</span>
            </R.PlaceText>
          </R.PlaceBox>
          <R.DistanceBox>
            <R.DistanceText>총 이동거리</R.DistanceText>
            <R.Distance>
              <span className="bold-text">{totalDistance}km</span>
            </R.Distance>
          </R.DistanceBox>
        </R.StartDateBox>
      </R.RouteDateBox>

      <S.SchduleProgressWrap isScheduleHeight>
        <S.Hr></S.Hr>
        <R.RouteName>오늘 일정의 달성률</R.RouteName>
        <R.StartDateBox>
          <R.PlaceBox>
            <R.PlaceText>
              현재 경유지 <span className="bold-text">{currentWayPoint}</span>
            </R.PlaceText>
            <R.PlaceText>
              다음 경유지 <span className="bold-text">{nextWayPoint}</span>
            </R.PlaceText>
          </R.PlaceBox>

          <S.PercentBox>
            <S.PercentText>{percentage}%</S.PercentText>
            {/* <S.CalculateDistance>
              {totalDuration}km / {totalDistance}km
            </S.CalculateDistance> */}
          </S.PercentBox>
        </R.StartDateBox>
        <S.ProgressBar percentage={percentage || 0}>
          <div className="progress" />
        </S.ProgressBar>
        <S.ProgressText>
          {/* <S.ProgressText>
            남은 이동 거리
            <span className="bold-text">{todayTotalDistance}km</span>
          </S.ProgressText> */}
          <S.ProgressText>
            경유지 <span className="green_text">{currentVisitCount}</span>/
            {todayTotalVisitCount}
          </S.ProgressText>
        </S.ProgressText>
      </S.SchduleProgressWrap>
    </>
  );
};

export default ProgressSchedule;
