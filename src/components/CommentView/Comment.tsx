import { useRef, useState } from 'react';
import { Comment } from '../../types/comment';
import UserProfile, { UserProfileProps } from '../UserProfile/UserProfile';

import { useMutation, useQueryClient } from 'react-query';
import {
  createCommentRequest,
  deleteCommentRequest,
  pinCommentRequest,
  recommendCommentRequest,
  reportCommentRequest,
  updateCommentRequest,
} from '../../apis/commentApi';

import { DropDown } from '../DropDown/DropDown';
import { SelectBox, SelectOption } from '../DropDown/SelectBox';

import IconButton from '../Button/IconButton';
import { BsChevronCompactDown, BsHandThumbsDownFill } from 'react-icons/bs';
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
import { useParams } from 'react-router-dom';
import { GetPostResponse } from '../../types/apis/postResponseType';
import useModal from '../../hooks/useModal';
import Modal from '../Modal/Modal';
import InputText from '../Input/InputText';
import { REPORT_MAP } from '../../constants/Report';
import { Report } from '../../types/report';

export type CommentViewProps = Comment & UserProfileProps;

/**리팩토링 시급!!!! */
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
  const ROLE: 'admin' | 'user' = 'admin';
  //TODO :: 나중에 내 id랑 비교하는 것도 필요하게씀!..
  const { postId } = useParams();
  const [openMenu, setOpenMenu] = useState(false);
  const [mode, setMode] = useState<'read' | 'modify'>('read');
  const [openReplyEditor, setOpenReplyEditor] = useState(false);
  const [reportType, setReportType] = useState<Report | null>(null);
  const { open, openModal, closeModal } = useModal();

  const handleReportMenuChange = (value: string) => {
    console.log(value);
  };

  const queryClient = useQueryClient();
  //댓글 작성
  const { mutate: writeComment } = useMutation(createCommentRequest, {
    onSuccess: () => setOpenReplyEditor(false),
  });
  //댓글 추천/비추천
  const { mutate: recommendComment } = useMutation(recommendCommentRequest, {
    onMutate: async (params) => {
      const POST_QUERY_KEY = ['post', postId];
      await queryClient.cancelQueries({ queryKey: POST_QUERY_KEY });
      const previous =
        queryClient.getQueryData<GetPostResponse>(POST_QUERY_KEY);

      queryClient.setQueryData(POST_QUERY_KEY, (old) => {
        const {
          data: { commentList },
        } = old as { data: GetPostResponse };
        const curComment = commentList.find(
          (comment) => comment.commentId === commentId
        );
        if (curComment) {
          if (params.cancel) curComment.isLiked = null;
          else curComment.isLiked = params.isLike;
        }

        return old;
      });
      return { previous };
    },
  });
  //댓글 수정
  const { mutate: modifyComment } = useMutation(updateCommentRequest);

  //댓글 삭제
  const { mutate: deleteComment } = useMutation(deleteCommentRequest);

  //댓글 채택
  const { mutate: pinnedComment } = useMutation(pinCommentRequest);

  //댓글 신고
  const { mutate: reportComment } = useMutation(reportCommentRequest);

  const editorRef = useRef<CKEditor<CustomEditor>>(null);
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
    <>
      {open && (
        <Modal
          size="lg"
          onClose={closeModal}
          onConfirm={() => {}}
          onCancel={closeModal}
        >
          <div className="h-[32rem]">
            <SelectBox defaultText="신고 유형" event={handleReportMenuChange}>
              {Object.entries(REPORT_MAP).map(([key, value]) => (
                <SelectOption key={key} value={key}>
                  {value}
                </SelectOption>
              ))}
            </SelectBox>
            <InputText aria-disabled></InputText>
          </div>
        </Modal>
      )}
      <div className="grow">
        <div className="flex justify-between bg-box-bg p-2 border border-border">
          <UserProfile {...props} />
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
              className="ck ck-content p-2"
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
            <CKEditor editor={CustomEditor} data={content} />
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
