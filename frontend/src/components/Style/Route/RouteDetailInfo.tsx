import { getRouteDayDetail, getRouteReview } from '@/api/route/GET';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import * as S from '../../../components/Style/Schedule/SchduleMainPage.styled';
import {
  AttractionsProps,
  DaysOfRouteProps,
  MapLinePathProps,
  RouteDetailDayProps,
  RouteReviewProps,
  WayPointReqDto,
} from '@/models/route';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Map from '@/components/common/Map/Map';
import RoutePlaceCard from './RoutePlaceCard';
import AttractionsCard from './AttractionsCard';
import ReviewCard from './ReviewCard';
import { Select } from '@mobiscroll/react';
import Icon from '@/components/common/Icon/Icon';
import RouteRetouchPlaceCard from './RouteRetouchPlaceCard';
import Button from '@/components/common/Button/Button';
import MeetMember from '@/components/Schedule/MeetMember';
import { Member } from '@/models/schdule';
import { MemberInfo } from '@/models/meet';
import MeetNoHave from '@/components/Meet/MeetNoHave';

interface RouteDetailInfoProps {
  selected: string;
  selectedDay: number;
  latitude: number;
  longitude: number;
  dayData: RouteDetailDayProps[];
  attractions: AttractionsProps[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDay: React.Dispatch<React.SetStateAction<number>>;
  reviews: RouteReviewProps[];
  linePath: any[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setBsType: React.Dispatch<React.SetStateAction<string>>;
  reviewType: string;
  dayOfRoute: DaysOfRouteProps[];
  setDayOfRoute: React.Dispatch<React.SetStateAction<DaysOfRouteProps[]>>;
  setWayPoints?: React.Dispatch<React.SetStateAction<WayPointReqDto[]>>;
  waypoints?: WayPointReqDto[];
  clickWayBtn?: () => void;
  clickAttryBtn?: () => void;
  setSelectedIdx: React.Dispatch<React.SetStateAction<number>>;
  deleteHandler: (name: string) => void;
  marker: any[];
  attmarker?: any[];
  isSchedule?: boolean;
  isDetail?: boolean;
  state?: number;
  turnGreen?: boolean[];
  isMeetPage?: boolean;
  memberData?: MemberInfo[];
  memberCount?: number;
  reviewClickEven?: (ele: RouteReviewProps) => void;
  retouchDayHandler?: () => void;
  retouchDayDeHandler?: (n: number) => void;
  setMapLoad?: React.Dispatch<React.SetStateAction<boolean>>;
}

function RouteDetailInfo({
  isSchedule = false,
  ...props
}: RouteDetailInfoProps) {
  const location = useLocation();
  const draggingPos = useRef<any>(null);
  const dragOverPos = useRef<any>(null);
  const [selectedMarker, setSelectedMarker] = useState<any>(null!);

  const handleDragStart = (position: number) => {
    draggingPos.current = position;
  };

  const handleDragEnter = (position: number) => {
    dragOverPos.current = position;
  };

  const handleDrop = () => {
    if (draggingPos.current === null || dragOverPos.current === null) return;

    const newItems = [...props.dayOfRoute];
    const draggingItem = newItems[draggingPos.current];

    newItems.splice(draggingPos.current, 1);
    newItems.splice(dragOverPos.current, 0, draggingItem);

    const reorderedItems = newItems.map((item, index) => ({
      ...item,
      order: index,
    }));

    draggingPos.current = null;
    dragOverPos.current = null;

    props.setDayOfRoute(reorderedItems);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchLocation = e.targetTouches[0];
    const element = document.elementFromPoint(
      touchLocation.clientX,
      touchLocation.clientY,
    );

    if (element && element.getAttribute('data-position')) {
      const newPosition = parseInt(element.getAttribute('data-position')!, 10);
      dragOverPos.current = newPosition;
    }
  };

  const handleTouchEnd = () => {
    if (draggingPos.current === null || dragOverPos.current === null) return;

    const newItems = [...props.dayOfRoute];
    const draggingItem = newItems[draggingPos.current];
    const reorderedItems: DaysOfRouteProps[] = [];
    newItems.splice(draggingPos.current, 1);
    newItems.splice(dragOverPos.current, 0, draggingItem);
    // console.log(newItems);
    newItems.map((ele: DaysOfRouteProps, idx: number) => {
      ele.routePoint = String(idx + 1);

      if (idx === 0) {
        ele.routeType = '출발지';
      } else if (idx === newItems.length - 1) {
        ele.routeType = '도착지';
      } else {
        ele.routeType = '경유지';
      }

      reorderedItems.push(ele);
    });

    // const reorderedItems = newItems.map((item, index) => ({
    //   ...item,
    //   order: index,
    // }));

    draggingPos.current = null;
    dragOverPos.current = null;
    let newWay: WayPointReqDto[] = [];
    if (props.waypoints !== undefined) {
      reorderedItems.map((ele: DaysOfRouteProps, idx: number) => {
        props.waypoints?.map((el: WayPointReqDto) => {
          if (ele.routeName === el.name) {
            el.pointNumber = ele.routePoint;
            newWay.push(el);
          }
        });
      });

      if (props.setWayPoints !== undefined) {
        props.setWayPoints(newWay);
      }
    }
    props.setDayOfRoute(reorderedItems);
  };

  const selectHandler = (i: number) => {
    props.setSelectedIdx(i);
  };
  const renderMain = () => {
    switch (props.selected) {
      case 'course':
        return (
          <>
            <R.MapBox>
              <Map
                linePath={props.linePath}
                latitude={props.longitude}
                longitude={props.latitude}
                marker={props.marker}
                infoBtn
                attrationmarker={props.attmarker}
                selected={selectedMarker}
                setMapLoad={props.setMapLoad}
              />
            </R.MapBox>
            <R.DetailHeader>
              {location.pathname.includes('retouch') ? (
                <R.RetouchHeaderOverflow>
                  {props.dayData.map((ele) => (
                    <R.DayContainer key={ele.dayNum}>
                      <R.RDayBox
                        selected={ele.dayNum === props.selectedDay}
                        onClick={() => {
                          props.setSelectedDay(ele.dayNum);
                        }}
                      >
                        {`Day ${ele.dayNum}`}
                        <R.DayDeleteBox
                          onClick={(e) => {
                            e.stopPropagation();
                            if (props.dayData.length >= 2) {
                              if (props.retouchDayDeHandler !== undefined) {
                                props.retouchDayDeHandler(ele.dayNum);
                              }
                            }
                          }}
                        >
                          X
                        </R.DayDeleteBox>
                      </R.RDayBox>
                    </R.DayContainer>
                  ))}
                  <R.DatAddCard
                    onClick={() => {
                      if (props.retouchDayHandler !== undefined) {
                        props.retouchDayHandler();
                      }
                    }}
                  >
                    +
                  </R.DatAddCard>
                </R.RetouchHeaderOverflow>
              ) : (
                <R.HeaderOverflow>
                  {props.dayData.map((ele) => (
                    <R.DayContainer key={ele.dayNum}>
                      <R.DayBox
                        selected={ele.dayNum === props.selectedDay}
                        onClick={() => {
                          props.setSelectedDay(ele.dayNum);
                        }}
                      >
                        {`Day ${ele.dayNum}`}
                      </R.DayBox>
                    </R.DayContainer>
                  ))}
                </R.HeaderOverflow>
              )}
            </R.DetailHeader>
            <R.DetailMain>
              <R.DetailMainOverflow>
                {props.dayOfRoute.length > 0
                  ? props.dayOfRoute.map((ele, idx) =>
                      location.pathname.includes('retouch') ? (
                        <RouteRetouchPlaceCard
                          key={idx}
                          selectHandler={selectHandler}
                          handleTouchMove={handleTouchMove}
                          handleTouchEnd={handleTouchEnd}
                          dropHandler={handleDrop}
                          data={ele}
                          dragEndHandler={handleDragEnter}
                          dragStartHandler={handleDragStart}
                          idx={idx}
                        />
                      ) : (
                        <RoutePlaceCard
                          key={idx}
                          {...ele}
                          isSchedule={isSchedule}
                          state={ele.state}
                          turnGreen={
                            props.turnGreen ? props.turnGreen[idx] : false
                          }
                          makers={props.marker[idx]}
                          setSelectedMarker={setSelectedMarker}
                          isDetail={props.isDetail}
                        />
                      ),
                    )
                  : null}
                {location.pathname.includes('retouch') && (
                  <R.AddBtnContainer>
                    <Button
                      width={65}
                      height={6}
                      fc="ffffff"
                      bc="#1A823B"
                      radius={0.7}
                      fontSize={1.6}
                      children="경유지 추가"
                      color="#ffffff"
                      onClick={() => {
                        if (props.clickWayBtn !== undefined) {
                          props.clickWayBtn();
                        }
                      }}
                    />
                  </R.AddBtnContainer>
                )}
              </R.DetailMainOverflow>
            </R.DetailMain>
          </>
        );
      case 'review':
        return (
          <>
            {props?.isMeetPage ? (
              <>
                {props.memberData && props.memberData.length > 0 ? (
                  <S.MeetMemeberContainer>
                    <MeetMember
                      memberCount={props.memberCount || 0}
                      members={props.memberData || []}
                    />
                  </S.MeetMemeberContainer>
                ) : (
                  <MeetNoHave category="tabMemberList" />
                )}
              </>
            ) : (
              <>
                <R.DetailHeader>
                  <R.HeaderOverflow>
                    <R.ReviewHeaderTextBox
                      onClick={() => {
                        props.setIsOpen(true);
                        props.setBsType('정렬');
                      }}
                    >
                      <R.ReviewHeaderText>
                        {props.reviewType}
                      </R.ReviewHeaderText>
                      <div
                        style={{
                          transform: 'rotate(270deg)',
                          marginLeft: '0.3rem',
                        }}
                      >
                        <Icon name="IconBackArrow" size={10} />
                      </div>
                    </R.ReviewHeaderTextBox>
                  </R.HeaderOverflow>
                </R.DetailHeader>
                <R.DetailMain>
                  <R.DetailMainOverflow>
                    {props.reviews.map((ele: RouteReviewProps) => (
                      <ReviewCard ele={ele} clickEven={props.reviewClickEven} />
                    ))}
                  </R.DetailMainOverflow>
                </R.DetailMain>
              </>
            )}
          </>
        );
      default:
        return (
          <>
            <R.MapBox>
              <Map
                linePath={props.linePath}
                latitude={props.longitude}
                longitude={props.latitude}
                marker={props.marker}
                attrationmarker={props.attmarker}
              />
            </R.MapBox>
            <R.DetailHeader>
              <R.HeaderOverflow>
                {props.dayData.map((ele) => (
                  <R.DayContainer>
                    <R.DayBox
                      selected={ele.dayNum === props.selectedDay}
                      onClick={() => {
                        props.setSelectedDay(ele.dayNum);
                      }}
                    >{`Day ${ele.dayNum}`}</R.DayBox>
                  </R.DayContainer>
                ))}
              </R.HeaderOverflow>
            </R.DetailHeader>
            <R.DetailMain>
              <R.DetailMainOverflow>
                {props.attractions.map((ele: AttractionsProps) => (
                  <AttractionsCard
                    deleteHandler={props.deleteHandler}
                    ele={ele}
                    isAble={location.pathname.includes('retouch')}
                  />
                ))}
                {location.pathname.includes('retouch') && (
                  <R.AddBtnContainer>
                    <Button
                      width={65}
                      height={6}
                      fc="ffffff"
                      bc="#1A823B"
                      radius={0.7}
                      fontSize={1.6}
                      children="관광지 추가"
                      color="#ffffff"
                      onClick={() => {
                        if (props.clickAttryBtn !== undefined) {
                          props.clickAttryBtn();
                        }
                      }}
                    />
                  </R.AddBtnContainer>
                )}
              </R.DetailMainOverflow>
            </R.DetailMain>
          </>
        );
    }
  };

  return <>{renderMain()}</>;
}

export default RouteDetailInfo;
