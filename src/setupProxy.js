// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

// ('/oauth/login -> login이 엔드포인트');
module.exports = function (app) {
  app.use(
    createProxyMiddleware(['/oauth', '/api'], {
      target: 'https://algoqna.ddns.net',
      changeOrigin: true,
      logLevel: 'debug',

      onProxyRes: (proxyRes, req, res) => {
        if (proxyRes.headers['set-cookie']) {
          console.log(
            proxyRes.headers['set-cookie'],
            proxyRes.headers['set-cookie']
          );
          proxyRes.headers['set-cookie'][0] += ';SameSite=None;Secure';
        }
        proxyRes.headers['access-control-allow-credentials'] = true;
        proxyRes.headers['access-control-allow-origin'] =
          'https://localhost:3000';
      },
      cookieDomainRewrite: {
        '*': '',
      },
      onOpen: (t) => console.log(t),
    })
  );
};
