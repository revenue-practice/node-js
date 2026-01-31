import {
    HTTP_GITHUB_HEADER,
    HTTP_METHOD_GET,
    BASE_URL,
} from "../../utils/constants";
import { GithubReport, GitHubRepository } from "../../utils/types";

export async function fetchUserProfile(user: string) {
    try {
        const response = await fetch(`${BASE_URL}/${user}`, {
            method: `${HTTP_METHOD_GET}`,
            headers: HTTP_GITHUB_HEADER,
        });

        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        return {
            username: user,
            profile: data,
        };
    } catch (error) {
        const message: string =
            error instanceof Error ? error.message : JSON.stringify(error);
        throw new Error(message);
    }
}

export async function fetchUserRepos(user: string) {
    try {
        const response = await fetch(`${BASE_URL}/${user}/repos?per_page=100`, {
            method: `${HTTP_METHOD_GET}`,
            headers: HTTP_GITHUB_HEADER,
        });
        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const filterForkedRepos = data.filter(
            (repo: GitHubRepository) => repo.fork === false,
        );

        const sortResponseByStars = filterForkedRepos.sort(
            (
                a: { stargazers_count: number },
                b: { stargazers_count: number },
            ) => b.stargazers_count - a.stargazers_count,
        );

        const topReposByStars = [];
        for (
            let index = 0;
            index < Math.min(sortResponseByStars.length, 5);
            index += 1
        ) {
            const current = sortResponseByStars[index];

            topReposByStars.push({
                name: current.name,
                stargazers_count: current.stargazers_count,
                html_url: current.html_url,
            });
        }

        return {
            repoCount: filterForkedRepos.length,
            topReposByStars: topReposByStars,
        };
    } catch (error) {
        const message: string =
            error instanceof Error ? error.message : JSON.stringify(error);
        throw new Error(message);
    }
}

export async function githubReport(username: string): Promise<GithubReport> {
    try {
        const response = await Promise.all([
            fetchUserProfile(username as string),
            fetchUserRepos(username as string),
        ]);

        const fileContent: GithubReport = {
            generatedAt: new Date().toISOString(),
            username: response[0].username!,
            profile: response[0].profile,
            repoCount: response[1].repoCount,
            topReposByStars: response[1].topReposByStars!,
        };

        return fileContent;
    } catch (error) {
        const message: string =
            error instanceof Error ? error.message : JSON.stringify(error);
        throw new Error(message);
    }
}
