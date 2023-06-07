import React from "react";


export default function PostViewKeywordBlock(){
    const keyword = ['안녕','하세요','반갑','습니다','인사']

    return(
        <div className={'post-content'}>
            <div className={'flex flex-wrap gap-3'}>
                {
                    keyword.map((li,index)=>(
                        <p key={index} className={'p-1.5 rounded bg-basic text-sm flex gap-0.5 text-gray-600 w-fit'}>
                            <span>#</span>
                            <span className={'whitespace-nowrap'}>{li}</span>
                        </p>
                    ))
                }
            </div>
        </div>
    )
}