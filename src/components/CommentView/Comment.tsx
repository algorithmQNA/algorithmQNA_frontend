import { useState } from 'react';
import UserProfile, { UserProfileProps } from '../UserProfile/UserProfile';
import IconButton from '../Button/IconButton';
import { BsChevronCompactDown } from 'react-icons/bs';
import { setDateWritten } from '../../utils/TextProcessing';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import CustomEditor from 'ckeditor5-custom-build';
import ThumbsDown from '../Icon/ThumbsDown';
import FilledThumbsUp from '../Icon/FilledThumbsUp';
import { GetPostResponse } from '../../types/apis/postResponseType';
import { Comment } from '../../types/comment';
import { AiOutlineLike } from 'react-icons/ai';

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
  const [modify, setModify] = useState(false);
  const [hasMoreComments, setHasMoreComments] = useState(depth === 0);
  const [openMenu, setOpenMenu] = useState(true);
  const toggleModify = () => setModify((prev) => !prev);
  return (
    <>
      <div className="my-5">
        <div className="flex justify-between bg-box-bg p-2 border border-border">
          <UserProfile {...props} />
          <span className={'text-[#9ca3af] text-xs text-right'}>
            {setDateWritten(createdAt)}
          </span>
        </div>
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
            <IconButton Icon={<></>} onClick={toggleModify}>
              답글달기
            </IconButton>
          </div>
        </div>
      </div>
      {modify && (
        <CKEditor
          editor={CustomEditor}
          data=""
          onChange={(t, editor) => console.log(editor.getData())}
        />
      )}
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
