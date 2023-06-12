export default function HeaderLinkBlock(){
    return(
        <nav
            className={
                'flex justify-between text-base md:text-xl font-bold gap-2 md:gap-6 whitespace-nowrap col-span-1 w-fit'
            }
        >
            <a href={'/'} className={'mr-2 md:mr-6'}>
                Logo
            </a>
            <a className={'hover:text-primary transition-colors duration-300'} href={'/board/q&a'}>Q&A</a>
            <a className={'hover:text-primary transition-colors duration-300'} href={'/board/tip'}>꿀팁</a>
        </nav>
    )
}