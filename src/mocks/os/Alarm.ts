import {rest} from "msw";
import {AlarmType} from "../../types/Alarm";
const MOCK_BASED_URL = process.env.REACT_APP_API_BASE_URL;
export const alarmHandler = [
    rest.get(
        `/${MOCK_BASED_URL}/alarm`,
        async (req,res,ctx)=>{

            const json:AlarmType[] = [{
                    "alarmId": 2097,
                    "subjectMemberName": "testMember5",
                    "eventURL": "/post/4",
                    "checked": false,
                    "alarmType": "COMMENT_LIKE",
                    "commentId": 828,
                    "msg": "testMember5님이 당신의 댓글에 좋아요를 남겼습니다.",
                    "createdAt": "2023-05-26T17:11:17.506706"
            }]
            for(let i=0;i<9;i++){
                json.push({
                    "alarmId": json[json.length-1].alarmId+1,
                    "subjectMemberName": "testMember5",
                    "eventURL": "/post/4",
                    "checked": false,
                    "alarmType": "COMMENT_LIKE",
                    "commentId": 828,
                    "msg": "testMember5님이 당신의 댓글에 좋아요를 남겼습니다.",
                    "createdAt": "2023-05-26T17:11:17.506706"
                })
            }
            return res(
                ctx.status(201),
                ctx.json(json)
            )
        }
    )
];