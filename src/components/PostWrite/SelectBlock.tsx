import {SelectBox, SelectOption} from "../DropDown/SelectBox";
import React from "react";

export default function PostWriteSelectBlock(){
    return(
        <div className={'select-block'}>
            <div className={'board-select-block'}>
                <p className={'name-tag'}>게시판</p>
                <SelectBox defaultText={'게시판 선택'}>
                    <SelectOption value={''}>Q&A</SelectOption>
                    <SelectOption value={''}>꿀팁</SelectOption>
                </SelectBox>
            </div>
            <div className={'category-select-block'}>
                <p className={'name-tag'}>카테고리</p>
                <SelectBox defaultText={'분류 선택'}>
                    <SelectOption value={''}>카테고리1</SelectOption>
                    <SelectOption value={''}>카테고리2</SelectOption>
                </SelectBox>
            </div>
        </div>
    )
}