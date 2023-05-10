import { Routes, Route, Navigate } from "react-router-dom";
import * as Admin from "./pages/Admin";
import * as MyPage from "./pages/MyPage";
import SidebarLayout from "./components/layouts/SidebarLayout";
import QNABoardPage from "./pages/Board/Q&ABoard";
import DashBoardPage from "./pages/DashBoard/DashBoard";
import TipBoardPage from "./pages/Board/TipBoard";
import PostViewPage from "./pages/PostView/PostView";
import PostWritePage from "./pages/PostWrite/PostWrite";

const adminPages = [
  { link: "notice", title: "공지사항" },
  { link: "post", title: "게시판 글 관리" },
];

const mypagePages = [
  { link: "profile", title: "내 정보" },
  { link: "post", title: "내가 쓴 글" },
];

function Router() {
  return (
    <Routes>
      <Route path={'/'} element={<DashBoardPage/>}/>
        <Route path="board">
            <Route path="q&a" element={<QNABoardPage/>} />
            <Route path="tip" element={<TipBoardPage/>} />
        </Route>
        <Route path="post">
            <Route path="view" element={<PostViewPage/>} />
            <Route path="write" element={<PostWritePage/>} />
        </Route>
      <Route path="admin" element={<SidebarLayout links={adminPages} />}>
        <Route index element={<Navigate to="post" />} />
        <Route path="post" element={<Admin.Post />} />
        <Route path="notice" element={<Admin.Notice />} />
      </Route>
      <Route path="mypage" element={<SidebarLayout links={mypagePages} />}>
        <Route index element={<Navigate to="profile" />} />
        <Route path="profile" element={<MyPage.Profile />} />
        <Route path="post" element={<MyPage.Post />} />
      </Route>
    </Routes>
  );
}

export default Router;
