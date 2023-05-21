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
  privateRequest.get<GetReportedPostDetailResponse>(`admin/post/${postId}`);

//신고된 댓글 상세내용 조회 API
export const getReportedCommentDetailRequest = (
  commentId: number,
  page: number
) =>
  privateRequest.get<GetReportedCommentDetailResponse>(
    `admin/report/comment/${commentId}?page=${page}`
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

/**API 스펙 없음 임시 스펙 */

//공지사항 조회 API
export const getNotificationList = (props: { type: string; page: number }) => {
  return privateRequest.get<{
    list: { id: number; title: string; date: string }[];
  }>(`admin/notification`, {
    params: props,
  });
};
//공지사항 삭제 API
export const deleteNotification = (notificationId: number) => {
  console.log(notificationId);
  return privateRequest.delete(`admin/notification/${notificationId}`);
};

// const a = new Array(20).fill(0).map((t,idx)=>({id:2000+idx, title:`공지사항${idx}입니다.`, date:''})
