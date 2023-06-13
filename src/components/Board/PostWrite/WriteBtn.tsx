import ButtonComponent from '../../Button/ButtonComponent';
import React from 'react';
import { useMutation } from 'react-query';
import { createPostRequest } from '../../../apis/postApi';
import { useRecoilValue } from 'recoil';
import { PostWriteState } from '../../../storage/PostWrite/PostWrite';
import { PostCategory, PostType, PostWrite } from '../../../types/Post/Post';
import { AxiosError } from 'axios';
import { ErrorType } from '../../../types/Error';
import {useNavigate} from "react-router-dom";

export default function PostWriteBtn() {
  const nav = useNavigate()
  const state = useRecoilValue(PostWriteState);
  /**
   * MESSAGE:
   * 포스팅 테스트한다고 해당 부분 임시로 수정해두었습니다. 오승님이 편한방식대로 수정하시면 됩니다!
   * author:이진희
   */
  const { mutate } = useMutation(
    ({
      title,
      content,
      postCategory,
      postType,
      keyWord,
      imageIds,
    }: PostWrite) =>
      createPostRequest({
        title,
        content,
        category: postCategory,
        contentType: postType as PostType,
        keyWords: keyWord,
        imageIds,
      }),
    {
      onSuccess: () => {
        alert('작성 완료 됐습니다. \n 게시판 목록으로 돌아갑니다.');
        nav(-1)
      },
      onError: (error: AxiosError) => {
        if (!error.response) return;
        const { data } = error.response;
        const result = data as ErrorType;
        alert(result.status.message);
      },
    }
  );
  const writeEnd = () => {
    console.log(state);
    if (state.title === '') {
      alert('제목 입력란에 한글자 이상 입력이 필요합니다');
      return;
    } else if (!state.postCategory) {
      alert('카테고리를 선택 해주세요');
      return;
    } else if (!state.postType) {
      alert('작성할 글의 게시판 분류를 선택 해주세요');
      return;
    } else {
      mutate(state);
    }
  };
  return (
    <div className={'text-right'}>
      <ButtonComponent onClick={writeEnd}>등록</ButtonComponent>
    </div>
  );
}
