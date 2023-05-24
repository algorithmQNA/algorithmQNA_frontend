import React, {ChangeEvent} from 'react';
import InputText from "../../components/Input/InputText";
import PageTitle from "../../components/PageTitle/PageTitle";
import './style.css'
import PostWriteCKEditor from "../../components/Board/PostWrite/CKEditor";
import PostWriteSelectBlock from "../../components/Board/PostWrite/SelectBlock";
import {useRecoilState} from "recoil";
import {PostWriteState} from "../../storage/PostWrite/PostWrite";
import PostWriteBtn from "../../components/Board/PostWrite/WriteBtn";
import ButtonComponent from "../../components/Button/ButtonComponent";

export default function PostWritePage(){
    const [state,setState] = useRecoilState(PostWriteState)
    const changeTitle = (e:ChangeEvent<HTMLInputElement>) =>{
        setState((prev)=>({
            ...prev,title:e.target.value
        }))
    }
    return(
        <div>
            <PageTitle>
                글 작성
            </PageTitle>
            <div className={'main-content post-write-page'}>
                <div className={'title-block'}>
                    <p className={'name-tag'}>제목</p>
                    <InputText defaultValue={state.title} onChange={changeTitle}/>
                </div>
                <PostWriteSelectBlock/>
                <PostWriteCKEditor/>
                <PostWriteBtn/>
            </div>
        </div>
    )
}