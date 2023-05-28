import { SelectBox, SelectOption } from '../../DropDown/SelectBox';
import React from 'react';
import {useRecoilState} from 'recoil';
import { PostWriteState } from '../../../storage/PostWrite/PostWrite';

export default function PostWriteSelectBlock() {
  const [state,setState] = useRecoilState(PostWriteState);
  const selectBoard = (value: string) => {
    setState((prev) => ({
      ...prev,
      postType: parseInt(value),
    }));
  };
  const selectCategory = (value: string) => {
    setState((prev) => ({
      ...prev,
      postCategory: parseInt(value),
    }));
  };
  return (
    <div className={'select-block'}>
      <div className={'board-select-block'}>
        <p className={'name-tag'}>게시판</p>
        <SelectBox event={selectBoard} selected={String(state.postType)}>
          <SelectOption value={''}>게시판 선택</SelectOption>
          <SelectOption value={'1'}>Q&A</SelectOption>
          <SelectOption value={'2'}>꿀팁</SelectOption>
        </SelectBox>
      </div>
      <div className={'category-select-block'}>
        <p className={'name-tag'}>카테고리</p>
        <SelectBox event={selectCategory} selected={String(state.postCategory)}>
          <SelectOption value={''}>카테고리 선택</SelectOption>
          <SelectOption value={'1'}>카테고리1</SelectOption>
          <SelectOption value={'2'}>카테고리2</SelectOption>
        </SelectBox>
      </div>
    </div>
  );
}
