import { isEitherUndefinedOrNull } from "../../utils/helper";
import * as fs from "fs";
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

        console.log("Final res", response);

        const outputFilePath = `data/${username}.json`;
        fs.appendFile(
            outputFilePath,
            JSON.stringify(response) + "\n",
            "utf8",
            (error) => {
                if (error) {
                    const message: string =
                        error instanceof Error
                            ? error.message
                            : JSON.stringify(error);
                    throw new Error(message);
                }
                console.log(`Data written to ${outputFilePath} as JSON.`);
            },
        );

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
