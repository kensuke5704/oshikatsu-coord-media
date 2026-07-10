import type { NextConfig } from "next";
import path from "node:path";

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === "true" && repositoryName !== "";
const basePath = configuredBasePath || (isGithubPagesBuild ? `/${repositoryName}` : "");

const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: path.resolve(__dirname),
  trailingSlash: true,
  basePath,
  assetPrefix: basePath === "" ? undefined : basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
