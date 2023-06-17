import {
  GetCategoryPostsResponse,
  GetPostResponse,
  GetHightlightCommentListResponse,
} from '../types/apis/postResponseType';

import { privateRequest } from './instance';
import { PostCategory, PostSort, PostType } from '../types/Post/Post';
import { ReportType } from '../types/report';

// 게시물 조회 API
export const getPostRequest = (postId: number) =>
  privateRequest.get<GetPostResponse>(`/post/${postId}`);

// 게시물 생성 API
// TODO:: 테스트를 위해서 다 정해진 값으로 보내놓게 해둠. 사용할 때 원상복구
export const createPostRequest = ({
  title = `테스트 ${Date.now().toLocaleString()}`,
  content = `테스트 내용입니다`,
  category,
  keyWords,
  contentType,
  imageIds,
}: {
  title?: string;
  content?: string;
  category?: string;
  contentType?: string;
  keyWords: string[];
  imageIds: number[];
}) =>
  privateRequest.post('post', {
    title: title || '가짜 타이틀입니다',
    content: content || '내용 좀 넣어주세요',
    postType: contentType,
    sort: 'LATESTASC',
    postCategory: category,
    keyWords: keyWords.length ? keyWords : [],
    imageIds: imageIds.length ? imageIds : [],
  });

// 게시물 수정 API
export const updatePostRequest = (
  postId: number,
  title: string,
  content: string,
  postCategory: PostCategory | '',
  postType: PostType | '',
  keyWords: string[],
  imageIds: number[]
) =>
  privateRequest.patch(`post/${postId}`, {
    title,
    content,
      postCategory,
      postType,
    keyWords,
    imageIds,
  });

// 게시물 삭제 API
export const deletePostRequest = (postId: string) =>
  privateRequest.delete(`post/${postId}`);

// 카테고리별 게시물 조회 API
export const getCategoryPostsRequest = (
  postCategory: PostCategory,
  sort: PostSort,
  page: number,
  postType: PostType,
  hasCommentCond?: boolean,
  keyWordCond?: string,
  titleCond?: string,
  memberNameCond?: string,
  isAcceptedCommentCond?: boolean
) =>
  //TODO: 서버재배포후 categoryName, type 키 원상복구해두기
  privateRequest.get<GetCategoryPostsResponse>('post', {
    params: {
      postCategory,
      sort,
      page,
      postType,
      hasCommentCond,
      keyWordCond,
      titleCond,
      memberNameCond,
      isAcceptedCommentCond
    }
  });

// 게시물 추천 API
export const recommendPostRequest = (
  postId: number,
  body: { isLike: boolean; cancel: boolean }
) => privateRequest.post(`post/${postId}/like`, body);

// 게시물 신고 API
export const reportPostRequest = (
  postId: string,
  body: { category: ReportType; detail: string }
) => privateRequest.post(`post/${postId}/report`, body);

//게시물 이미지 업로드 API
export const imagePostRequest = (form: FormData) =>
  privateRequest.post<{
    status: { code: number; message: string };
    data: { image_url: string };
  }>('/image', form);

//하이라이팅 API
export const getHightlightCommentListRequest = (
  postId: number,
  commentId: number
) =>
  privateRequest.get<GetHightlightCommentListResponse>(
    `post/${postId}/highlight/${commentId}`
  );
