import { SelectBox, SelectOption } from '../../DropDown/SelectBox';
import React from 'react';
import {useRecoilState} from 'recoil';
import { PostWriteState } from '../../../storage/PostWrite/PostWrite';
import {PostCategory, PostType} from "../../../types/Post/Post";

export default function PostWriteSelectBlock() {
  const [state,setState] = useRecoilState(PostWriteState);
  const selectBoard = (value:PostType) => {
    setState((prev) => ({
      ...prev,
      postType: value,
    }));
  };
  const selectCategory = (value:PostCategory) => {
    setState((prev) => ({
      ...prev,
      postCategory: value,
    }));
  };
  return (
    <div className={'select-block'}>
      <div className={'board-select-block'}>
        <p className={'name-tag'}>게시판</p>
        <SelectBox event={selectBoard} selected={String(state.postType)}>
          <SelectOption value={''}>게시판 선택</SelectOption>
          <SelectOption value={'QNA'}>Q&A</SelectOption>
          <SelectOption value={'TIP'}>꿀팁</SelectOption>
        </SelectBox>
      </div>
      <div className={'category-select-block'}>
        <p className={'name-tag'}>카테고리</p>
        <SelectBox event={selectCategory} selected={String(state.postCategory)}>
          <SelectOption value={''}>카테고리 선택</SelectOption>
          <SelectOption value={'BRUTE_FORCE'}>BRUTE_FORCE</SelectOption>
          <SelectOption value={'TWO_POINTER'}>TWO_POINTER</SelectOption>
          <SelectOption value={'DP'}>DP</SelectOption>
          <SelectOption value={'QUEUE_STACK_HASH'}>QUEUE_STACK_HASH</SelectOption>
          <SelectOption value={'GRAPH'}>GRAPH</SelectOption>
          <SelectOption value={'GREEDY'}>GREEDY</SelectOption>
          <SelectOption value={'BINARY_SEARCH'}>BINARY_SEARCH</SelectOption>
          <SelectOption value={'SORT'}>SORT</SelectOption>
          <SelectOption value={'DFS_BFS'}>DFS_BFS</SelectOption>
        </SelectBox>
      </div>
    </div>
  );
}
