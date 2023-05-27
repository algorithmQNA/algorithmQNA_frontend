import { Routes, Route, Navigate } from 'react-router-dom';
import * as Admin from './pages/Admin';
import * as MyPage from './pages/MyPage';
import SidebarLayout from './components/layouts/SidebarLayout';
import QNABoardPage from './pages/Board/Q&ABoard';
import DashBoardPage from './pages/DashBoard/DashBoard';
import TipBoardPage from './pages/Board/TipBoard';
import PostViewPage from './pages/PostView/PostView';
import PostWritePage from './pages/PostWrite/PostWrite';
import LandingPage from './pages/Landing/Landing';
import Post from './components/MyPage/Post/Post';
import ReportPost from './components/Report/ReportPost';
import CommentTest from './pages/CommentTest';

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
      <Route path={'/'} element={<DashBoardPage />} />
      <Route path={'/access'} element={<LandingPage />} />
      <Route path="board">
        <Route path="q&a" element={<QNABoardPage />} />
        <Route path="tip" element={<TipBoardPage />} />
      </Route>
      <Route path="post">
        <Route path="view" element={<PostViewPage />} />
        <Route path="write" element={<PostWritePage />} />
      </Route>
      <Route path="/comment/:postId" element={<CommentTest />}></Route>
      <Route path="admin" element={<SidebarLayout links={adminPages} />}>
        <Route index element={<Navigate to="report/post" />} />
        <Route path="report" element={<Admin.Post />}>
          <Route index element={<Navigate to="post" />} />
          <Route path="post" element={<ReportPost />} />
          <Route path="comment" element={<div>내가 쓴 댓글</div>} />
        </Route>
        <Route path="notice" element={<Admin.Notice />} />
      </Route>
      <Route path="mypage" element={<SidebarLayout links={mypagePages} />}>
        <Route index element={<Navigate to="profile" />} />
        <Route path="profile" element={<MyPage.Profile />} />
        <Route path="history" element={<MyPage.Post />}>
          <Route index element={<Navigate to="post" />} />
          <Route path="post" element={<Post />} />
          <Route path="comment" element={<div>내가 쓴 댓글</div>} />
        </Route>
        <Route path="badge" element={<MyPage.Badge />} />
      </Route>
    </Routes>
  );
}

export default Router;
