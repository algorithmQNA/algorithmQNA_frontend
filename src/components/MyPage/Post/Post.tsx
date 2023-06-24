import React from 'react';
import MyPageTableRow from '../../TableRow/MyPageTableRow';
import Pagination from '../../Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getMyPosts } from '../../../apis/authApi';
import MessageBox from '../../MessageBox';

function Post() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 0;
  const myPosts = useQuery(['mypost_', page], () => getMyPosts(+page));
  const posts = myPosts.data?.data.data;

  if (!!posts?.posts.length)
    return (
      <div className="flex flex-col gap-2">
        {posts.posts.map((post, idx) => (
          <MyPageTableRow
            {...post}
            totalCommentCnt={post.commentCnt}
            key={`${post.postId}${idx}`}
          />
        ))}

        <Pagination listLength={posts.size} pageCount={posts.totalPageSize} />
      </div>
    );
  return <MessageBox msg={`🥹 아직 작성한 글이 없습니다!`} />;
}

export default Post;
