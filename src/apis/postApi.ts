import {
  GetCategoryPostsResponse,
  GetPostResponse,
} from '../types/apis/postResponseType';
import { SortOption } from '../types/post';
import { privateRequest } from './instance';
import {PostView} from "../types/Post/Post";




// 게시물 조회 API
export const getPostRequest = (postId: number) =>
  privateRequest.get<PostView>(`/post/${postId}`);

// 게시물 생성 API
export const createPostRequest = (
  title: string,
  content: string,
  categoryId: number,
  contentTypeId: number
) => privateRequest.post('/post', { title, content, categoryId, contentTypeId });

// 게시물 수정 API
export const updatePostRequest = (
  postId: number,
  title?: string,
  content?: string,
  categoryId?: number,
  contentTypeId?: number
) =>
  privateRequest.patch(`post/${postId}`, {
    title,
    content,
    categoryId,
    contentTypeId,
  });

// 게시물 삭제 API
export const deletePostRequest = (postId: string) => privateRequest.delete(`post/${postId}`)

// 카테고리별 게시물 조회 API
export const getCategoryPostsRequest = (
  categoryId: string,
  sort: SortOption,
  page: number
) =>
  privateRequest.get<GetCategoryPostsResponse>('post', {
    params: {
      category: categoryId,
      sort,
      page,
    },
  });

// 게시물 추천 API
export const recommendPostRequest = (postId: string) =>
  privateRequest.post(`post/${postId}/like`);

// 게시물 신고 API
export const reportPostRequest = (postId: string) =>
  privateRequest.post(`post/${postId}/report`);

//게시물 이미지 업로드 API
export const imagePostRequest = (form:FormData)=>
    privateRequest.post<{status:{code:number,message:string},data:{image_url:string}}>('/image',form)