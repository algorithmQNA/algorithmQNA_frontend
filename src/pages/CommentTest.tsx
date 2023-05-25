import React, { MouseEventHandler, useState } from 'react';
import CommentView from '../components/CommentView/Comment';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getPostRequest } from '../apis/postApi';

function CommentTest() {
  //const [selectedComment, setSelectedComment] = useState(-1);
  const { postId } = useParams();
  const [isScrolling, setIsScrolling] = useState(false);
  const { data } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => {
      if (postId) return getPostRequest(+postId);
      return getPostRequest(2000);
    },
    onSuccess: (t) => {
      console.log(t);
      //   setSelectedComment(
      //     t.data.comments.find((comment) => comment.isPinned)?.commentId || -1
      //   );
      // },
    },
  });

  const marginLeft: { [key: string]: string } = {
    0: 'ml-0',
    1: 'ml-6',
    2: 'ml-12',
  };

  if (data?.data.comments) {
    const selectedComment =
      data.data.comments.find((comment) => comment.isPinned)?.commentId || -1;
    const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
      if (selectedComment === -1) {
        window.alert('채택된 답변이 없습니다');
        return;
      }
      setIsScrolling(true);
      const pinnedElement = document.getElementById(`${selectedComment}`);
      pinnedElement?.scrollIntoView({ behavior: 'smooth' });
    };
    console.log(selectedComment);
    return (
      <>
        <button onClick={handleClick}>채택된 답변으로</button>
        <div className="w-full p-4 flex flex-col">
          {data.data.comments.map((t) => (
            <div
              className={`${marginLeft[t.depth]} ${
                isScrolling &&
                t.commentId === selectedComment &&
                'bg-orange-200'
              }`}
              id={`${t.commentId}`}
              key={`${t.commentId}`}
              tabIndex={-1}
            >
              <CommentView {...t} key={t.commentId} />
            </div>
          ))}
        </div>
      </>
    );
  }
  return <div>잘못된 페이지입니다</div>;
}

export default CommentTest;
