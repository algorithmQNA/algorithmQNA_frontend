import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getPostRequest } from '../../apis/postApi';
import IconButton from '../Button/IconButton';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import ButtonComponent from '../Button/ButtonComponent';

function Controller() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page') || 0;
  const get = useQuery('post-view', () => getPostRequest(+page));

  const handleGoToPinnedBtnClick = () => {};

  const MIN_PAGE = 0;
  const MAX_PAGE = get.data?.data.data.totalPageSize || 0;

  const prevPage = +page <= MIN_PAGE ? MIN_PAGE : +page - 1;
  const nextPage = +page >= MAX_PAGE ? MAX_PAGE : +page + 1;

  /** 다른 query string은 수정하지 않고 page query string만 수정*/
  const updatePageParameter = (page: number) => {
    setSearchParams((old) => {
      const newParams = new URLSearchParams(old);
      newParams.set('page', `${page}`);
      return newParams;
    });
  };

  const handlePrevBtnClick = () => {
    if (prevPage !== page) updatePageParameter(prevPage);
  };
  const handleNextBtnClick = () => {
    if (nextPage !== page) updatePageParameter(nextPage);
  };

  return (
    <div className="grow-0 m-4 w-fit float-right flex flex-row items-center sticky bottom-5 right-5 bg-box-bg border border-border rounded-full p-4 shadow-sm z-50">
      <IconButton Icon={<BiChevronLeft />} onClick={handlePrevBtnClick} />
      <div>
        {+page + 1} / {MAX_PAGE + 1}
      </div>
      <IconButton Icon={<BiChevronRight />} onClick={handleNextBtnClick} />
      <ButtonComponent onClick={handleGoToPinnedBtnClick}>
        채택된 답변보기
      </ButtonComponent>
    </div>
  );
}

export default Controller;