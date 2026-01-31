import { isEitherUndefinedOrNull } from "../../utils/helper";
import * as fs from "fs";
import { githubReport } from "./githubReport";
import { GithubReport } from "../../utils/types";

const username: unknown = process.argv[2];
const outputFilePath = `data/${username}.json`;

async function initiateCli(): Promise<GithubReport> {
    if (isEitherUndefinedOrNull(username)) {
        throw new Error("Username is required for fetching data");
    }

    if (typeof username !== "string") {
        throw new Error("Username must be a valid string");
    }

    try {
        const response: GithubReport = await githubReport(username);

        fs.appendFile(
            outputFilePath,
            JSON.stringify(response) + "\n",
            "utf8",
            (err) => {
                if (err) {
                    console.log(err);
                    return;
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

initiateCli();
