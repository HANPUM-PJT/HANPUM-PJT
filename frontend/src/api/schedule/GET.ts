import api from '../index';

/** 일정 - 진행중 tab */
export async function getRunningScheduleData(
  lat: number,
  lon: number,
  token: string,
) {
  const response = await api.get('/api/schedule/running', {
    params: {
      lat,
      lon,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });

  return response.data;
}

/** 일정 - 내일정 tab */
export async function getMyScheduleData(id: string, token: string) {
  const response = await api.get('/api/schedule', {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });

  return response.data;
}

/** 일정 - 모임일정 tab */
export async function getGroupScheduleData(token: string) {
  const response = await api.get('/api/schedule/group', {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });

  return response.data;
}

/** 일정 - 일자별 일정조회 */
export async function getDayNumData(
  id: string,
  dayNumber: number,
  token: string,
) {
  const response = await api.get(`/api/schedule/day/${dayNumber}`, {
    params: {
      scheduleId: id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });

  return response.data;
}

/** 일정 - 주변 관광지 정보 가져오기 */
export async function getNearbyLocData(
  OS: string,
  distance: number,
  lat: number,
  lon: number,
  token: string,
) {
  const response = await api.get('/api/schedule/nearby', {
    params: {
      OS,
      distance,
      lat,
      lon,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });

  return response.data;
}
