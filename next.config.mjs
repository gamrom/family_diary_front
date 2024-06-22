/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "family-diary-real-bucket.s3.ap-northeast-2.amazonaws.com",
        // 필요한 경우 경로 패턴도 추가할 수 있습니다.
        // pathname: '/uploads/diary/image/*',
      },
    ],
  },
};

export default nextConfig;
