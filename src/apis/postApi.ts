import {
  GetCategoryPostsResponse,
  GetPostResponse,
} from '../types/apis/postResponseType';
import { PostCategoryKey, PostTypeKey, SortOption } from '../types/post';
import { privateRequest } from './instance';
import {
    PostCategory,
    PostListParams, PostSort,
    PostType,
    PostView, ReportCategory,
} from '../types/Post/Post';

// 게시물 조회 API
export const getPostRequest = (postId: number) =>
  privateRequest.get<PostView>(`/post/${postId}`);

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
    title: '찐막테스트',
    content: '마지막테스트입니다.',
    postCategory: 'DP',
    postType: 'QNA',
    keyWords: ['abc'],
    imageIds,
  });

// 게시물 수정 API
export const updatePostRequest = (
  postId: number,
  title: string,
  content: string,
  categoryId: PostCategory | '',
  contentTypeId: PostType | '',
  keyWords: string[],
  imageIds: number[]
) =>
  privateRequest.patch(`post/${postId}`, {
    title,
    content,
    categoryId,
    contentTypeId,
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
  hasCommentCond?:boolean,
  keyWordCond?:string,
  titleCond?:string,
  memberNameCond?:string,
  isAcceptedCommentCond?:boolean
) =>
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
    },
  });

// 게시물 추천 API
export const recommendPostRequest = (postId: number,{isLike,cancel}:{isLike:boolean,cancel:boolean}) =>
  privateRequest.post(`post/${postId}/like`,{isLike,cancel});

// 게시물 신고 API
export const reportPostRequest = (postId: string,{category,detail}:{category:ReportCategory,detail:string}) =>
  privateRequest.post(`post/${postId}/report`,{category,detail});

//게시물 이미지 업로드 API
export const imagePostRequest = (form: FormData) =>
  privateRequest.post<{
    status: { code: number; message: string };
    data: { image_url: string };
  }>('/image', form);


//대시보드