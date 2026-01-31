import { spawnSync } from "child_process";
import { expect, test, vi, afterEach } from "vitest";
import {
    fetchUserProfile,
    fetchUserRepos,
    githubReport,
} from "../../../src/week1/day3/githubReport";
import {
    mockUsername,
    mockRawUserProfileResponse,
    mockUserProfileResponse,
    mockRawFetchUserReposResponse,
    mockFetchUserReposResponse,
    mockGithubReportResponse,
} from "./mock-data";
import {
    HTTP_GITHUB_HEADER,
    HTTP_METHOD_GET,
    BASE_URL,
} from "../../../src/utils/constants";

afterEach(() => {
    vi.clearAllMocks(); // Clears call history
    vi.resetAllMocks(); // Resets both call history and implementation
    vi.unstubAllGlobals(); // remove global stubs like fetch
    vi.restoreAllMocks(); // Restores original implementation if mocked
});

test("Validate input in cli", () => {
    const emptyUsernameResponse = spawnSync(
        "pnpm",
        ["tsx", "src/week1/day3/cli.ts"],
        {
            encoding: "utf-8",
        },
    );
    expect(emptyUsernameResponse.status).toStrictEqual(1);
    expect(emptyUsernameResponse.stdout).toContain(
        "Username is required for fetching data",
    );
});

test("Fetch user profile", async () => {
    const mockedResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockRawUserProfileResponse.data),
    };
    const mockedFetch = vi.fn().mockResolvedValue(mockedResponse);
    vi.stubGlobal("fetch", mockedFetch);

    const fetchUserProfileResponse = await fetchUserProfile(mockUsername);
    expect(fetchUserProfileResponse).toEqual(mockUserProfileResponse);
    expect(mockedFetch).toHaveBeenCalledTimes(1);
    expect(mockedFetch).toHaveBeenCalledWith(`${BASE_URL}/${mockUsername}`, {
        method: `${HTTP_METHOD_GET}`,
        headers: HTTP_GITHUB_HEADER,
    });
});

test("Fetch user repository", async () => {
    const mockedResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockRawFetchUserReposResponse.data),
    };
    const mockedFetch = vi.fn().mockResolvedValue(mockedResponse);
    vi.stubGlobal("fetch", mockedFetch);

    const fetchUserReposResponse = await fetchUserRepos(mockUsername);
    expect(fetchUserReposResponse).toEqual(mockFetchUserReposResponse);
    expect(mockedFetch).toHaveBeenCalledTimes(1);
    expect(mockedFetch).toHaveBeenCalledWith(
        `${BASE_URL}/${mockUsername}/repos?per_page=100`,
        {
            method: `${HTTP_METHOD_GET}`,
            headers: HTTP_GITHUB_HEADER,
        },
    );
});

test("Github Report", async () => {
    vi.stubGlobal(
        "fetch",
        vi
            .fn()
            .mockResolvedValueOnce({
                ok: true,
                json: vi
                    .fn()
                    .mockResolvedValue(mockRawUserProfileResponse.data),
            })
            .mockResolvedValueOnce({
                ok: true,
                json: vi
                    .fn()
                    .mockResolvedValue(mockRawFetchUserReposResponse.data),
            }),
    );

    const alterGeneratedAt = {
        ...mockGithubReportResponse,
        generatedAt: new Date().toISOString(),
    };
    const githubReportResponse = await githubReport(mockUsername);
    expect(githubReportResponse).toEqual(alterGeneratedAt);
});
