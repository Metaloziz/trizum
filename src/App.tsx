import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AppRoutes } from 'app/enums/AppRoutes';
import { SecondaryRoutes } from 'app/enums/SecondaryRoutes';
import AddNewsPage from 'components/add-news-page';
import { ArticleFromEditor } from 'components/blog-page/ArticleFromEditor/ArticleFromEditor';
import DefaultLayout from 'components/layout/default/DefaultLayout';
import OlympiadsListPage from 'components/olympiads-list-page/OlympiadsListPage';
import { observer } from 'mobx-react-lite';
import Blog from 'pages/blog/Blog';
import Classes from 'pages/classes/Classes';
import Courses from 'pages/courses/Courses';
import Franchising from 'pages/franchising/Franchising';
import { GameWrapper } from 'pages/game/Game';
import GameItems from 'pages/game/GameItems';
import Home from 'pages/home/Home';
import Homework from 'pages/homework/Homework';
import LoginWithSMS from 'pages/login/LoginWithSMS/LoginWithSMS';
import Olympiads from 'pages/olympiads/Olympiads';
import Pay from 'pages/pay/Pay';
import Rate from 'pages/rate/Rate';
import Report from 'pages/report/Report';
import Schedule from 'pages/schedule/Schedule';
import Statistic from 'pages/statistic/Statistic';
import Result from 'pages/testing/result/Result';
import Test from 'pages/testing/test/Test';
import { Testing } from 'pages/testing/Testing';
import { TestsList } from 'pages/testing/TestsList/TestsList';
import UserInfo from 'pages/user-info/UserInfo';
import Users from 'pages/users/Users';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import HomeWorkStatistics from './components/HomeWorkStatistics/HomeWorkStatistics';

const App = observer(() => (
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <Router>
      <Routes>
        <Route path={AppRoutes.Index} element={<DefaultLayout />}>
          <Route path={AppRoutes.Index} element={<Home />} />

          <Route path={AppRoutes.Blog}>
            <Route path="" element={<Blog />} />
            <Route path={SecondaryRoutes.AddArticle} element={<AddNewsPage />} />
            <Route path=":articleName" element={<ArticleFromEditor />} />
          </Route>

          <Route path={AppRoutes.Classes}>
            <Route path="" element={<Classes />} />
            <Route path={`:${SecondaryRoutes.StudentId}`} element={<HomeWorkStatistics />} />
          </Route>

          <Route path={AppRoutes.Courses} element={<Courses />} />
          <Route path={AppRoutes.Franchising} element={<Franchising />} />
          <Route path={`${AppRoutes.Games}`} element={<GameWrapper />} />

          <Route path={`${AppRoutes.Games}/:gameName`} element={<GameItems />} />
          <Route path={AppRoutes.Homework} element={<Homework />} />
          <Route path={AppRoutes.Signin} element={<LoginWithSMS />} />

          <Route path={AppRoutes.Olympiads}>
            <Route path="" element={<Olympiads />} />
            {/* <Route path=":id" element={<Olympiad />} /> */}
            <Route path={AppRoutes.OlympiadsListPage} element={<OlympiadsListPage />} />
          </Route>

          <Route path={AppRoutes.Payment} element={<Pay />} />
          <Route path={AppRoutes.Rate} element={<Rate />} />
          <Route path={AppRoutes.Report} element={<Report />} />
          <Route path={AppRoutes.Schedule} element={<Schedule />} />
          <Route path={AppRoutes.Statistic} element={<Statistic />} />

          <Route path={AppRoutes.Testing}>
            <Route path="" element={<Testing />} />
            <Route path={SecondaryRoutes.CurrentElement} element={<Test />} />
            <Route path={SecondaryRoutes.Result} element={<Result />} />
            <Route path={SecondaryRoutes.AddTest} element={<TestsList />} />
          </Route>
          <Route path={AppRoutes.UserInfo} element={<UserInfo />} />
          <Route path={AppRoutes.Users} element={<Users />} />
        </Route>
      </Routes>
    </Router>
  </LocalizationProvider>
));

export default App;
