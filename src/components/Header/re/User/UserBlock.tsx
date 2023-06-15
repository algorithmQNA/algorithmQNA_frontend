import {useNavigate} from "react-router-dom";
import React from "react";
import AlarmBlock from "./Alarm";
import UserMenuBlock from "./UserMenu";


export default function HeaderUserBlock(){

    return (
        <div className={'flex items-center w-fit col-span-1 justify-end gap-3 md:gap-6 relative select-none'}>
            <AlarmBlock/>
            <UserMenuBlock/>
        </div>
    );
}