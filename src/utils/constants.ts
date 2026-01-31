import dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.GITHUB_TOKEN;

export const BASE_URL = "https://api.github.com/users";
export const HTTP_METHOD_GET = "get";
export const HTTP_GITHUB_HEADER = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${TOKEN}`,
    "X-GitHub-Api-Version": "2022-11-28",
};
