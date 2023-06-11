import React, { ReactElement } from 'react';
import { NavLink, Outlet, matchPath, useLocation } from 'react-router-dom';
import PageTitle from '../PageTitle/PageTitle';

type SidebarLayoutProps = {
  links: { base: string; routes: { title: string; link: string }[] };
  children?: ReactElement;
};

function SidebarLayout({ links }: SidebarLayoutProps) {
  const location = useLocation();
  const pathname = location.pathname;

  /**
   * 사이드바 레이아웃 적용상태에서 페이지 타이틀 바꿔주기 위한 함수
   */
  const matchRoute = links.routes.find((route) => {
    if (matchPath(`${links.base}/${route.link}/*`, pathname)) {
      return route.title;
    }
    return false;
  });

  return (
    <>
      <PageTitle>{matchRoute?.title || ''}</PageTitle>
      <div className="mx-auto my-4 max-w-[1200px] min-h-[600px]">
        <div className="bg-white flex flex-wrap md:flex-nowrap gap-4">
          <aside className="w-full sm:w-48 transition-transform">
            <menu className="p-2 overflow-y-auto bg-white border-border border">
              <p aria-label="메뉴 이름" className="text-sm font-semibold">
                메뉴
              </p>
              <ul className="before:content-normal before:block before:bg-secondary before:w-7 before:h-px before:my-1">
                {links.routes.map((link) => (
                  <li key={link.title}>
                    <NavLink
                      role="menuitem"
                      to={link.link}
                      className={({ isActive }) => {
                        const defaultStyle =
                          'block w-full h-full ps-3 py-2 hover:text-gray-800 transition-colors duration-200 text-xs';
                        return `${defaultStyle} ${
                          isActive ? 'text-gray-950' : 'text-gray-400'
                        }`;
                      }}
                    >
                      {link.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </menu>
          </aside>
          <main className="p-4 border-border border flex-grow">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default SidebarLayout;
