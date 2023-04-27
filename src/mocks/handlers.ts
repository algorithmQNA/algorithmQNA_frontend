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
];

export default handlers;
