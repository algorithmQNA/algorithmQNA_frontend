import BellIcon from "../Icon/Bell";
import {useState} from "react";
import './style.css'
export default function Header(){
    const [state,setState] = useState({
        userMenuDisplay:false,
        alamDisplay:false
    })
    return(
        <div className={'w-full flex justify-between items-center container p-2 m-auto'}>
            <p className={'font-bold text-lg text-white'}>프로젝트 이름</p>
            <nav>

            </nav>
            <div className={'flex items-center gap-6'}>
                <div className={'text-white py-1 px-4 rounded relative'}
                     onMouseOver={()=>setState((prev)=>({...prev,alamDisplay:true}))}
                     onMouseOut={()=>setState((prev)=>({...prev,alamDisplay:false}))}
                >
                    <BellIcon/>
                    {
                        state.alamDisplay &&
                        <ul className={'absolute top-[110%] right-0 min-w-[150px] bg-white border border-basic p-3 z-50 shadow-lg text-black rounded'}>
                            <li className={'menu-li'}>
                                알람1
                            </li>
                            <li className={'menu-li'}>
                                알람2
                            </li>
                            <li className={'menu-li'}>
                                알람3
                            </li>
                            <li className={'menu-li'}>
                                알람4
                            </li>
                        </ul>
                    }
                </div>
                <div onMouseOver={()=>setState((prev)=>({...prev,userMenuDisplay:true}))}
                     onMouseOut={()=>setState((prev)=>({...prev,userMenuDisplay:false}))}
                     className={'relative'}
                >
                    <span className={'text-white py-1 px-2 rounded text-sm'}>{'사용자명'} 님</span>
                    {
                        state.userMenuDisplay &&
                        <ul className={'absolute top-[110%] right-0 min-w-[150px] bg-white border border-basic p-3 z-50 shadow-lg rounded'}>
                            <li className={'menu-li'}>
                                메뉴1
                            </li>
                            <li className={'menu-li'}>
                                메뉴1
                            </li>
                            <li className={'menu-li'}>
                                메뉴1
                            </li>
                            <li className={'menu-li'}>
                                메뉴1
                            </li>
                        </ul>
                    }
                </div>
            </div>
        </div>
    )
}