async function preprocess(input: string) {
    return input.split(/\n/).filter(Boolean).map(Number);
}

async function stage1(data: number[]) {
    return data.reduce((a, n) => {
        a += (Math.floor(n / 3) - 2);
        return a;
    }, 0);
}

export async function run(input: string) {
    const data = await preprocess(input);
    console.log(await stage1(data));
}