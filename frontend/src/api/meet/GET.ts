import api from '..';

/** 모임 신청 리스트 조회 */
export const GetMeetApplyList = async (groupId: number, token: string) => {
  const response = await api.get(`/api/group/${groupId}/apply-list`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });

  return response.data;
};

/** 모임 신청 리스트 조회 */
export const GetMeetMemberList = async (groupId: number, token: string) => {
  const response = await api.get(`/api/group/${groupId}/member-list`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });

  return response.data;
};

/** 모임 멤버 상세 조회 */
export const GetMeetMemberDetailList = async (
  groupId: number,
  groupMemberId: number,
  token: string,
) => {
  const response = await api.get(
    `/api/group/${groupId}/member/${groupMemberId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: '*/*',
      },
    },
  );

  return response.data;
};

/** 모임 상세 조회 */
export const GetMeetDetailList = async (groupId: number, token: string) => {
  const response = await api.get(`/api/group/${groupId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });

  return response.data;
};

/** 모임 리스트 조회 */
export const GetMeetList = async (token: string) => {
  const response = await api.get(`/api/group`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });

  return response.data;
};