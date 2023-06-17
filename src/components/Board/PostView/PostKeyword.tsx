import React from "react";
import {useQuery, useQueryClient} from "react-query";


export default function PostViewKeywordBlock({data}:{data:any}){
    return(
        <div className={'post-content'}>
            <div className={'flex flex-wrap gap-3'}>
                {
                    data.data.postKeyWords.map((li:string,index:number)=>(
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