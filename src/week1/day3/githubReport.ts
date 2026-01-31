import {
    HTTP_GITHUB_HEADER,
    HTTP_METHOD_GET,
    BASE_URL,
} from "../../utils/constants";
import {
    GithubProfile,
    GithubReport,
    GitHubRepository,
} from "../../utils/types";

export async function fetchJson(url: string): Promise<unknown> {
    const response = await fetch(url, {
        method: `${HTTP_METHOD_GET}`,
        headers: HTTP_GITHUB_HEADER,
    });

    if (!response.ok) throw new Error(`http ${response.status}`);
    return await response.json();
}

export async function fetchUserProfile(user: string) {
    const response: unknown = await fetchJson(`${BASE_URL}/${user}`);
    return {
        username: user,
        profile: response as GithubProfile,
    };
}

export async function fetchUserRepos(user: string) {
    const response: unknown = await fetchJson(
        `${BASE_URL}/${user}/repos?per_page=100`,
    );
    const filterForkedRepos = (response as GitHubRepository[]).filter(
        (repo: GitHubRepository) => repo.fork === false,
    );

    const sortResponseByStars: GitHubRepository[] = filterForkedRepos.sort(
        (a: { stargazers_count: number }, b: { stargazers_count: number }) =>
            b.stargazers_count - a.stargazers_count,
    );

    const topReposByStars = [];
    for (
        let index = 0;
        index < Math.min(sortResponseByStars.length, 5);
        index += 1
    ) {
        const current: GitHubRepository = sortResponseByStars[
            index
        ] as GitHubRepository;

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
}

export async function githubReport(username: string): Promise<GithubReport> {
    try {
        const response = await Promise.all([
            fetchUserProfile(username),
            fetchUserRepos(username),
        ]);

        const fileContent: GithubReport = {
            generatedAt: new Date().toISOString(),
            username: response[0].username,
            profile: response[0].profile,
            repoCount: response[1].repoCount,
            topReposByStars: response[1].topReposByStars,
        };

        return fileContent;
    } catch (error) {
        const message: string =
            error instanceof Error ? error.message : JSON.stringify(error);
        process.exitCode = 1;
        throw new Error(message);
    }
}
