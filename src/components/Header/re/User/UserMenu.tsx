import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import {getMemberDetailInfo} from "../../../../apis/authApi";

export default function UserMenuBlock(){
    const {data,isLoading}:{data:any,isLoading:boolean} = useQuery(['user'],getMemberDetailInfo)

    const [state, setState] = useState({
        menu: false,
    })
    const setDisplayAlarm = (e: ChangeEvent<HTMLInputElement>) => {
        setState((prev) => ({
            ...prev,
            menu: e.target.checked
        }));
    };
    const box = useRef<any>(null)
    useEffect(() => {
        const setCheck = (e: globalThis.MouseEvent) => {
            const target = e.target as Element;
            if (state.menu && !box.current?.contains(target)) {
                setState((prev) => ({
                    ...prev,
                    menu: false,
                }));
            }
        };
        document.addEventListener('click', setCheck);
        return () => document.removeEventListener('click', setCheck);
    }, [state.menu]);
    return(
        <div ref={box}>
            <label className={'block w-[45px] h-[45px] rounded-full border border-white relative'}>
                <input
                    type={'checkbox'}
                    className={'hidden'}
                    checked={state.menu}
                    onChange={setDisplayAlarm}
                />
                <span className={'bell-shake block hover:text-primary hover:cursor-pointer'}>
                </span>
            </label>
            {state.menu && (
                <div
                    className={
                        'alarm absolute border border-primary w-[100px] right-0 top-[110%] bg-white  rounded shadow p-2 overflow-auto grid max-h-[250px] box-content'
                    }
                >
                    <Link to={'/mypage/profile'} className={'text-content hover:text-primary text-sm flex items-center py-1'}>
                        마이 페이지
                    </Link>
                    <Link to={'/logout'} className={'text-content hover:text-primary text-sm flex items-center py-1'}>
                        로그아웃
                    </Link>
                </div>
            )}
        </div>
    )
}