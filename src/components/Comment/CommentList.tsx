import React from 'react';
import CommentView from './CommentView/CommentView';
import useGetParams from '../../hooks/useGetParams';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getPostRequest } from '../../apis/postApi';

import CommentWrapper from './CommentWrapper';

/** 대댓글의 최대 depth 3*/

function CommentList() {
  // const datas = completeFlatten as never as CommentViewProps[];
  const pid = useGetParams('pid');
  const page = useGetParams('page');
  const navigate = useNavigate();

  const { data: res } = useQuery({
    queryKey: ['post', pid],
    queryFn: () => {
      return getPostRequest(pid ? +pid : 2000);
    },
    onSuccess: (t) => {
      console.log('SUCCESS', t);
    },
    onError: (e) => {
      alert('존재하지 않는 게시글입니다.');
      navigate(-1);
    },
  });

  const commentList = res?.data.data.commentList;
  if (!!commentList?.length)
    return (
      <section>
        {commentList.map((data, idx) => (
          <CommentWrapper depth={data.depth} key={data.commentId}>
            <CommentView {...data} />
          </CommentWrapper>
        ))}
      </section>
    );
  return <p>댓글이 없습니다.</p>;
}

export default CommentList;
