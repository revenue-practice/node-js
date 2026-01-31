import { isEitherUndefinedOrNull } from "../../utils/helper";
import { promises as fs } from "node:fs";
import path from "node:path";
import { githubReport } from "./githubReport";
import { GithubReport } from "../../utils/types";

const username: string | undefined = process.argv[2];

function mapErrorMessage(msg: string): string {
    if (msg === "http 404") return "user not found";
    if (msg.startsWith("http ")) return `request failed: ${msg}`;
    return msg;
}

async function initiateCli(): Promise<void> {
    if (isEitherUndefinedOrNull(username)) {
        console.error("usage: pnpm tsx src/week1/day3/cli.ts <username>");
        process.exitCode = 1;

        return;
    }

    try {
        const response: GithubReport = await githubReport(username);

        await fs.mkdir("data/day3", { recursive: true });
        const outputFilePath = path.join("data/day3", `${username}.json`);

        await fs.writeFile(
            outputFilePath,
            JSON.stringify(response, null, 2),
            "utf-8",
        );
    } catch (error) {
        const message: string =
            error instanceof Error ? error.message : String(error);
        console.error(mapErrorMessage(message));
    }
}

void initiateCli();
