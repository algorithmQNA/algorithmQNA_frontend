import { useState } from 'react';
import { Comment } from '../../types/comment';
import UserProfile, { UserProfileProps } from '../UserProfile/UserProfile';

import { DropDown } from '../DropDown/DropDown';
import { SelectOption } from '../DropDown/SelectBox';

import IconButton from '../Button/IconButton';
import { BsChevronCompactDown } from 'react-icons/bs';
import { AiOutlineLike } from 'react-icons/ai';
import { RxDotsVertical } from 'react-icons/rx';
import ThumbsDown from '../Icon/ThumbsDown';
import FilledThumbsUp from '../Icon/FilledThumbsUp';

import { setDateWritten } from '../../utils/TextProcessing';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import CustomEditor from 'ckeditor5-custom-build';
import ButtonComponent from '../Button/ButtonComponent';

export type CommentViewProps = Comment & UserProfileProps;

function CommentView({
  createdAt = '2023-03-31',
  commentId,
  content,
  dislikeCount,
  likeCount,
  isLiked,
  depth,
  ...props
}: CommentViewProps) {
  const [mode, setMode] = useState<'read' | 'modify'>('read');
  const [openReplyEditor, setModify] = useState(false);
  const [hasMoreComments, setHasMoreComments] = useState(depth === 0);
  const [openMenu, setOpenMenu] = useState(true);
  const toggleReplyEditor = () => setModify((prev) => !prev);
  const changeMode = (mode: 'read' | 'modify') => {
    setMode(mode);
  };

  console.log('MODE', mode);
  return (
    <>
      <div className="my-5">
        <div className="flex justify-between bg-box-bg p-2 border border-border">
          <UserProfile {...props} />
          <div className="flex flex-row items-end">
            <span className={'text-[#9ca3af] text-xs text-right'}>
              {setDateWritten(createdAt)}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log('클릭했는딩,,');
                setMode('modify');
              }}
            >
              수정보드 on
            </button>
            <DropDown
              component={
                <span className={'w-4'}>
                  <RxDotsVertical style={{ display: 'inline' }} />
                </span>
              }
              location={'left'}
            >
              <SelectOption value={'카테고리1'}>수정</SelectOption>
              <SelectOption value={'카테고리2'}>삭제</SelectOption>
              <SelectOption value={'카테고리3'}>하이</SelectOption>
            </DropDown>
          </div>
        </div>
        {mode === 'read' && (
          <div className="border border-border py-4 px-2">
            <div
              className="ck ck-content p-2"
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
            <div className="flex items-center">
              {isLiked ? (
                <IconButton Icon={<FilledThumbsUp width="14" />} />
              ) : (
                <IconButton Icon={<AiOutlineLike width="14" />} />
              )}

              <span className="text-xs text-gray-700 p-1">{likeCount}</span>
              <IconButton Icon={<ThumbsDown width="14" />} />
              <span className="text-xs text-gray-700 p-1">{dislikeCount}</span>
              <IconButton Icon={<></>} onClick={toggleReplyEditor}>
                답글달기
              </IconButton>
            </div>
          </div>
        )}
        {/*{mode === 'modify' && (*/}
        {/*  <div>*/}
        {/*    <CKEditor editor={CustomEditor} data={content}></CKEditor>*/}
        {/*    <ButtonComponent onClick={() => setMode('read')}>*/}
        {/*      취소*/}
        {/*    </ButtonComponent>*/}
        {/*    <ButtonComponent onClick={() => setMode('read')}>*/}
        {/*      수정완료*/}
        {/*    </ButtonComponent>*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
      {/*{openReplyEditor && (*/}
      {/*  <CKEditor*/}
      {/*    editor={CustomEditor}*/}
      {/*    data=""*/}
      {/*    onChange={(t, editor) => console.log(editor.getData())}*/}
      {/*  />*/}
      {/*)}*/}
      {hasMoreComments && (
        <IconButton
          Icon={<BsChevronCompactDown style={{ display: 'inline' }} />}
          color="primary"
        >
          답글 보기
        </IconButton>
      )}
    </>
  );
}

export default CommentView;
