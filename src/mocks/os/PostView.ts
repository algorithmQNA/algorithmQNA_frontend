import {rest} from "msw";
import {PostDetail} from "../../types/Post/Post";

export const postViewHandler = [
    rest.get(
        '/post/:post_id',
        async (req,res,ctx)=>{
            const json:PostDetail = {
                "postId": 1,
                "memberId": 43,
                "memberName": "최진아",
                "memberCommentBadge": 3,
                "memberPostBadge": 3,
                "memberLikeBadge": 3,
                "title": "게시물 제목",
                "content": "게시물 내용입니다.",
                "createdSt": "2020-02-02",
                "likeCount": 5,
                "dislikeCount": 2,
                "commentTotalCount": 2,
                "commentCurrentPage": 1,
                "commentTotalPageCount": 10,
                "commentNext": true,
                "commentPrev": false,
                "commentSize": 20,
                "comments":[
                    {
                        "commentId": 2,
                        "parentId": 1,
                        "memberId": 21,
                        "memberName": "김지민",
                        "memberProfile": "/",
                        "memberCommentBadge": 1,
                        "memberPostBadge": 4,
                        "memberLikeBadge": 0,
                        "content": "댓글 내용2",
                        "likeCount": 5,
                        "dislikeCount": 2,
                        "createdAt": "2023-03-03",
                        "depth": 1,
                        "isPinned": false,
                        "isLiked": true,
                    }
                ]
            }
            return res(
                ctx.status(200),
                ctx.json(json)
            )
        }
    )
];