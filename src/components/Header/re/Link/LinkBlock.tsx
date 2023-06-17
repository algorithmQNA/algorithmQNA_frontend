import {Link} from "react-router-dom";

export default function HeaderLinkBlock(){
    return(
        <nav
            className={
                'flex justify-between text-base md:text-xl font-bold gap-2 md:gap-6 whitespace-nowrap col-span-1 w-fit'
            }
        >
            <Link to={'/'} className={'mr-2 md:mr-6'}>
                Logo
            </Link>
            <Link className={'hover:text-primary transition-colors duration-300'} to={'/board/q&a'}>Q&A</Link>
            <Link className={'hover:text-primary transition-colors duration-300'} to={'/board/tip'}>꿀팁</Link>
        </nav>
    )
}