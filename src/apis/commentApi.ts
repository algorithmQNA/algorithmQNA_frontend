import { privateRequest } from './instance';
import type {
  CreateCommentResponse,
  UpdateCommentResponse,
  RecommendCommentResponse,
  AcceptCommentResponse,
  ReportCommentResponse,
} from '../types/apis/commentResponseType';

// 댓글 작성 API
export const createCommentRequest = (
  postId: number,
  content: string,
  parentCommentId?: number
) =>
  privateRequest.post<CreateCommentResponse>(`comment/${postId}`, {
    content,
    parentCommentId,
  });

// 댓글 수정 API
export const updateCommentRequest = (commentId: number, content: string) =>
  privateRequest.patch<UpdateCommentResponse>(`comment/${commentId}`, {
    content,
  });

//댓글 삭제 API
export const deleteCommentRequest = (commentId: number) =>
  privateRequest.delete(`comment/${commentId}`);

// 댓글 추천 API
export const recommendCommentRequest = (
  commentId: number,
  isLike: boolean,
  cancel: boolean = false
) =>
  privateRequest.post<RecommendCommentResponse>(`comment/${commentId}/like`, {
    isLike,
    cancel,
  });

// 좋아요상태 초기화 API
export const resetCommentRecommendStatusRequest = (commentId: number) =>
  recommendCommentRequest(commentId, false, true);

// 댓글 채택 API
export const acceptCommentRequest = (commentId: number) =>
  privateRequest.patch<AcceptCommentResponse>(`comment/pin/${commentId}`);

// 댓글 신고 API
export const reportCommentRequest = (
  commentId: number,
  category: number,
  detail: string
) =>
  privateRequest.post<ReportCommentResponse>(`comment/report/${commentId}`, {
    category,
    detail,
  });
