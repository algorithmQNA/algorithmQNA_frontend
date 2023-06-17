import React, { ChangeEvent, useRef, useState } from 'react';
import { Comment } from '../../../types/comment';
import UserProfile from '../../UserProfile/UserProfile';

import { useMutation, useQueryClient } from 'react-query';
import {
  createCommentRequest,
  deleteCommentRequest,
  pinCommentRequest,
  recommendCommentRequest,
  reportCommentRequest,
  updateCommentRequest,
} from '../../../apis/commentApi';

import { SelectBox, SelectOption } from '../../DropDown/SelectBox';

import IconButton from '../../Button/IconButton';
import {
  BsChevronCompactDown,
  BsChevronCompactUp,
  BsHandThumbsDownFill,
} from 'react-icons/bs';
import { AiOutlineLike } from 'react-icons/ai';
import { RxDotsVertical } from 'react-icons/rx';
import ThumbsDown from '../../Icon/ThumbsDown';
import FilledThumbsUp from '../../Icon/FilledThumbsUp';

import { setDateWritten } from '../../../utils/TextProcessing';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import CustomEditor from 'ckeditor5-custom-build';
import ButtonComponent from '../../Button/ButtonComponent';
import { MyCustomUploadAdapterPlugin } from '../CustomImageUpload';
import { GetPostResponse } from '../../../types/apis/postResponseType';
import useModal from '../../../hooks/useModal';
import Modal from '../../Modal/Modal';
import InputText from '../../Input/InputText';
import ReplyComment from './ReplyComment';
import { REPORT_MAP } from '../../../constants/Report';
import useGetParams from '../../../hooks/useGetParams';
import { useParams } from 'react-router-dom';

export type CommentViewProps = Comment & {
  commentMode?: 'hightlight' | 'normal';
  parentId?: number;
};

function CommentView({
  createdAt = '2023-03-31',
  content,
  dislikeCnt,
  hasChild,
  likeCnt,
  depth,
  isLiked,
  commentId,
  isPinned,
  mentionerName,
  parentId,
  commentMode = 'normal',
  ...props
}: CommentViewProps) {
  const { pid = -1 } = useParams();
  const page = useGetParams('page') || 0;
  //깊이 0이면 1까지는 자동으로 열려있음
  const defaultOpenReply =
    commentMode === 'hightlight' ? true : !depth ? true : false;
  const isRoot = !depth;
  const invalidateQueryKey = isRoot
    ? ['comment', +pid, +page]
    : ['reply', parentId];

  const [openReply, setOpenReply] = useState(defaultOpenReply);
  const [openMenu, setOpenMenu] = useState(false);
  const [mode, setMode] = useState<'read' | 'modify'>('read');
  const [openReplyEditor, setOpenReplyEditor] = useState(false);
  const [reportType, setReportType] = useState<keyof typeof REPORT_MAP | null>(
    null
  );
  const [reportContent, setReportContent] = useState('');
  const { open, openModal, closeModal } = useModal();

  /**좋아요 싫어요 관리 */
  const [fakeLike, setFakeLike] = useState<boolean | null>(isLiked);
  const handleReportMenuChange = (value: string) => {
    setReportType(value as keyof typeof REPORT_MAP);
  };

  const queryClient = useQueryClient();
  //댓글 작성
  const { mutate: writeComment } = useMutation(createCommentRequest, {
    onSuccess: () => {
      //얘는 본인 레벨을 invalidate하는게 아니라 본인 자식을 update해줘야함.
      queryClient.invalidateQueries({ queryKey: ['reply', commentId] });
      setOpenReplyEditor(false);
    },
  });
  //댓글 추천/비추천
  const { mutate: recommendComment } = useMutation(recommendCommentRequest, {
    onMutate: async (params) => {
      /**  이 쿼리키 바꿔줄거면 CommentList의 queryKey도 바꿔줄것!*/
      const POST_QUERY_KEY = invalidateQueryKey;
      await queryClient.cancelQueries({ queryKey: POST_QUERY_KEY });

      if (params.cancel) setFakeLike(null);
      else setFakeLike(params.isLike);
    },
  });
  //댓글 수정
  const { mutate: modifyComment } = useMutation(updateCommentRequest, {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: invalidateQueryKey,
      }),
    onError: (e) => alert(e),
  });

  //댓글 삭제
  const { mutate: deleteComment } = useMutation(deleteCommentRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invalidateQueryKey });
    },
    onError: () => {
      window.alert('삭제 실패했습니다.');
    },
  });

  //댓글 채택
  const { mutate: pinnedComment } = useMutation(pinCommentRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invalidateQueryKey });
    },
    onError: () => window.alert('채택을 실패 했습니다'),
  });

  //댓글 신고
  const { mutate: reportComment } = useMutation(reportCommentRequest);

  const editorRef = useRef<CKEditor<any>>(null);
  const toggleReplyEditor = () => setOpenReplyEditor((prev) => !prev);

  //같은 버튼을 눌렀다 -> 좋아요/싫어요를 취소했다.
  const isSameBtnClicked = (like: boolean) => {
    if (fakeLike === like) {
      return true;
    }
    return false;
  };

  const handleBtnClick = (like: boolean) => {
    if (!isSameBtnClicked(like)) {
      recommendComment({ commentId, isLike: like, cancel: false });
    }
  };

  return (
    <div className={`w-full ${isPinned && 'border-t-2 border-secondary'}`}>
      {isPinned && (
        <p className="text-secondary text-sm font-semibold">질문자 채택</p>
      )}
      {mentionerName && (
        <p className="font-light text-sm text-secondary my-1">
          @{mentionerName}
        </p>
      )}
      {open && (
        <Modal
          title={`${commentId}번 댓글 신고`}
          size="lg"
          onClose={closeModal}
          onConfirm={() => {
            if (reportType)
              reportComment({
                commentId,
                category: reportType,
                detail: reportContent,
              });
            closeModal();
          }}
          onCancel={closeModal}
        >
          <div className="h-[20rem]">
            <SelectBox defaultText="신고 유형" event={handleReportMenuChange}>
              {Object.entries(REPORT_MAP).map(([key, value]) => (
                <SelectOption key={key} value={key}>
                  {value}
                </SelectOption>
              ))}
            </SelectBox>
            {reportType === 'ETC' && (
              <InputText
                aria-disabled
                defaultValue={reportContent}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setReportContent(e.target?.value)
                }
              />
            )}
          </div>
        </Modal>
      )}
      <div className="grow" id={`${commentId}`}>
        <div className="flex justify-between bg-box-bg p-2 border border-border">
          <UserProfile {...props.member} />
          <div className="flex flex-row items-end">
            <span className={'text-[#9ca3af] text-xs text-right'}>
              {setDateWritten(createdAt)}
            </span>
            {/* TODO : Editor 모드 같은 거 컴포넌트 쪼개기 위해 상태들 recoil로 관리할 것 */}
            <div className="relative">
              <IconButton
                Icon={<RxDotsVertical />}
                onClick={() => setOpenMenu((prev) => !prev)}
              />
              {openMenu && (
                <ul className="absolute bg-white hover:cursor-pointer whitespace-nowrap p-4 -translate-x-8 rounded-md shadow-md [&>li]:text-gray-400 [&>li]:text-sm [&>li]:py-1">
                  <li onClick={() => setMode('modify')}>수정</li>
                  <li onClick={() => deleteComment(commentId)}>삭제</li>
                  <li onClick={() => pinnedComment(commentId)}>채택</li>
                  <li onClick={() => openModal()}>신고</li>
                </ul>
              )}
            </div>
          </div>
        </div>
        {mode === 'read' && (
          <div className="border border-border py-4 px-2">
            <div
              className="ck ck-content p-2 break-words"
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
            <div className="flex items-center">
              {fakeLike ? (
                <IconButton
                  Icon={<FilledThumbsUp width="14" />}
                  onClick={() => handleBtnClick(true)}
                />
              ) : (
                <IconButton
                  Icon={<AiOutlineLike width="14" />}
                  onClick={() => handleBtnClick(true)}
                />
              )}
              <span className="text-xs text-gray-700 p-1">{likeCnt}</span>
              {fakeLike === false ? (
                <IconButton
                  Icon={<BsHandThumbsDownFill width="14" />}
                  onClick={() => handleBtnClick(false)}
                />
              ) : (
                <IconButton
                  Icon={<ThumbsDown width="14" />}
                  onClick={() => handleBtnClick(false)}
                />
              )}

              <span className="text-xs text-gray-700 p-1">{dislikeCnt}</span>
              <IconButton Icon={<></>} onClick={toggleReplyEditor}>
                {openReplyEditor ? '답글 달기 취소' : '답글 달기'}
              </IconButton>
            </div>
          </div>
        )}
        {mode === 'modify' && (
          <div>
            <CKEditor editor={CustomEditor as unknown as any} data={content} />
            <div className="flex flex-row justify-end gap-2">
              <ButtonComponent onClick={() => setMode('read')}>
                취소
              </ButtonComponent>
              <ButtonComponent
                onClick={() => {
                  const data = editorRef.current?.editor?.data.get();
                  if (data) modifyComment({ commentId, content: data });
                  setMode('read');
                }}
              >
                수정완료
              </ButtonComponent>
            </div>
          </div>
        )}
      </div>
      {openReplyEditor && (
        <>
          <CKEditor
            config={{ extraPlugins: [MyCustomUploadAdapterPlugin] }}
            editor={CustomEditor as any}
            data=""
            ref={editorRef}
          />
          <ButtonComponent onClick={toggleReplyEditor}>취소</ButtonComponent>
          <ButtonComponent
            onClick={() => {
              const data = editorRef.current?.editor?.data.get();
              if (data && pid)
                writeComment({
                  content: data,
                  parentCommentId: commentId,
                  postId: +pid,
                });
            }}
          >
            작성
          </ButtonComponent>
        </>
      )}
      {hasChild && (
        <>
          <IconButton
            Icon={
              openReply ? (
                <BsChevronCompactUp style={{ display: 'inline' }} />
              ) : (
                <BsChevronCompactDown style={{ display: 'inline' }} />
              )
            }
            onClick={() => setOpenReply((prev) => !prev)}
            color="primary"
          >
            {openReply ? '접기' : '펴기'}
          </IconButton>
          {openReply && (
            <ReplyComment commentId={commentId} commentMode={commentMode} />
          )}
        </>
      )}
    </div>
  );
}

export default React.memo(CommentView);
