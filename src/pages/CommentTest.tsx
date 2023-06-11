import React, { MouseEventHandler, useState } from 'react';
import CommentView from '../components/CommentView/Comment';
import { useQuery } from 'react-query';
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { getPostRequest } from '../apis/postApi';
import IconButton from '../components/Button/IconButton';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { BsArrowReturnRight } from 'react-icons/bs';
import ButtonComponent from '../components/Button/ButtonComponent';
import PageTitle from '../components/PageTitle/PageTitle';

function CommentTest() {
  //const [selectedComment, setSelectedComment] = useState(-1);
  //TODO: 페이지 바뀌면
  const { postId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isScrolling, setIsScrolling] = useState(false);
  const location = useLocation();
  const page = new URLSearchParams(location.search).get('page') || 1;
  const { data: res } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => {
      if (postId) return getPostRequest(+postId);
      return getPostRequest(2000);
    },
  });

  const data = res?.data;

  const marginLeft: { [key: string]: string } = {
    0: 'ml-0',
    1: 'ml-6',
    2: 'ml-12',
  };

  if (data?.commentList) {
    // TODO :: 브랜치 합치고 주석 풀어주기
    // const selectedComment =
    //   data.commentList.find((comment) => comment.isPinned)?.commentId || -1;
    const selectedComment = -1;
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
      <div className="grow-0 w-fit translate-x-[50vw] flex flex-row items-center sticky bottom-10 right-10 bg-box-bg border border-border rounded-md p-4 shadow-sm z-50">
        <Link to={`${location.pathname}?page=${+page - 1}`}>
          <IconButton Icon={<BiChevronLeft />}></IconButton>
        </Link>
        <div>
          {page}/{data.totalPageSize}
        </div>
        <Link to={`${location.pathname}?page=${+page + 1}`}>
          <IconButton Icon={<BiChevronRight />}></IconButton>
        </Link>
        <ButtonComponent onClick={handleClick}>채택된 답변보기</ButtonComponent>
      </div>
    );

    return (
      <>
        <PageTitle>댓글테스트</PageTitle>
        <div className="main-content">
          <Controller />
          {/*<CommentWrite />*/}
          <div className="w-full flex flex-col">
            {data.commentList.map((t) => (
              <div
                className={`${marginLeft[t.depth]} flex flex-row my-4 gap-2 ${
                  isScrolling &&
                  t.commentId === selectedComment &&
                  'bg-yellow-50 animate-pulse'
                }`}
                id={`${t.commentId}`}
                key={`${t.commentId}`}
                tabIndex={-1}
              >
                {!!t.depth && <BsArrowReturnRight className="text-gray-500" />}
                {/*<CommentView {...t} key={t.commentId} />*/}
              </div>
            ))}
          </div>
          <Controller />
        </div>
      </>
    );
  }
  return <div>잘못된 페이지입니다</div>;
}

export default CommentTest;
