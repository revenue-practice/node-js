import { isEitherUndefinedOrNull } from "../../utils/helper";

const username: unknown = process.argv[2];

async function initiateCli() {
    if(isEitherUndefinedOrNull(username)) {
        console.log('Username is required for fetching data');
        process.exitCode = 1;   
    }

    if(typeof username !== 'string') {
        console.log('Username must be a valid string');
        process.exitCode = 1;
    }

    
}

initiateCli();
