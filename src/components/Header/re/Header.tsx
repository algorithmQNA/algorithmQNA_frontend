import {FiSearch,FiBell} from 'react-icons/fi'
import '../style.css'

export default function HeaderTest(){
    return(
        <header className={'w-full'}>
            <div className={'grid grid-cols-4 max-w-[1024px] w-full m-auto text-white gap-4 items-center'}>
                <div className={'flex justify-between text-xl font-bold gap-6 whitespace-nowrap col-span-1 w-fit'}>
                    <p className={'mr-4'}>
                        Project
                    </p>
                    <p>
                        Q&A
                    </p>
                    <p>
                        꿀팁
                    </p>
                </div>
                <div className={'flex justify-between items-center border border-white p-2 gap-2 w-full max-w-[300px] col-span-2 m-auto'}>
                    <input type={'text'} className={'bg-transparent w-full h-full text-sm'}/>
                    <span>
                        <FiSearch/>
                    </span>
                </div>
                <div className={'flex items-center w-full col-span-1 justify-end gap-6'}>
                    <div>
                        <span><FiBell size={30}/></span>
                    </div>
                    <div className={'w-[45px] h-[45px] rounded-full border border-white'}>

                    </div>
                </div>
            </div>
        </header>
    )
}