import React, { ReactElement, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { ReactComponent as Hamburger } from '../../assets/images/Hamburger.svg';

type SidebarLayoutProps = {
  links: { title: string; link: string }[];
  children?: ReactElement;
};

function SidebarLayout({ links }: SidebarLayoutProps) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [title, setTitle] = useState('');

  const toggleOpenSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  /** 모바일 환경에서 헤더/사이드바 제외한 부분 클릭 시 사이드바 닫히도록 */
  const handleClickMain = () => {
    setOpenSidebar(false);
  };

  return (
    <div className="mx-auto my-0 max-w-[1200px]">
      <div className="min-h-[1000px] bg-white flex flex-wrap md:flex-nowrap">
        <aside className="w-full sm:w-48 transition-transform">
          <menu className="h-full p-2 overflow-y-auto bg-white border-gray-100 border-y border-r">
            <p className="text-sm font-semibold">메뉴</p>
            <ul className="before:content-normal before:block before:bg-orange-400 before:w-7 before:h-px before:my-1">
              {links.map((link) => (
                <li key={link.title}>
                  <NavLink
                    to={link.link}
                    className={({ isActive }) => {
                      const defaultStyle =
                        'block w-full h-full ps-3 py-2 hover:text-gray-800 transition-colors duration-200 text-xs';
                      if (isActive) {
                        // setTitle(link.title);
                        console.log('IS ACTIVE,', link.link, isActive);
                        return `${defaultStyle} text-gray-800`;
                      }
                      return `${defaultStyle} text-gray-500`;
                    }}
                  >
                    {link.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </menu>
        </aside>
        <main
          className="p-4 border-gray-100 border-y flex-grow"
          onClick={handleClickMain}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default SidebarLayout;
