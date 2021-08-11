const securityHeaders = [
  {
    // Allow DNS Prefetch resolution of Links, assets (JS, CSS, etc)
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    // Protect agaings cross-site scripting (XSS) attacks
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    // Avoid to insert the website as a iframe in other websites
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
];

module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
