import Button from '@/components/common/Button/Button';
import * as R from '../../components/Style/Route/RouteAddDetailPage.styled';
import Icon from '@/components/common/Icon/Icon';
import Map from '@/components/common/Map/Map';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/common/Header/Header';
import SearchPlacePage from './SearchPlacePage';
import {
  AddRouteProps,
  AttractionsAddCardProps,
  AttractionReqDto,
  AttractionsProps,
  CourseDayReqDto,
  WayPointReqDto,
} from '@/models/route';
import RoutePlaceCard from '@/components/Style/Route/RoutePlaceCard';
import { colors } from '@/styles/colorPalette';
import { AddRoute, GetDistance } from '@/api/route/POST';

function RouteAddDetailPage() {
  const [curLatitude, setCurLatitude] = useState<number>(0);
  const [curLongtitude, setCurLongtitude] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [day, setDay] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [route, setRoute] = useState<number[]>([1]);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [addRoute, setAddRoute] = useState<AddRouteProps>(null!);
  const [dateDetail, setDateDetail] = useState<CourseDayReqDto[]>([]);
  const [wayPoints, setWayPoints] = useState<WayPointReqDto[]>([]);
  const [attractions, setAttractions] = useState<AttractionReqDto[]>([]);
  const [attractionsCard, setAttractionsCard] = useState<
    AttractionsAddCardProps[]
  >([]);
  const [pointType, setPointType] = useState<string>('wp');

  const location = useLocation();
  const data = { ...location.state };
  const navigate = useNavigate();

  const getSuccess = (pos: GeolocationPosition) => {
    setCurLatitude(pos.coords.latitude);
    setCurLongtitude(pos.coords.longitude);
    setLoading(true);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      getSuccess,
      () => {
        alert('위치 가져오기 실패');
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      },
    );

    let route: AddRouteProps = {
      courseName: data.routeTitle,
      content: data.routeExplane,
      openState: data.isOpen,
      writeState: false,
      courseTypeList: data.typeChecked,
      courseDayReqDtoList: [],
      multipartFile: data.imgSrc,
    };

    setAddRoute(route);
  }, []);

  // useEffect(() => {
  //   console.log(dateDetail);
  // }, [dateDetail]);

  // useEffect(() => {
  //   console.log(addRoute);
  // }, [addRoute]);

  useEffect(() => {
    if (dateDetail.length < route.length) {
      let newDate: CourseDayReqDto = {
        dayNumber: route[route.length - 1],
        wayPointReqDtoList: [],
        attractionReqDtoList: [],
      };
      setDateDetail((pre) => [...pre, newDate]);
    }
  }, [route]);

  useEffect(() => {
    if (wayPoints.length >= 2) {
      let startlat = wayPoints[wayPoints.length - 2].lon;
      let startlon = wayPoints[wayPoints.length - 2].lat;
      let endlat = wayPoints[wayPoints.length - 1].lon;
      let endlon = wayPoints[wayPoints.length - 1].lat;

      GetDistance(startlat, startlon, endlat, endlon).then((res) => {
        if (res.status === 200 && res.data.status === 'SUCCESS') {
          let dist = Number(res.data.data[0].distance) / 1000;
          let cal = 3.5 * 70 * (dist / 4);
          let duration = dist / 4;

          let curWay = [...wayPoints];
          curWay[curWay.length - 2].distance = `${dist}`;
          curWay[curWay.length - 2].calorie = `${cal}`;
          curWay[curWay.length - 2].duration = `${duration}`;

          curWay.map((ele: WayPointReqDto, idx: number) => {
            if (idx === 0) {
              ele.type = '출발지';
            } else if (idx === curWay.length - 1) {
              ele.type = '도착지';
            } else {
              ele.type = '경유지';
            }
          });
          setWayPoints(curWay);
        }
      });

      let route: AddRouteProps = {
        courseName: data.routeTitle,
        content: data.routeExplane,
        openState: data.isOpen,
        writeState: false,
        courseTypeList: data.typeChecked,
        courseDayReqDtoList: dateDetail,
        multipartFile: data.imgSrc,
      };

      setAddRoute(route);
    }
  }, [dateDetail]);

  useEffect(() => {
    dateDetail.map((ele: CourseDayReqDto) => {
      if (ele.dayNumber === selectedDay) {
        setWayPoints(ele.wayPointReqDtoList);
        setAttractions(ele.attractionReqDtoList);
      }
    });
  }, [selectedDay]);

  return searchOpen ? (
    <SearchPlacePage
      setAttractionsCard={setAttractionsCard}
      attractionsCard={attractionsCard}
      pointType={pointType}
      attractions={attractions}
      setAttractions={setAttractions}
      day={selectedDay}
      dateDetail={dateDetail}
      setDateDetail={setDateDetail}
      setSearchOpen={setSearchOpen}
      setWayPoints={setWayPoints}
      wayPoints={wayPoints}
    />
  ) : (
    <R.Container>
      <Header
        purpose="root"
        depart="서울"
        arrive="대전"
        clickBack={() => {
          navigate(-1);
        }}
        back={true}
        $isGrey
      />
      <R.MainContainer>
        <R.OverFlow>
          <R.DayContainer>
            <R.DayOverFlow>
              {route.map((ele) => (
                <R.DayCard
                  selected={selectedDay === ele}
                  onClick={() => {
                    setSelectedDay(ele);
                  }}
                >{`Day ${ele}`}</R.DayCard>
              ))}
              <R.DatAddCard
                onClick={() => {
                  setRoute((pre) => [...pre, day + 1]);
                  setDay(day + 1);
                }}
              >
                +
              </R.DatAddCard>
            </R.DayOverFlow>
          </R.DayContainer>
          <R.MapCard>
            <R.MapCardTitle>
              {selectedDay}일차 경로를 설정해주세요.
            </R.MapCardTitle>
            <R.MapSearchBox
              onClick={() => {
                setPointType('wp');
                setSearchOpen(true);
              }}
            >
              <Icon name="IconSearch" size={20} />
              <R.SearchText>위치 검색</R.SearchText>
            </R.MapSearchBox>
            <R.MapBox>
              {loading ? (
                <Map latitude={curLatitude} longitude={curLongtitude} />
              ) : null}
            </R.MapBox>
            <R.PlaceContainer>
              <R.PlaceBox>
                <R.PlaceTypeBox>경유지</R.PlaceTypeBox>
                <R.DetailWayOverflow>
                  {wayPoints.map((ele: WayPointReqDto, idx: number) => (
                    <RoutePlaceCard
                      routeAddress={ele.address}
                      routeId={1}
                      routeName={ele.name}
                      routeType={ele.type}
                      latitude={ele.lat}
                      longitude={ele.lon}
                      routePoint={`${ele.pointNumber}`}
                    />
                  ))}
                </R.DetailWayOverflow>
              </R.PlaceBox>
              <R.AttractionsBox>
                <R.AttrantiosTypeBox>관광지</R.AttrantiosTypeBox>
                <R.AttractionsOverflow>
                  {attractionsCard.length > 0 &&
                    attractionsCard.map((ele: AttractionsAddCardProps) => (
                      <R.AttractionCard img={ele.img}>
                        <R.AttractionCardTitle>
                          {ele.keyword}
                        </R.AttractionCardTitle>
                        <R.AttractionCardDetail>
                          <Icon name="IconFlag" size={20} />
                          <R.AttractionCardDetailText>
                            {ele.name}
                          </R.AttractionCardDetailText>
                        </R.AttractionCardDetail>
                      </R.AttractionCard>
                    ))}
                  <R.AttractionAddCard
                    onClick={() => {
                      setPointType('att');
                      setSearchOpen(true);
                    }}
                  >
                    +
                  </R.AttractionAddCard>
                </R.AttractionsOverflow>
              </R.AttractionsBox>
            </R.PlaceContainer>
          </R.MapCard>
        </R.OverFlow>
      </R.MainContainer>
      <R.BottomContainer>
        <R.ButtonBox>
          <Button
            width={30}
            height={6}
            fc="ffffff"
            bc={colors.main}
            radius={0.7}
            fontSize={1.6}
            children="경로완성"
            color="#ffffff"
            onClick={() => {
              if (
                addRoute.courseDayReqDtoList.length > 0 &&
                addRoute.courseDayReqDtoList[0].wayPointReqDtoList.length > 0
              ) {
                AddRoute(addRoute)
                  .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                      navigate('/route/add/complete');
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }}
          />
        </R.ButtonBox>
      </R.BottomContainer>
    </R.Container>
  );
}

export default RouteAddDetailPage;
