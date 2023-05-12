import { Routes, Route, Navigate } from 'react-router-dom';
import * as Admin from './pages/Admin';
import * as MyPage from './pages/MyPage';
import DashBoardPage from './pages/DashBoard';
import PostViewPage from './pages/PostView';
import PostWritePage from './pages/PostWrite';
import QNABoard from './pages/Q&ABoard';
import SidebarLayout from './components/layouts/SidebarLayout';
import ReportPost from './components/Report/ReportPost';
import Post from './components/MyPage/Post/Post';

const adminPages = [
  { link: 'notice', title: '공지사항' },
  { link: 'report', title: '신고내역 관리' },
];

const mypagePages = [
  { link: 'profile', title: '내 정보' },
  { link: 'history', title: '활동 내역' },
  { link: 'badge', title: '획득 뱃지' },
];

function Router() {
  return (
    <Routes>
      <Route index element={<div>메인</div>} />
      <Route path="admin" element={<SidebarLayout links={adminPages} />}>
        <Route index element={<Navigate to="report/post" />} />
        <Route path="report" element={<Admin.Post />}>
          <Route index element={<Navigate to="post" />} />
          <Route path="post" element={<ReportPost />} />
          <Route path="comment" element={<div>reported comment</div>} />
        </Route>
        <Route path="notice" element={<Admin.Notice />} />
      </Route>
      <Route path="mypage" element={<SidebarLayout links={mypagePages} />}>
        <Route index element={<Navigate to="profile" />} />
        <Route path="profile" element={<MyPage.Profile />} />
        <Route path="history" element={<MyPage.Post />}>
          <Route index element={<Navigate to="post" />} />
          <Route path="post" element={<Post />} />
          <Route path="comment" element={<div>comment</div>} />
        </Route>
        <Route path="badge" element={<MyPage.Badge />} />
      </Route>
      <Route path="dashboard" element={<DashBoardPage />} />
      <Route path="post" element={<PostViewPage />} />
      <Route path="write" element={<PostWritePage />} />
      <Route path="q&a" element={<QNABoard />} />
      <Route path="*" element={<div>404 잘못된 접근입니다</div>} />
    </Routes>
  );
}

export default Router;
