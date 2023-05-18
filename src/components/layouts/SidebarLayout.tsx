import React, { ReactElement } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

type SidebarLayoutProps = {
  links: { title: string; link: string }[];
  children?: ReactElement;
};

function SidebarLayout({ links }: SidebarLayoutProps) {
  /** 모바일 환경에서 헤더/사이드바 제외한 부분 클릭 시 사이드바 닫히도록 */
  return (
    <div className="mx-auto my-4 max-w-[1200px] min-h-[600px]">
      <div className="bg-white flex flex-wrap md:flex-nowrap gap-4">
        <aside className="w-full sm:w-48 transition-transform">
          <menu className="p-2 overflow-y-auto bg-white border-border border">
            <p aria-label="메뉴 이름" className="text-sm font-semibold">
              메뉴
            </p>
            <ul className="before:content-normal before:block before:bg-secondary before:w-7 before:h-px before:my-1">
              {links.map((link) => (
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
  );
}

export default SidebarLayout;
