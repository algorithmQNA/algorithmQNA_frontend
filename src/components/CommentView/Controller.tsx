import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import IconButton from '../Button/IconButton';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { useQuery } from 'react-query';
import ButtonComponent from '../Button/ButtonComponent';
import { getPostRequest } from '../../apis/postApi';

function Controller() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') || 0;
  const get = useQuery('post-view', () => getPostRequest(+page));

  const handleGoToPinnedBtnClick = () => {};

  const MIN_PAGE = 0;
  const MAX_PAGE = get.data?.data.data.totalPageSize || 0;

  const prevPage = +page <= MIN_PAGE ? MIN_PAGE : +page - 1;
  const nextPage = +page >= MAX_PAGE ? MAX_PAGE : +page + 1;

  return (
    <div className="grow-0 m-4 w-fit float-right flex flex-row items-center sticky bottom-5 right-5 bg-box-bg border border-border rounded-full p-4 shadow-sm z-50">
      <Link to={`${location.pathname}?page=${prevPage}`}>
        <IconButton Icon={<BiChevronLeft />}></IconButton>
      </Link>
      <div>
        {+page + 1} / {MAX_PAGE + 1}
      </div>
      <Link to={`${location.pathname}?page=${nextPage}`}>
        <IconButton Icon={<BiChevronRight />}></IconButton>
      </Link>
      <ButtonComponent onClick={handleGoToPinnedBtnClick}>
        채택된 답변보기
      </ButtonComponent>
    </div>
  );
}

export default Controller;
