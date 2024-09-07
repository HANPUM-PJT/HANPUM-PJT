/** 내일정 - 날씨 컴포넌트 */
export interface WeatherProps {
  weatherIcon?: string;
  message?: string;
  logcation?: string;
  nowTime?: string;
  nowWeather: string;
  precipitation?: string;
  nowTemperature?: string;
}

/** 모임일정 - 모임멤버 */
export interface Member {
  groupMemberId: number;
  joinType: string;
  memberId: number;
  profilePicture: string;
  nickname: string;
}

export interface MeetMemberProps {
  memberCount: number;
  members: Member[];
}

export interface SchduleCardProps {
  scheduleId?: number;
  backgroundImg?: string | null;
  title?: string;
  startPoint?: string;
  endPoint?: string;
  startDate?: string;
  endDate?: string;
  tripDay?: string;
  dDay?: string;
  state?: number;
  content?: string;
  totalDistance?: number;
  courseTypes?: string[];
  onClick?: () => void;
}

/** 진행중 */
export interface RunningScheduleProps {
  backgroundImg: string;
  title: string;
  content: string;
  courseTypes: string[];
  scheduleDayId: number;
  startDate?: string;
  endDate?: string;
  date: string;
  visit: boolean;
  running: boolean;
  totalDistance: number;
  totalDuration: string;
  totalCalories: string;
  scheduleWayPointList: WayPoint[];
  attractionList: Attraction[];
  scheduleDayResDtoList: ScheduleDayResDto[];
  rate: number;
  startPoint?: string;
  endPoint?: string;
}

export interface WayPoint {
  name: string;
  type: string;
  address: string;
  lat: number;
  lon: number;
  state: number;
  scheduleWayPointId: number;
}

export interface Attraction {
  attractionId: number;
  name: string;
  type: string;
  address: string;
  lat: number;
  lon: number | null;
  img: string;
}

export interface ScheduleDayResDto {
  scheduleDayId: number;
  date: string;
  visit: boolean;
  running: boolean;
  totalDistance: string;
  totalDuration: string;
  totalCalories: string;
  scheduleWayPointList: WayPoint[];
  attractionList: Attraction[];
}

/** 관광지  */
export interface ScheduleAttractionsProps {
  title: string;
  tel: string;
  name: string;
  image1: string;
  address: string;
}
