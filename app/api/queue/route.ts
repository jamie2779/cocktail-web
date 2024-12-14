import path from "path";
import { promises as fs } from "fs";

const filePath = path.resolve("./data/queue.json");

// queue.json 읽기
async function readQueue() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// queue.json 쓰기
async function writeQueue(queue: object[]) {
  await fs.writeFile(filePath, JSON.stringify(queue, null, 2), "utf8");
}

// GET 요청 핸들러
export async function GET() {
  const queue = await readQueue();
  return new Response(JSON.stringify(queue), {
    headers: { "Content-Type": "application/json" },
  });
}

// POST 요청 핸들러
export async function POST(req: Request) {
  try {
    const { item } = await req.json();
    const queue = await readQueue();
    queue.push(item);
    await writeQueue(queue);

    return new Response(JSON.stringify({ success: true, queue }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to process POST request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update queue" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}

// DELETE 요청 핸들러
export async function DELETE() {
  try {
    await writeQueue([]); // queue.json을 빈 배열로 초기화
    return new Response(
      JSON.stringify({ success: true, message: "Queue has been reset" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200, // 성공 상태 코드 반환
      }
    );
  } catch (error) {
    console.error("Failed to process DELETE request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to reset queue" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500, // 서버 에러 코드 반환
      }
    );
  }
}
