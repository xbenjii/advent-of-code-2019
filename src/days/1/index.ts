function preprocess(input: string) {
    return input.split(/\n/).filter(Boolean).map(Number);
}

function calculateFuel(n: number) {
    return Math.floor(n / 3) - 2;
}

function calculateFuelRecursive(n: number, total: number = 0): number {
    const f = calculateFuel(n);
    if(f > 0) {
        return calculateFuelRecursive(f, total + f);
    }
    return total;
}

function stage1(data: number[]) {
    return data.reduce((a, n) => {
        a += calculateFuel(n);
        return a;
    }, 0);
}

function stage2(data: number[]) {
    return data.reduce((a, n) => {
        a += calculateFuelRecursive(n);
        return a;
    }, 0);
}

export async function run(input: string) {
    const data = preprocess(input);
    console.log(stage1(data));
    console.log(stage2(data));
}