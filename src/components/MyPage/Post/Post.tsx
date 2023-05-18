import React from 'react';
import MyPageTableRow from '../../TableRow/MyPageTableRow';
import Pagination from '../../Pagination/Pagination';

function Post() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <MyPageTableRow /> <MyPageTableRow /> <MyPageTableRow />{' '}
        <MyPageTableRow /> <MyPageTableRow /> <MyPageTableRow />{' '}
        <MyPageTableRow /> <MyPageTableRow />
      </div>
      <Pagination listLength={2} postLength={30} displayPages={5}></Pagination>
    </>
  );
}

export default Post;
