import React from "react";

export default function DataIsLoading(){
    return(
        <div className={'fixed opacity-50 left-0 top-0 white-50 w-full h-full flex justify-center items-center z-[10000]'}>
            <span className={'block w-[100px]'}>
                <img src={'/svg/spinner.png'} alt={'progress'} className={'w-auto h-[100%]'}/>
            </span>
        </div>
    )
}