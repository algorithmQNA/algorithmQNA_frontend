import {ChangeEvent, useEffect, useState} from "react";
import {FiCircle, FiSearch, FiX} from "react-icons/fi";
import InputComponent from "../../Input/InputComponent";

export default function FilterBar() {
    const [checked, setChecked] = useState<string[]>([]);


    return(
        <div className={'board-side-bar'}>
            <div className={'side-block-title'}>
                필터링
                <span className={'under-border'}></span>
            </div>
            <input type={'text'} className={'p-1 text-sm border border-baisc focus:border-primary rounded w-full'} placeholder={'검색'}/>
            <ul className={'select-filter side-block-ul'}>
                <label className={'side-block-li'}>
                    <input
                        type={'checkbox'}
                        className={'hidden'}
                    />
                    <p>
                        <span className={'flex items-center gap-1'}>닉네임</span>
                    </p>
                </label>
                <label className={'side-block-li'}>
                    <input
                        type={'checkbox'}
                        className={'hidden'}
                    />
                    <p>
                        <span className={'flex items-center gap-1'}>제목</span>
                    </p>
                </label>
                <label className={'side-block-li'}>
                    <input
                        type={'checkbox'}
                        className={'hidden'}
                    />
                    <p>
                        <span className={'flex items-center gap-1'}>키워드</span>
                    </p>
                </label>
                <label className={'side-block-li'}>
                    <input
                        type={'checkbox'}
                        className={'hidden'}
                    />
                    <p>
                        <span className={'flex items-center gap-1'}>댓글 <FiCircle size={12}/></span>
                    </p>
                </label>
                <label className={'side-block-li'}>
                    <input
                        type={'checkbox'}
                        className={'hidden'}
                    />
                    <p>
                        <span className={'flex items-center gap-1'}>댓글 <FiX/></span>
                    </p>
                </label>
                <label className={'side-block-li'}>
                    <input
                        type={'checkbox'}
                        className={'hidden'}
                    />
                    <p>
                        <span className={'flex items-center gap-1'}>채택 <FiCircle size={12}/></span>
                    </p>
                </label>
                <label className={'side-block-li'}>
                    <input
                        type={'checkbox'}
                        className={'hidden'}
                    />
                    <p>
                        <span className={'flex items-center gap-1'}>채택 <FiX/></span>
                    </p>
                </label>
            </ul>
        </div>
    )
}