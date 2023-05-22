import React, { MouseEventHandler, useState } from 'react';
import CommentView from '../components/CommentView/Comment';
import { useQuery } from 'react-query';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getPostRequest } from '../apis/postApi';
import IconButton from '../components/Button/IconButton';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import ButtonComponent from '../components/Button/ButtonComponent';

function CommentTest() {
  //const [selectedComment, setSelectedComment] = useState(-1);
  const { postId } = useParams();
  const [isScrolling, setIsScrolling] = useState(false);
  const location = useLocation();
  const page = new URLSearchParams(location.search).get('page') || 0;
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

  if (data?.data.commentList) {
    const selectedComment =
      data.data.commentList.find((comment) => comment.isPinned)?.commentId ||
      -1;
    const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
      if (selectedComment === -1) {
        window.alert('채택된 답변이 없습니다');
        return;
      }
      setIsScrolling(true);
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
      const pinnedElement = document.getElementById(`${selectedComment}`);
      pinnedElement?.scrollIntoView({ behavior: 'smooth' });
    };
    const Controller = () => (
      <div className=" flex flex-row items-center fixed bottom-10 right-10 bg-box-bg border border-border rounded-md p-4 shadow-sm">
        <Link to={`${location.pathname}?page=${+page - 1}`}>
          <IconButton Icon={<BiChevronLeft />}></IconButton>
        </Link>
        <div>{page}/10</div>
        <Link to={`${location.pathname}?page=${+page + 1}`}>
          <IconButton Icon={<BiChevronRight />}></IconButton>
        </Link>
        <ButtonComponent onClick={handleClick}>채택된 답변보기</ButtonComponent>
      </div>
    );

    return (
      <>
        <Controller />
        <div className="w-full p-4 flex flex-col">
          {data.data.commentList.map((t) => (
            <div
              className={`${marginLeft[t.depth]} ${
                isScrolling &&
                t.commentId === selectedComment &&
                'bg-yellow-50 animate-pulse'
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
