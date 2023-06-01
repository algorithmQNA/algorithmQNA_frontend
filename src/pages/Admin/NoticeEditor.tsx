import React, { ChangeEvent, useEffect } from 'react';
import InputText from '../../components/Input/InputText';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { PostWriteState } from '../../storage/PostWrite/PostWrite';
import PostWriteCKEditor from '../../components/Board/PostWrite/CKEditor';
import ButtonComponent from '../../components/Button/ButtonComponent';
import { SelectBox, SelectOption } from '../../components/DropDown/SelectBox';
import { POST_CATEGORY } from '../../constants/PostCategory';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { createPostRequest } from '../../apis/postApi';

function NoticeEditor() {
  const navigate = useNavigate();
  const [state, setState] = useRecoilState(PostWriteState);
  const resetState = useResetRecoilState(PostWriteState);
  const createPost = useMutation(
    ({
      title,
      content,
      categoryId,
      contentTypeId,
    }: {
      title: string;
      content: string;
      categoryId: number;
      contentTypeId: number;
    }) => createPostRequest(title, content, categoryId, contentTypeId)
  );

  useEffect(() => {
    setState((prev) => ({ ...prev, kind: 1 }));
    return () => resetState();
  }, [resetState, setState]);

  const handleCategoryChange = (category: string) => {
    setState((prev) => ({ ...prev, category: +category }));
  };

  const handleCancelBtnClick = () => {
    navigate(-1);
  };

  const submitNotificationForm = () => {
    console.log(state);
    createPost.mutate({
      title: state.title,
      content: state.content,
      categoryId: 1,
      contentTypeId: 1,
    });
  };

  return (
    <div>
      <div className={'title-block'}>
        <InputText
          defaultValue={state.title}
          placeholder="공지사항 제목"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setState((prev) => ({ ...prev, title: e.target?.value }))
          }
        />
      </div>
      <SelectBox defaultText="전체" event={handleCategoryChange}>
        {Object.entries(POST_CATEGORY).map((t) => (
          <SelectOption value={t[0]} key={t[0]}>
            {t[1]}
          </SelectOption>
        ))}
      </SelectBox>

      <PostWriteCKEditor />
      <div className="flex flex-row justify-between">
        <ButtonComponent type="outline" onClick={handleCancelBtnClick}>
          취소
        </ButtonComponent>
        <ButtonComponent
          // TODO : catogoryId, contentTypeId 타입 number->string으로 바꿀것
          onClick={submitNotificationForm}
        >
          작성
        </ButtonComponent>
      </div>
    </div>
  );
}

export default NoticeEditor;
