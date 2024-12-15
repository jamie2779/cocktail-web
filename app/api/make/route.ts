import path from "path";
import { promises as fs } from "fs";

interface DrinkItem {
    cocktail: string;
    name: string;
    abv: number;
    ingredients: Record<string, number | boolean | string>;
    imageSrc: string;
}

interface DeviceData {
    availableDrinks: string[];
}

const queuePath = path.join(process.cwd(), "data", "queue.json");
const devicePath = path.join(process.cwd(), "data", "device.json");
const nextPath = path.join(process.cwd(), "data", "next.json");

/**
 * 레시피를 숫자 코드로 인코딩합니다.
 */
function encode(recipe: DrinkItem, device: DeviceData): string {
    const code: number[] = [0];
    const sortedIngredients = Object.keys(recipe.ingredients)
        .filter(ingredient => ingredient !== "garnish" && ingredient !== "ice")
        .map(ingredient => ({
            index: device.availableDrinks.indexOf(ingredient),
            ingredient,
        }))
        .filter(item => item.index !== -1)
        .sort((a, b) => a.index - b.index);

    for (const { index, ingredient } of sortedIngredients) {
        code.push(index + 1);
        const amount = Number(recipe.ingredients[ingredient]) || 0;
        const sevenCount = Math.floor(amount / 30);
        for (let i = 0; i < sevenCount; i++) {
            code.push(7);
        }
    }
    code.push(0);
    return code.join('');
}

async function readQueue(): Promise<DrinkItem[]> {
    try {
        const data = await fs.readFile(queuePath, "utf8");
        return JSON.parse(data) as DrinkItem[];
    } catch {
        return [];
    }
}

async function readDevice(): Promise<DeviceData | null> {
    try {
        const data = await fs.readFile(devicePath, "utf8");
        return JSON.parse(data);
    } catch {
        return null;
    }
}

async function readNext(): Promise<DrinkItem | null> {
    try {
        const data = await fs.readFile(nextPath, "utf8");
        return JSON.parse(data) as DrinkItem;
    } catch {
        return null;
    }
}

async function writeNext(data: DrinkItem) {
    await fs.writeFile(nextPath, JSON.stringify(data, null, 2), "utf8");
}

async function writeQueue(queue: DrinkItem[]) {
    await fs.writeFile(queuePath, JSON.stringify(queue, null, 2), "utf8");
}

/**
 * 하드웨어로 이동 명령을 전송합니다.
 * @param moveNumber 이동 명령 숫자
 * @returns 성공 또는 실패 메시지
 */
async function sendMoveCommand(moveNumber: string) {
    try {
        // 서버의 URL을 가져옵니다.
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        
        // Step 1: 하드웨어 상태 확인
        const statusResponse = await fetch(new URL('/api/hardware', baseUrl).toString(), { method: "GET" });

        if (!statusResponse.ok) {
            throw new Error("Failed to check hardware status.");
        }

        const status = await statusResponse.json();

        if (status === "disconnect") {
            return { error: "하드웨어가 연결되지 않았습니다.", status: 400 };
        }

        if (status === "working") {
            return { error: "하드웨어가 이미 작동 중입니다.", status: 400 };
        }

        // Step 2: 이동 명령 전송
        const postResponse = await fetch(new URL('/api/hardware', baseUrl).toString(), {
            method: "POST",
            headers: { "Content-Type": "plain/text" },
            body: moveNumber,
        });

        if (!postResponse.ok) {
            throw new Error("Failed to send move command.");
        }

        return { success: true, message: "명령이 성공적으로 전송되었습니다." };
    } catch (error) {
        console.error("Error sending move command:", error);
        return { error: "명령 전송에 실패했습니다.", status: 500 };
    }
}


export async function GET() {
    const result = await make();
    if (result.error) {
        return new Response(JSON.stringify({ success: false, error: result.error }), {
            headers: { "Content-Type": "application/json" },
            status: 400,
        });
    }
    return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
    });
}

async function make() {
    try {
        const next = await readNext();
        if (next && Object.keys(next).length > 0) {
            return { error: "A recipe is already being made." };
        }

        const queue = await readQueue();
        if (queue.length === 0) {
            return { error: "The queue is empty. No recipe to make." };
        }

        const device = await readDevice();
        if (!device || !device.availableDrinks) {
            return { error: "Device information is not available." };
        }

        const [recipe] = queue;
        for (const ingredient of Object.keys(recipe.ingredients)) {
            if (ingredient === "garnish" || ingredient === "ice") continue;
            if (!device.availableDrinks.includes(ingredient)) {
                return { error: `Ingredient ${ingredient} is not available on the device.` };
            }
        }

        const encodedRecipe = encode(recipe, device);
        console.log("Encoded recipe:", encodedRecipe);

        const result = await sendMoveCommand(encodedRecipe);
        if (result.error) {
            return { error: result.error };
        }

        await writeNext(recipe);
        queue.shift();
        await writeQueue(queue);

        return { success: true, next: recipe, code: encodedRecipe };
    } catch (error) {
        console.error("Make function error:", error);
        return { error: "An error occurred while processing the make function." };
    }
}

export async function POST(req: Request) {
    const { item } = await req.json();
    const queue = await readQueue();
    queue.push(item as DrinkItem);
    await writeQueue(queue);

    return new Response(JSON.stringify({ success: true, queue }), {
        headers: { "Content-Type": "application/json" },
    });
}

export async function DELETE() {
    const queue = await readQueue();
    if (queue.length > 0) {
        queue.shift();
        await writeQueue(queue);
    }

    return new Response(JSON.stringify({ success: true, queue }), {
        headers: { "Content-Type": "application/json" },
    });
}
