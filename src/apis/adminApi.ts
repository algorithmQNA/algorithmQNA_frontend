import { privateRequest } from './instance';
import type {
  GetReportedCommentDetailResponse,
  GetReportedCommentListResponse,
  GetReportedPostDetailResponse,
  GetReportedPostListResponse,
} from '../types/apis/adminResponseType';

//신고된 게시물 리스트 목록 조회 API
export const getReportedPostListRequest = (page: number) =>
  privateRequest.get<GetReportedPostListResponse>('admin/post', {
    params: { page },
  });

// 신고된 댓글 리스트 목록 조회 API
export const getReportedCommentListRequest = (page: number) =>
  privateRequest.get<GetReportedCommentListResponse>('admin/comment', {
    params: { page_number: page },
  });

//신고된 게시물 상세내용 조회 API
export const getReportedPostDetailRequest = (postId: number) =>
  privateRequest.get<GetReportedPostDetailResponse>(
    `admin/post/report/${postId}`
  );

//신고된 댓글 상세내용 조회 API
export const getReportedCommentDetailRequest = (commentId: number) =>
  privateRequest.get<GetReportedCommentDetailResponse>(
    `admin/report/comment/${commentId}`
  );

//게시물 신고요청 취소 API
export const rejectReportePostRequest = (reportedPostId: number) =>
  privateRequest.delete(`admin/post/report/${reportedPostId}`);

// 댓글 신고요청 삭제 API
export const rejectReportedCommentRequest = (reportedCommentId: number) =>
  privateRequest.delete(`admin/comment/report/${reportedCommentId}`);

//신고된 게시글 삭제 API
export const deleteReportedPostRequest = (reportedPostId: number) =>
  privateRequest.delete(`admin/post/${reportedPostId}`);

//신고된 댓글 삭제 API
export const deleteReportedCommentRequest = (reportedCommentId: number) =>
  privateRequest.delete(`admin/comment/${reportedCommentId}`);
