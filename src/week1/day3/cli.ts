import { isEitherUndefinedOrNull } from "../../utils/helper";
import { promises as fs } from 'node:fs';
import path from "node:path";
import { githubReport } from "./githubReport";
import { GithubReport } from "../../utils/types";

const username: string | undefined = process.argv[2];

async function initiateCli(): Promise<GithubReport> {
    if (isEitherUndefinedOrNull(username)) {
        process.exitCode = 1;
        throw new Error("Username is required for fetching data");
    }

    try {
        const response: GithubReport = await githubReport(username);

        const folderPath: string | undefined = await fs.mkdir('data/', { recursive: true });
        const outputFilePath = path.join(folderPath || 'data/', `${username}.json`);

        await fs.writeFile(outputFilePath, JSON.stringify(response, null, 2), 'utf-8');

        return response;
    } catch (error) {
        const message: string =
            error instanceof Error ? error.message : JSON.stringify(error);
        throw new Error(message);
    }
}

initiateCli().catch((error: unknown) => {
    const message: string =
        error instanceof Error ? error.message : JSON.stringify(error);
    console.log(message);
    process.exitCode = 1;
});
