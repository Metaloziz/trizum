import React from 'react';

import './App.css';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AppRoutes } from 'app/enums/AppRoutes';
import { Article } from 'components/blog-page/Article/Article';
import DefaultLayout from 'components/layout/default/DefaultLayout';
import Rate from 'components/rate/Rate';
import Blog from 'pages/blog/Blog';
import Classes from 'pages/classes/Classes';
import Courses from 'pages/courses/Courses';
import Franchising from 'pages/franchising/Franchising';
import GameWrapper from 'pages/game/Game';
import Home from 'pages/home/Home';
import Homework from 'pages/homework/Homework';
import HomeworkAddEdit from 'pages/homework/HomeworkAddEdit/HomeworkAddEdit';
import Login from 'pages/login/Login';
import Olympiad from 'pages/olympiads/Olympiad/Olympiad';
import Olympiads from 'pages/olympiads/Olympiads';
import Pay from 'pages/pay/Pay';
import Report from 'pages/report/Report';
import Schedule from 'pages/schedule/Schedule';
import Statistic from 'pages/statistic/Statistic';
import Result from 'pages/testing/result/Result';
import Test from 'pages/testing/test/Test';
import { Testing } from 'pages/testing/Testing';
import UserInfo from 'pages/user-info/UserInfo';
import Users from 'pages/users/Users';
import Games from 'pages/games/Games';

const App = observer(() => (
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <Router>
      <Routes>
        <Route path={AppRoutes.Index} element={<DefaultLayout />}>
          <Route path={AppRoutes.Index} element={<Home />} />

          <Route path={AppRoutes.Blog}>
            <Route path="" element={<Blog />} />
            <Route path=":articleName" element={<Article />} />
          </Route>

          <Route path={AppRoutes.Classes} element={<Classes />} />
          <Route path={AppRoutes.Courses} element={<Courses />} />
          <Route path={AppRoutes.Franchising} element={<Franchising />} />
          <Route path={`${AppRoutes.Games}/*`} element={<GameWrapper />} />
          {/* <Route path={AppRoutes.Games} element={<Game />} /> */}
          <Route path={AppRoutes.Homework} element={<Homework />} />
          <Route path={`${AppRoutes.Homework}${AppRoutes.Add}`} element={<HomeworkAddEdit />} />
          <Route path={AppRoutes.Signin} element={<Login />} />

          <Route path={AppRoutes.Olympiads}>
            <Route path="" element={<Olympiads />} />
            <Route path=":id" element={<Olympiad />} />
          </Route>

          <Route path={AppRoutes.Payment} element={<Pay />} />
          <Route path={AppRoutes.Rate} element={<Rate />} />
          <Route path={AppRoutes.Report} element={<Report />} />
          <Route path={AppRoutes.Schedule} element={<Schedule />} />
          <Route path={AppRoutes.Statistic} element={<Statistic />} />

          <Route path={AppRoutes.Testing}>
            <Route path="" element={<Testing />} />
            <Route path=":testName" element={<Test />} />
            <Route path="result" element={<Result />} />
          </Route>

          <Route path={AppRoutes.UserInfo} element={<UserInfo />} />
          <Route path={AppRoutes.Users} element={<Users />} />
        </Route>
      </Routes>
    </Router>
  </LocalizationProvider>
));

export default App;
