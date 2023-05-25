import {rest} from "msw";

export const postListHandler = [
    rest.get(
        '/post',
        async (req,res,ctx)=>{
            return res(
                ctx.status(201),
                ctx.json({})
            )
        }
    ),

];