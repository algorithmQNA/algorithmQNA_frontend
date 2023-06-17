import ButtonComponent from '../../Button/ButtonComponent';
import React from 'react';
import { useMutation } from 'react-query';
import {updatePostRequest} from '../../../apis/postApi';
import { useRecoilValue } from 'recoil';
import { PostWriteState } from '../../../storage/PostWrite/PostWrite';
import {PostType, PostWrite} from '../../../types/Post/Post';
import { AxiosError } from 'axios';
import { ErrorType } from '../../../types/Error';
import useGetParams from "../../../hooks/useGetParams";
import {useNavigate} from "react-router-dom";


export default function PostUpdateBtn() {
    const nav = useNavigate()
    const id = useGetParams("pid")
    const state = useRecoilValue(PostWriteState);
    const { mutate } = useMutation(
        ({ title, content, postCategory, postType, keyWord, imageIds }: PostWrite) =>
            updatePostRequest(parseInt(id as string),title, content, postCategory, postType as PostType, keyWord, imageIds),
        {
            onSuccess: () => {
                alert('수정 완료 됐습니다. \n 게시글로 돌아갑니다.');
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
            <ButtonComponent onClick={writeEnd}>수정</ButtonComponent>
        </div>
    );
}
