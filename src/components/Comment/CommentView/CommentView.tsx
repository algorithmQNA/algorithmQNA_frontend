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

export type CommentViewProps = Comment;
/**리팩토링 시급!!!! */

function CommentView({
  createdAt = '2023-03-31',
  content,
  dislikeCnt,
  hasChild,
  likeCnt,
  depth,
  isLiked,
  commentId,
  ...props
}: CommentViewProps) {
  const pid = useGetParams('pid') || 0;
  const page = useGetParams('page') || 0;
  const [openReply, setOpenReply] = useState(!depth ? true : false);
  const [openMenu, setOpenMenu] = useState(false);
  const [mode, setMode] = useState<'read' | 'modify'>('read');
  const [openReplyEditor, setOpenReplyEditor] = useState(false);
  const [reportType, setReportType] = useState<keyof typeof REPORT_MAP | null>(
    null
  );
  const [reportContent, setReportContent] = useState('');
  const { open, openModal, closeModal } = useModal();

  const handleReportMenuChange = (value: string) => {
    setReportType(value as keyof typeof REPORT_MAP);
  };

  const queryClient = useQueryClient();
  //댓글 작성
  const { mutate: writeComment } = useMutation(createCommentRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment', pid] });
      setOpenReplyEditor(false);
    },
  });
  //댓글 추천/비추천
  const { mutate: recommendComment } = useMutation(recommendCommentRequest, {
    onMutate: async (params) => {
      /**  이 쿼리키 바꿔줄거면 CommentList의 queryKey도 바꿔줄것!*/
      const POST_QUERY_KEY = ['comment', +pid, +page];
      await queryClient.cancelQueries({ queryKey: POST_QUERY_KEY });
      const previous =
        queryClient.getQueryData<GetPostResponse>(POST_QUERY_KEY);

      queryClient.setQueryData<Comment[] | undefined>(
        POST_QUERY_KEY,
        (commentList) => {
          const curComment = commentList?.find(
            (comment) => comment.commentId === commentId
          );
          console.log(curComment);
          if (curComment) {
            if (params.cancel) curComment.isLiked = null;
            else curComment.isLiked = params.isLike;
          }
          return commentList;
        }
      );
      return { previous };
    },
  });
  //댓글 수정
  const { mutate: modifyComment } = useMutation(updateCommentRequest, {
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['comment', pid, page] }),
  });

  //댓글 삭제
  const { mutate: deleteComment } = useMutation(deleteCommentRequest);

  //댓글 채택
  const { mutate: pinnedComment } = useMutation(pinCommentRequest, {
    onSuccess: () => window.alert('채택완료했습니다'),
    onError: () => window.alert('채택을 실패 했습니다'),
  });

  //댓글 신고
  const { mutate: reportComment } = useMutation(reportCommentRequest);

  const editorRef = useRef<CKEditor<any>>(null);
  const toggleReplyEditor = () => setOpenReplyEditor((prev) => !prev);

  const isSameBtnClicked = (like: boolean) => {
    if (isLiked === like) {
      recommendComment({ commentId, isLike: false, cancel: true });
      return true;
    }
    return false;
  };

  const handleBtnClick = (like: boolean) => {
    if (!isSameBtnClicked(like))
      recommendComment({ commentId, isLike: like, cancel: false });
  };

  return (
    <div className="w-full">
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
      <div className="grow">
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
              {isLiked ? (
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
              {isLiked === false ? (
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
                  //const data = '<p>수정된 파일입니다.</p>';
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
          {openReply && <ReplyComment commentId={commentId} />}
        </>
      )}
    </div>
  );
}

export default React.memo(CommentView);