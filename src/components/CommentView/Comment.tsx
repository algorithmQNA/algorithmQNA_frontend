import { useRef, useState } from 'react';
import { Comment } from '../../types/comment';
import UserProfile, { UserProfileProps } from '../UserProfile/UserProfile';

import { useMutation } from 'react-query';
import { createCommentRequest } from '../../apis/commentApi';

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
import { MyCustomUploadAdapterPlugin } from './CustomImageUpload';
import { useRecoilValue } from 'recoil';
import { isLogin } from '../../storage/Login/Login';

export type CommentViewProps = Comment & UserProfileProps;

function CommentView({
  createdAt = '2023-03-31',
  commentId,
  content,
  dislikeCnt,
  hasChild,
  likeCnt,
  isLiked,
  depth,
  ...props
}: CommentViewProps) {
  const { id } = useRecoilValue(isLogin);
  //나중에 내 id랑 비교하는 것도 필요하게씀!..
  const [mode, setMode] = useState<'read' | 'modify'>('read');
  const [openReplyEditor, setOpenReplyEditor] = useState(false);
  const { mutate: writeComment } = useMutation(createCommentRequest, {
    onSuccess: () => setOpenReplyEditor(false),
  });

  const editorRef = useRef<CKEditor<CustomEditor>>(null);
  const toggleReplyEditor = () => setOpenReplyEditor((prev) => !prev);

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
                setMode('modify');
              }}
            >
              수정보드 on
            </button>
            <div className="relative">
              <IconButton Icon={<RxDotsVertical />} />
              <ul className="absolute bg-white hover:cursor-pointer whitespace-nowrap p-4 -translate-x-8 rounded-md shadow-md">
                <li
                  onClick={() => {
                    console.log('!클릭');
                  }}
                >
                  수정
                </li>
                <li>삭제</li>
                <li>채택</li>
                <li>신고</li>
              </ul>
            </div>

            {/* <DropDown
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
            </DropDown> */}
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

              <span className="text-xs text-gray-700 p-1">{likeCnt}</span>
              <IconButton Icon={<ThumbsDown width="14" />} />
              <span className="text-xs text-gray-700 p-1">{dislikeCnt}</span>
              <IconButton Icon={<></>} onClick={toggleReplyEditor}>
                {openReplyEditor ? '답글 달기 취소' : '답글 달기'}
              </IconButton>
            </div>
          </div>
        )}
        {mode === 'modify' && (
          <div>
            <CKEditor editor={CustomEditor} data={content} />
            <ButtonComponent onClick={() => setMode('read')}>
              취소
            </ButtonComponent>
            <ButtonComponent onClick={() => setMode('read')}>
              수정완료
            </ButtonComponent>
          </div>
        )}
      </div>
      {openReplyEditor && (
        <>
          <CKEditor
            config={{ extraPlugins: [MyCustomUploadAdapterPlugin] }}
            editor={CustomEditor}
            data=""
            ref={editorRef}
          />
          <ButtonComponent onClick={toggleReplyEditor}>취소</ButtonComponent>
          <ButtonComponent
            onClick={() => {
              const data = editorRef.current?.editor?.data.get();
              if (data)
                writeComment({
                  content: data,
                  parentCommentId: 1000,
                  postId: 2000,
                });
            }}
          >
            작성
          </ButtonComponent>
        </>
      )}
      {hasChild && (
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
