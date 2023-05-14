import {rest} from "msw";

export const postWriteHandler = [
    rest.post(
        '/post',
        async (req,res,ctx)=>{
            return res(
                ctx.status(201),
                ctx.json({})
            )
        }
    )
];