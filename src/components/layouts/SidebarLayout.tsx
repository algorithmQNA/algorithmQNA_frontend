import React, { ReactNode, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { ReactComponent as Hamburger } from "../../assets/images/Hamburger.svg";

type SidebarLayoutProps = {
  children?: ReactNode;
  pageTitle: string;
  links: { title: string; link: string }[];
};

function SidebarLayout({ pageTitle, links }: SidebarLayoutProps) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleOpenSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  /** 모바일 환경에서 헤더/사이드바 제외한 부분 클릭 시 사이드바 닫히도록 */
  const handleClickMain = () => {
    setOpenSidebar(false);
  };

  return (
    <div className="max-w-screen-xl mx-auto h-full">
      <header className="p-5">
        <button
          aria-controls="sidebar-multi-level-sidebar"
          className="inline-flex items-center p-0 md:hidden"
          onClick={toggleOpenSidebar}
        >
          <Hamburger className="w-6 h-6" />
        </button>
        <h1 className="font-bold text-3xl">{pageTitle}</h1>
      </header>

      <div className="relative h-full">
        <aside
          className={`absolute top-0 left-0 z-40 w-64 h-full transition-transform sm:translate-x-0 ${
            !openSidebar && "-translate-x-full"
          }`}
        >
          <menu className="h-full p-0 overflow-y-auto bg-white border-gray-100 border-y border-r">
            {links.map((link) => (
              <li key={link.title}>
                <NavLink
                  to={link.link}
                  className={({ isActive }) =>
                    `block w-full h-full ps-3 py-2 border-l-8 ${
                      isActive
                        ? "border-primary bg-gray-100"
                        : "border-transparent"
                    }`
                  }
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </menu>
        </aside>
        <main
          className="min-h-full p-4 sm:ml-64 border-gray-100 border-y"
          onClick={handleClickMain}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default SidebarLayout;
