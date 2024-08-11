import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import MainPage from './Main/MainPage';
import Header from '@/components/common/Header/Header';
import RouteAddMainPage from './Route/RouteAddMainPage';
import RouteAddPlacePage from './Route/RouteAddPlacePage';
import LoginPage from './Auth/LoginPage';
import ScheduleMainPage from './Schedule/ScheduleMainPage';
import RouteList from './Route/RouteList';
import MeetPage from './Meet/MeetPage';
import MeetDetailPage from './Meet/MeetDetailPage';
import SignupPage from './Auth/SignupPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={'/login'} replace={true} />} />
        <Route path="/login" element={<LoginPage />} />

        {/* <Route path="/" element={<Header />}> */}
        <Route path="signup" element={<SignupPage />} />
        <Route path="main" element={<MainPage />} />
        <Route path="schedule/main" element={<ScheduleMainPage />} />
        <Route path="route/list" element={<RouteList />} />

        <Route path="route/addMain" element={<RouteAddMainPage />} />
        <Route path="route/add" element={<RouteAddPlacePage />} />

        <Route path="meet" element={<MeetPage />} />
        <Route path="meet/:id" element={<MeetDetailPage />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
