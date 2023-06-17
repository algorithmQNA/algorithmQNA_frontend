import {Link, useLocation} from "react-router-dom";
import LogoIcon from "../../../Icon/Icon";

export default function HeaderLinkBlock(){
    const {pathname} = useLocation()
    return(
        <nav
            className={
                'flex justify-between text-base md:text-xl items-center font-bold gap-2 md:gap-6 whitespace-nowrap col-span-1 w-fit'
            }
        >
            <Link to={'/'} className={'mr-2 md:mr-6'}>
                <span className={'block w-[75px] h-auto text-white hover:text-primary transition-colors duration-300'}>
                    <LogoIcon/>
                </span>
            </Link>
            <Link className={`hover:text-primary transition-colors duration-300 ${pathname === '/board/q&a' && 'text-primary'}`} to={'/board/q&a'}>Q&A</Link>
            <Link className={`hover:text-primary transition-colors duration-300 ${pathname === '/board/tip' && 'text-primary'}`} to={'/board/tip'}>꿀팁</Link>
        </nav>
    )
}