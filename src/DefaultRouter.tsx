import { Routes, Route, Navigate } from 'react-router-dom';
import * as Admin from './pages/Admin';
import * as MyPage from './pages/MyPage';
import SidebarLayout from './components/layouts/SidebarLayout';
import QNABoardPage from './pages/Board/Q&ABoard';
import DashBoardPage from './pages/DashBoard/DashBoard';
import TipBoardPage from './pages/Board/TipBoard';
import PostViewPage from './pages/Post/PostView/PostView';
import PostWritePage from './pages/Post/PostWrite/PostWrite';
import LandingPage from './pages/Landing/Landing';
import Post from './components/MyPage/Post/Post';
import ReportPost from './components/Report/Post/ReportPost';
import LoginProcessPage from './pages/LoginRequest/ProcessPage';
import PostUpdatePage from './pages/Post/PostWrite/PostUpdate';
import NoticeEditor from './components/Notice/NoticeEditor';
import ReportComment from './components/Report/Comment/ReportComment';
import NoticeModifyEditor from './components/Notice/NoticeModifyEditor';
import Comment from './components/MyPage/Comment/Comment';
import LogoutPage from './pages/Logout/LogoutPage';
import PrivateRoute from './components/PrivateRoute';

const adminPages = {
  base: 'admin',
  routes: [
    { link: 'notice', title: '공지사항' },
    { link: 'report', title: '신고내역 관리' },
  ],
};

const mypagePages = {
  base: 'mypage',
  routes: [
    { link: 'profile', title: '내 정보' },
    { link: 'history', title: '활동 내역' },
    { link: 'badge', title: '획득 뱃지' },
    { link: 'alarm', title: '내 알람' },
  ],
};

function Router() {
  return (
    <Routes>
      <Route path={'/access'} element={<LandingPage />} />
      <Route path={'/logout'} element={<LogoutPage />} />
      <Route path={'/google/callback'} element={<LoginProcessPage />} />
      <Route element={<PrivateRoute />}>
        <Route path={'/'} element={<DashBoardPage />} />
        <Route path="board">
          <Route path="q&a" element={<QNABoardPage />} />
          <Route path="tip" element={<TipBoardPage />} />
        </Route>
        <Route path="post">
          <Route path=":pid" element={<PostViewPage />} />
          <Route path="write" element={<PostWritePage />} />
          <Route path="update" element={<PostUpdatePage />} />
        </Route>
        <Route path="admin" element={<SidebarLayout links={adminPages} />}>
          <Route index element={<Navigate replace to="report/post" />} />
          <Route path="report" element={<Admin.Post />}>
            <Route index element={<Navigate replace to="post" />} />
            <Route path="post" element={<ReportPost />} />
            <Route path="comment" element={<ReportComment />} />
          </Route>
          <Route path="notice" element={<Admin.Notice />} />
          <Route path="notice/write" element={<NoticeEditor />} />
          <Route
            path="notice/modify/:notificationId"
            element={<NoticeModifyEditor />}
          />
        </Route>
        <Route path="mypage" element={<SidebarLayout links={mypagePages} />}>
          <Route index element={<Navigate replace to="profile" />} />
          <Route path="profile" element={<MyPage.Profile />} />
          <Route path="alarm" element={<MyPage.Alarm />} />
          <Route path="history" element={<MyPage.Post />}>
            <Route index element={<Navigate replace to="post" />} />
            <Route path="post" element={<Post />} />
            <Route path="comment" element={<Comment />} />
          </Route>
          <Route path="badge" element={<MyPage.Badge />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
