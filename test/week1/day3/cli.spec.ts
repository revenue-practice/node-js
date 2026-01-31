import { spawnSync } from "child_process";
import { expect, test, vi, afterEach } from "vitest";
import {
    fetchJson,
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
    wrongUrl,
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
    vi.useRealTimers(); // Restore real timers
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
    expect(emptyUsernameResponse.stderr).toContain(
        "usage: pnpm tsx src/week1/day3/cli.ts <username>",
    );
});

test("Error in network request", async () => {
    const mockedResponse = {
        ok: false,
        status: 404,
    };
    const mockedFetch = vi.fn().mockResolvedValue(mockedResponse);
    vi.stubGlobal("fetch", mockedFetch);

    await expect(fetchJson(wrongUrl)).rejects.toThrow(
        `http ${mockedResponse.status}`,
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
    vi.useFakeTimers();
    const fixedTime = new Date("2026-01-31T19:18:38.962Z");
    vi.setSystemTime(fixedTime);

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

    const githubReportResponse = await githubReport(mockUsername);
    const alterGeneratedAt = {
        ...mockGithubReportResponse,
        generatedAt: fixedTime.toISOString(),
    };
    expect(githubReportResponse).toEqual(alterGeneratedAt);
});
