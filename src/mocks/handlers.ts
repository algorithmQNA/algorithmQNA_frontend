import { rest } from 'msw';

/**example. rest.[METHOD]  */
const handlers = [
    rest.get(
        process.env.REACT_APP_API_BASE_URL + '/basic',
        async (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    message: 'success',
                })
            );
            // ...
        }
    ),
    rest.get(
        '/login',
        async (req,res,ctx)=>{
            return res(
                ctx.status(200),
                ctx.json({
                    id:1,
                    name:'홍길동',
                    profile:'http://memberExImage',
                    access_token:'wqepikwqeoieqwoiu'
                })
            )
        }
    ),
    rest.get(
        '/oauth2/token/renew',
        async (req,res,ctx)=>{
            return res(
                ctx.status(200),
                ctx.json({
                    access_token:'wqepikwqeoieqwoiu'
                })
            )
        }
    )
];

export default handlers;
