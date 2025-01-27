/** @type {import('next').NextConfig} */
export default {
    experimental: {
      serverActions: true,
    },
    api: {
      bodyParser: false,
      externalResolver: true,
      timeout: 600,  // Global timeout setting
    },
  };
  