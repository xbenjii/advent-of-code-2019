import { promisify } from 'util';
import request from 'request-promise-native';
import { stat, writeFile, readFile } from 'fs';
import { join } from 'path';

const { statAsync, writeFileAsync, readFileAsync } = {
    statAsync: promisify(stat),
    writeFileAsync: promisify(writeFile),
    readFileAsync: promisify(readFile)
};

const ADVENT_URL = 'https://adventofcode.com/2019/day/{day}/input';
const SESSION_CODE = process.env.AOC_SESSION_CODE || false;

if(!SESSION_CODE) {
    console.log(`Couldn't find AOC_SESSION_CODE env, you can retrieve this from your session=<code> cookie on adventofcode.com after logging in.`);
    process.exit(0);
}

const currentDay = (new Date()).getDate();
const days = Array.from({ length: currentDay }, (_, i) => i + 1);

async function saveInput(day: number, path: string) : Promise<any> {
    const input = await request({
        url: ADVENT_URL.replace('{day}', day.toString()),
        headers: {
            Cookie: `session=${SESSION_CODE}`
        }
    });
    await writeFileAsync(path, input.toString());
}

async function main() {
    for(const day of days) {
        const inputFile = join(__dirname, '../inputs/', `${day}.txt`);
        try {
            await statAsync(inputFile);
        } catch(e) {
            await saveInput(day, inputFile);
        }
        try {
            const runner = require(`./days/${day}`);
            const input = await readFileAsync(inputFile, 'utf8');
            runner.run(input);
        } catch(e) {
            if(e.code === 'MODULE_NOT_FOUND') {
                console.error(`Module not found for day ${day}`);
            } else {
                console.error(e);
            }
        }
    }
}

main().catch(console.error);