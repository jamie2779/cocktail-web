import path from "path";
import { promises as fs } from "fs";

interface hardwareData {
    request: string;
    response: string;
}

export async function GET() {
    try {
        const messageFilePath = path.join(
            process.cwd(),
            "data",
            "message.json"
        );

        // 메뉴와 디바이스 파일 읽기
        const messageData = await fs.readFile(messageFilePath, "utf8");

        // JSON 파싱
        const message: hardwareData = JSON.parse(messageData);

        const data = message.response;

        return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error processing message API:", error);
        return new Response(
            JSON.stringify({ error: "Failed to process message data" }),
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const messageFilePath = path.join(
            process.cwd(),
            "data",
            "message.json"
        );

        // 메뉴와 디바이스 파일 읽기
        const messageData = await fs.readFile(messageFilePath, "utf8");

        // JSON 파싱
        const message: hardwareData = JSON.parse(messageData);

        message.request = await req.text();
        await fs.writeFile(
            messageFilePath,
            JSON.stringify(message, null, 2),
            "utf8"
        );

        return new Response(JSON.stringify({ success: true, message }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error processing message API:", error);
        return new Response(
            JSON.stringify({ error: "Failed to process message data" }),
            { status: 500 }
        );
    }
}
