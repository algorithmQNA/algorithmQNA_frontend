import {rest} from "msw";
import {PostList, PostRow} from "../../types/Post/Post";

export const dashboardHandler = [
    rest.get(
        '/post',
        async (req,res,ctx)=>{
            const postData:PostRow = {
                "title": "게시물 제목",
                "memberId" : 433,
                "memberName": "작성자 이름",
                "memberProfileUrl": "/",
                "memberRole":"",
                "createdAt": "2022-04-21",
                "viewCount": 3,
                "commentCount": 24
            }
            let json:PostList = {
                "posts":[],
                "currentPage": 1,
                "totalPageCount": 10,
                "next": true,
                "prev": false,
                "size": 20
            }
            let i= 0
            while(i < 10){
                const copy = {...json}
                copy.posts = [...copy.posts,postData]
                json = copy
                i++
            }
            return res(
                ctx.status(200),
                ctx.json(json)
            )
        }
    ),

];