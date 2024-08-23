/** 첫번째 피드같이 생긴 유형 props추가 */
export interface FeedProps {
  routeData: {
    routeName?: string;
    routeContent?: string;
    routeScore?: number;
    routeComment?: string;
  } | null;
}

export interface FeedInfoProps {
  router?: string;
  feedInfoTitle: string;
  startDate: string;
  endDate: string;
  totalDistance: number;
  dayData: { dayNum: number }[];
}

export interface RouteListProps {
  routeName: string;
  routeContent: string;
  routeScore: number;
  routeComment: number;
  routeId: number;
  img: string;
  writeState: boolean;
  openState: boolean;
  memberId: number;
  writeDate: string;
}

export interface RouteDetailProps {
  routeName: string;
  routeContent: string;
  writeDate: string;
  routeScore: number;
  routeComment: number;
}

export interface RouteDetailDayProps {
  dayNum: number;
  totalDistance: string;
  totalDuration: string;
  totalCalorie: string;
}

export interface DaysOfRouteProps {
  routeName: string;
  routeAddress: string;
  routeId: number;
  routeType: string;
  routePoint: string;
  latitude: number;
  longitude: number;
}

export interface AttractionsProps {
  attractionId: number;
  name: string;
  type: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface RouteReviewProps {
  memberId: number;
  routeId: number;
  content: string;
  score: number;
  writeDate: string;
}

export interface searchPlaceProps {
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
}