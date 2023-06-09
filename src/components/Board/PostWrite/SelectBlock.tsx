import { SelectBox, SelectOption } from '../../DropDown/SelectBox';
import React from 'react';
import {useRecoilState} from 'recoil';
import { PostWriteState } from '../../../storage/PostWrite/PostWrite';
import {PostCategory, PostType} from "../../../types/Post/Post";
import {POST_CATEGORY} from "../../../constants/PostCategory";

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
        <SelectBox event={selectBoard} selected={state.postType}>
          <SelectOption value={''}>게시판 선택</SelectOption>
          <SelectOption value={'QNA'}>Q&A</SelectOption>
          <SelectOption value={'TIP'}>꿀팁</SelectOption>
        </SelectBox>
      </div>
      <div className={'category-select-block'}>
        <p className={'name-tag'}>카테고리</p>
        <SelectBox event={selectCategory} selected={state.postCategory}>
          <SelectOption value={''}>카테고리 선택</SelectOption>
          <SelectOption value={'BRUTE_FORCE'}>{POST_CATEGORY['BRUTE_FORCE']}</SelectOption>
          <SelectOption value={'TWO_POINTER'}>{POST_CATEGORY['TWO_POINTER']}</SelectOption>
          <SelectOption value={'DP'}>{POST_CATEGORY['DP']}</SelectOption>
          <SelectOption value={'QUEUE_STACK_HASH'}>{POST_CATEGORY['QUEUE_STACK_HASH']}</SelectOption>
          <SelectOption value={'GRAPH'}>{POST_CATEGORY['GRAPH']}</SelectOption>
          <SelectOption value={'GREEDY'}>{POST_CATEGORY['GREEDY']}</SelectOption>
          <SelectOption value={'BINARY_SEARCH'}>{POST_CATEGORY['BINARY_SEARCH']}</SelectOption>
          <SelectOption value={'SORT'}>{POST_CATEGORY['SORT']}</SelectOption>
          <SelectOption value={'DFS_BFS'}>{POST_CATEGORY['DFS_BFS']}</SelectOption>
        </SelectBox>
      </div>
    </div>
  );
}
