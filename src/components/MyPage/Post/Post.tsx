import React from 'react';
import MyPageTableRow from '../../TableRow/MyPageTableRow';
import Pagination from '../../Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getMyPosts } from '../../../apis/authApi';

function Post() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 0;
  const myPosts = useQuery(['mypost_', page], () => getMyPosts(+page));
  const posts = myPosts.data?.data.data;

  if (!!posts?.posts.length)
    return (
      <div className="flex flex-col gap-2">
        {posts.posts.map((post, idx) => (
          <MyPageTableRow {...post} key={`${post.postId}${idx}`} />
        ))}

        <Pagination listLength={posts.size} pageCount={posts.totalPageSize} />
      </div>
    );
  return <div>작성한 글이 없습니다.</div>;
}

export default Post;
