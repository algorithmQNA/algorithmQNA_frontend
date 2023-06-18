import React, { ChangeEvent, useEffect } from 'react';
import InputText from '../Input/InputText';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { PostWriteState } from '../../storage/PostWrite/PostWrite';
import PostWriteCKEditor from '../Board/PostWrite/CKEditor';
import ButtonComponent from '../Button/ButtonComponent';
import { SelectBox, SelectOption } from '../DropDown/SelectBox';
import { POST_CATEGORY } from '../../constants/PostCategory';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { createPostRequest } from '../../apis/postApi';
import { PostCategoryKey } from '../../types/post';
import { ImSpinner } from 'react-icons/im';
import { PostCategory } from '../../types/Post/Post';

function NoticeEditor() {
  const navigate = useNavigate();
  const [state, setState] = useRecoilState(PostWriteState);
  const resetState = useResetRecoilState(PostWriteState);

  const createPost = useMutation(
    ({
      title,
      content,
      postCategory,
      keyWords = [],
    }: {
      title: string;
      content: string;
      postCategory: PostCategoryKey;
      keyWords?: string[];
    }) =>
      createPostRequest({
        title,
        content,
        category: postCategory,
        contentType: 'NOTICE',
        imageIds: [],
        keyWords,
      }),
    {
      onSuccess: () => {
        /** window.alert말고 notification 컴포넌트 만들기 */
        alert('공지사항 등록을 성공했습니다.');
        navigate(-1);
      },
    }
  );

  useEffect(() => {
    setState((prev) => ({ ...prev, kind: 1 }));
    return () => resetState();
  }, [resetState, setState]);

  const handleCategoryChange = (category: PostCategory) => {
    console.log(category);
    setState((prev) => ({ ...prev, postCategory: category }));
  };

  const handleCancelBtnClick = () => {
    navigate(-1);
  };

  const submitNotificationForm = () => {
    if (state.title.length > 5 && state.content.length > 10) {
      const postCategory = state.postCategory || 'BRUTE_FORCE';
      createPost.mutate({
        title: state.title,
        content: state.content,
        postCategory: postCategory,
      });
    } else {
      alert('제목과 내용을 입력해주세요');
    }
  };

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
        {!createPost.isLoading ? (
          <ButtonComponent onClick={submitNotificationForm}>
            작성
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

export default NoticeEditor;
