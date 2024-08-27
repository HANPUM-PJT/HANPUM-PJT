import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';

import Header from '@/components/common/Header/Header';

import {
  LoginPage,
  MainPage,
  ScheduleMainPage,
  AddSchedulePage,
  RouteList,
  MeetList,
  MeetDetailPage,
  RouteAddPlacePage,
  RouteAddMainPage,
  RouteDetailPage,
  RouteAddDetailPage,
  SearchPlacePage,
  RouteAddCompletePage,
  DetailMineSchedulePage,
  SuccessAddSchedulePage,
  RoteListMorePage,
  RouteListSearchPage,
  MeetFilterPage,
  MemberManageList,
  MeetRequest,
  RequestManageList,
  MeetAcceptPage,
  MeetAddMainPage,
} from './index'; // index.tsx에서 컴포넌트를 가져옵니다.
import SignupPage from './Auth/SignupPage';
import FindPage from './Auth/FindPage';
import { useEffect, useState } from 'react';
import useIsAuth from '@/hooks/auth/useIsAuth';

export default function Router() {
  const isAuthEnticated = useIsAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* {isAuthEnticated ? ( */}
        <>
          <Route path="/" element={<MainPage />} />
          {/* 일정 */}
          <Route path="/schedule/main" element={<ScheduleMainPage />} />
          <Route path="/schedule/addSchedule" element={<AddSchedulePage />} />
          <Route
            path="/schedule/detail/mine"
            element={<DetailMineSchedulePage />}
          />
          <Route
            path="/schedule/success"
            element={<SuccessAddSchedulePage />}
          />
          {/* 경로 */}
          <Route path="/route/list" element={<RouteList />} />
          <Route path="/route/detail/:routeid" element={<RouteDetailPage />} />
          <Route path="/route/addMain" element={<RouteAddMainPage />} />
          <Route path="/route/addDetail" element={<RouteAddDetailPage />} />
          <Route path="/route/add" element={<RouteAddPlacePage />} />
          <Route path="route/search" element={<SearchPlacePage />} />
          <Route path="route/add/complete" element={<RouteAddCompletePage />} />
          <Route path="route/list/more" element={<RoteListMorePage />} />
          <Route path="route/list/search" element={<RouteListSearchPage />} />
          {/* 모임 */}
          <Route path="/meet/list" element={<MeetList />} />
          <Route path="/meet/:id" element={<MeetDetailPage />} />
          <Route path="/meet/filter" element={<MeetFilterPage />} />
          <Route
            path="/meet/requestManageList"
            element={<RequestManageList />}
          />
          <Route path="/meet/memberMangeList" element={<MemberManageList />} />
          <Route path="/meet/request" element={<MeetRequest />} />
          <Route path="/meet/accept" element={<MeetAcceptPage />} />
          <Route path="/meet/addMain" element={<MeetAddMainPage />} />

          <Route path="*" element={<Navigate to="/" />} />
        </>
        {/* ) : (
     <>
           <Route path="/login" element={<LoginPage />} />
         <Route path="/signup" element={<SignupPage />} />
        <Route path="/find/:account" element={<FindPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
       </>
       )} */}
      </Routes>
    </BrowserRouter>
  );
}
