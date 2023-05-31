import { rest } from 'msw';
import { PostView } from '../../types/Post/Post';
export const postViewHandler = [];
// export const postViewHandler = [
//     rest.get(
//         '/post/:post_id',
//         async (req,res,ctx)=>{
//             const json:PostView = {
//                 "postId": 3,
//                 "postTitle": "게시물 제목",
//                 "postContent": "게시물 내용입니다",
//                 "createdAt": "2023-05-21T22:49:21.783535",
//                 "postLikeCnt": 0,
//                 "postDislikeCnt": 0,
//                 "isLiked": false,
//                 "totalCommentCnt": 5,
//                 "totalPageSize": 1,
//                 "member" : {
//                     "memberId": 47,
//                     "memberName": "장윤희",
//                     "memberRole": "ROLE_USER",
//                     "memberCommentBadge": 0,
//                     "memberPostBadge": 0,
//                     "memberLikeBadge": 0,
//                     "memberProfileUrl": "https://image3"
//                 },
//                 "commentList":[
//                     {
//                         "commentId": 6,
//                         "member": {
//                             "memberId": 47,
//                             "memberName": "장윤희",
//                             "memberRole": "ROLE_USER",
//                             "memberCommentBadge": 0,
//                             "memberPostBadge": 0,
//                             "memberLikeBadge": 0,
//                             "memberProfileUrl": "https://image3"
//                         },
//                         "content": "<p>감사합니다!</p>",
//                         "createdAt": "2023-05-15 12:18:31",
//                         "updatedAt": "2023-05-15 12:18:31",
//                         "likeCnt": 2,
//                         "dislikeCnt": 0,
//                         "depth" : 0,
//                         "hasChild" : true,
//                         "childCommentList":[
//                             {
//                                 "commentId": 6,
//                                 "memberId": 1,
//                                 "memberName": "김솔민",
//                                 "content": "<p>감사합니다!</p>",
//                                 "createdAt": "2023-05-15 12:18:31",
//                                 "updatedAt": "2023-05-15 12:18:31",
//                                 "likeCnt": 2,
//                                 "dislikeCnt": 0,
//                                 "depth" : 1,
//                                 "hasChild" : true
//                             },
//                         ],
//                         "childSize":3
//                     },
//                 ],
//                 "page": 3,
//                 "next": true,
//                 "prev": true,
//                 "size": 10
//             }
//             return res(
//                 ctx.status(201),
//                 ctx.json(json)
//             )
//         }
//     )
// ];
