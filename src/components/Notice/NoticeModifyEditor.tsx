import React, { ChangeEvent, useEffect } from 'react';
import InputText from '../Input/InputText';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { PostWriteState } from '../../storage/PostWrite/PostWrite';
import PostWriteCKEditor from '../Board/PostWrite/CKEditor';
import ButtonComponent from '../Button/ButtonComponent';
import { SelectBox, SelectOption } from '../DropDown/SelectBox';
import { POST_CATEGORY } from '../../constants/PostCategory';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { getPostRequest, updatePostRequest } from '../../apis/postApi';
import { ImSpinner } from 'react-icons/im';
import { PostCategory } from '../../types/Post/Post';

function NoticeModifyEditor() {
  const navigate = useNavigate();
  const { notificationId = '' } = useParams();

  const [state, setState] = useRecoilState(PostWriteState);
  const resetState = useResetRecoilState(PostWriteState);

  useQuery(['notice', notificationId], () => getPostRequest(+notificationId), {
    onSuccess: (res) => {
      const data = res.data.data;
      console.log('?', data);
      setState({
        postType: 'NOTICE',
        imageIds: [],
        keyWord: [],
        postCategory: data.postCategory || '',
        content: data.postContent,
        title: data.postTitle,
      });
    },
    enabled: !!notificationId,
  });

  const modifyPost = useMutation(
    () => {
      if (notificationId)
        updatePostRequest(
          +notificationId,
          state.title,
          state.content,
          state.postCategory,
          'NOTICE',
          [],
          []
        );
      return new Promise((_, rej) => rej('notificationId'));
    },
    {
      onSettled: () => {
        navigate(-1);
        alert('수정 성공');
      },
    }
  );

  useEffect(() => {
    setState((prev) => ({ ...prev, kind: 1 }));
    return () => resetState();
  }, [resetState, setState]);

  const handleCategoryChange = (category: PostCategory) => {
    setState((prev) => ({ ...prev, postCategory: category }));
  };

  const handleCancelBtnClick = () => {
    navigate(-1);
  };

  const submitNotificationForm = () => {
    if (state.title.length > 5 && state.content.length > 10)
      modifyPost.mutate();
    else {
      alert('제목과 내용을 입력해주세요');
    }
  };
  console.log(state);
  return (
    <div className="flex flex-col gap-2">
      <div className={'title-block'}>
        <label htmlFor="title">공지사항 제목</label>
        <InputText
          id="title"
          defaultValue={state.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setState((prev) => ({ ...prev, title: e.target?.value }))
          }
        />
      </div>
      <div>
        <label htmlFor="postCategory">카테고리</label>
        <SelectBox
          id="postCategory"
          defaultText={POST_CATEGORY['BRUTE_FORCE']}
          defaultValue={'BRUTE_FORCE'}
          event={handleCategoryChange}
        >
          {Object.entries(POST_CATEGORY).map((category) => (
            <SelectOption value={category[0]} key={category[0]}>
              {category[1]}
            </SelectOption>
          ))}
        </SelectBox>
      </div>

      <PostWriteCKEditor />
      <div className="flex flex-row justify-between">
        <ButtonComponent type="outline" onClick={handleCancelBtnClick}>
          취소
        </ButtonComponent>
        {!modifyPost.isLoading ? (
          <ButtonComponent
            // TODO : catogoryId, contentTypeId 타입 number->string으로 바꿀것
            onClick={submitNotificationForm}
          >
            수정
          </ButtonComponent>
        ) : (
          <button className="rounded-md bg-box-bg px-2">
            <ImSpinner className="animate-spin inline-block mr-2" />
            등록중
          </button>
        )}
      </div>
    </div>
  );
}

export default NoticeModifyEditor;
