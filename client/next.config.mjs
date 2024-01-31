/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'randomuser.me','lh3.googleusercontent.com'],
    }
    // experimental: {
    //     reactRoot: true,
    //     suppressHydrationWarning: true,
    // }
};

export default nextConfig;
