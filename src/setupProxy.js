const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      secure: false,
      onProxyReq: function (proxyReq, req, res) {
        // Add a custom header to requests
        proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
      }
    })
  );
};