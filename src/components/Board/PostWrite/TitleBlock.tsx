import InputText from "../../Input/InputText";
import React, {ChangeEvent} from "react";
import {useRecoilState} from "recoil";
import {PostWriteState} from "../../../storage/PostWrite/PostWrite";

export default function PostWriteTitleBlock(){
    const [state, setState] = useRecoilState(PostWriteState);
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setState((prev) => ({
            ...prev,
            title: e.target.value,
        }));
    };
    return(
        <div className={'title-block'}>
            <p className={'name-tag'}>제목</p>
            <InputText defaultValue={state.title} onChange={changeTitle} />
        </div>
    )
}