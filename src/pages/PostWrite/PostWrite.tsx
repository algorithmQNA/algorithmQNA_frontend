import React, {ChangeEvent, useState} from 'react';
import ButtonComponent from "../../components/Button/ButtonComponent";
import InputText from "../../components/Input/InputText";
import PageTitle from "../../components/PageTitle/PageTitle";
import './style.css'
import PostWriteCKEditor from "../../components/PostWrite/CKEditor";
import PostWriteSelectBlock from "../../components/PostWrite/SelectBlock";

export default function PostWritePage(){
    const [title,setTitle] = useState('')
    const changeTitle = (e:ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.target.value)
    }
    return(
        <div>
            <PageTitle>
                글 작성
            </PageTitle>
            <div className={'main-content post-write-page'}>
                <div className={'title-block'}>
                    <p className={'name-tag'}>제목</p>
                    <InputText/>
                </div>
                <PostWriteSelectBlock/>
                <PostWriteCKEditor/>
                <div className={'text-right'}>
                    <ButtonComponent>
                        등록
                    </ButtonComponent>
                </div>
            </div>
        </div>
    )
}