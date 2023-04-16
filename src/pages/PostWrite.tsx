import React, {ChangeEvent, Component, useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {SelectBox, SelectOption} from "../components/DropDown/SelectBox";
import InputComponent from "../components/Input/InputComponent";
import ButtonComponent from "../components/Button/ButtonComponent";
export default function PostWritePage(){
    const [title,setTitle] = useState('')
    const changeTitle = (e:ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.target.value)
    }
    return(
        <div className={'container m-auto'}>
            <div className={'flex flex-col gap-4 bg-white p-4'}>
                <div className={'w-full flex flex-col gap-1'}>
                    <p className={'font-bold text-sm'}>제목</p>
                    <InputComponent
                        value={title}
                        placeholder={'제목'}
                        onChange={changeTitle}
                    />
                </div>
                <div className={'flex gap-4 w-full'}>
                    <div className={'w-full flex flex-col gap-1'}>
                        <p className={'font-bold text-sm'}>게시판</p>
                        <SelectBox defaultText={'게시판 선택'}>
                            <SelectOption value={''}>Q&A</SelectOption>
                            <SelectOption value={''}>꿀팁</SelectOption>
                        </SelectBox>
                    </div>
                    <div className={'w-full flex flex-col gap-1'}>
                        <p className={'font-bold text-sm'}>카테고리</p>
                        <SelectBox defaultText={'분류 선택'}>
                            <SelectOption value={''}>카테고리1</SelectOption>
                            <SelectOption value={''}>카테고리2</SelectOption>
                        </SelectBox>
                    </div>
                </div>
                <div>
                    <CKEditor
                        editor={ ClassicEditor }
                        data="<p>Hello from CKEditor 5!</p>"
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.

                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();

                        } }
                        onBlur={ ( event, editor ) => {

                        } }
                        onFocus={ ( event, editor ) => {

                        } }
                    />
                </div>
                <div className={'text-right'}>
                    <ButtonComponent>
                        등록
                    </ButtonComponent>
                </div>
            </div>
        </div>
    )
}