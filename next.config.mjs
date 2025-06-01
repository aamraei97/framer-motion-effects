/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
	output: "export",
	basePath: isProd ? "/framer-motion-effects" : "",
	assetPrefix: isProd ? "/framer-motion-effects/" : "",
	images: {
		remotePatterns: [
			{
				hostname: "picsum.photos",
			},
		],
	},
};

export default nextConfig;
