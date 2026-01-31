import { spawnSync } from "child_process";
import axios from "axios";
import { expect, test, vi, afterEach, MockedFunction } from "vitest";
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
    AXIOS_GITHUB_HEADER,
    AXIOS_METHOD_GET,
    BASE_URL,
} from "../../../src/utils/constants";

vi.mock("axios", () => ({
    default: vi.fn(),
}));

const mockedAxios = axios as unknown as MockedFunction<typeof axios>;

afterEach(() => {
    vi.clearAllMocks(); // Clears call history
    vi.resetAllMocks(); // Resets both call history and implementation
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
    mockedAxios.mockResolvedValue(mockRawUserProfileResponse);

    const fetchUserProfileResponse = await fetchUserProfile(mockUsername);
    expect(fetchUserProfileResponse).toEqual(mockUserProfileResponse);
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    expect(mockedAxios).toHaveBeenCalledWith({
        method: `${AXIOS_METHOD_GET}`,
        url: `${BASE_URL}/${mockUsername}`,
        headers: AXIOS_GITHUB_HEADER,
    });
});

test("Fetch user repository", async () => {
    mockedAxios.mockResolvedValue(mockRawFetchUserReposResponse);

    const fetchUserReposResponse = await fetchUserRepos(mockUsername);
    expect(fetchUserReposResponse).toEqual(mockFetchUserReposResponse);
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    expect(mockedAxios).toHaveBeenCalledWith({
        method: `${AXIOS_METHOD_GET}`,
        url: `${BASE_URL}/${mockUsername}/repos?per_page=100`,
        headers: AXIOS_GITHUB_HEADER,
    });
});

test("Github Report", async () => {
    mockedAxios
        .mockResolvedValueOnce(mockRawUserProfileResponse)
        .mockResolvedValueOnce(mockRawFetchUserReposResponse);

    const githubReportResponse = await githubReport(mockUsername);
    const alterGeneratedAt = {
        ...mockGithubReportResponse,
        generatedAt: new Date().toISOString(),
    };
    expect(githubReportResponse).toEqual(alterGeneratedAt);
});
