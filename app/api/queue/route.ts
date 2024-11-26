import path from "path";
import { promises as fs } from "fs";

const filePath = path.resolve("./data/queue.json");

async function readQueue() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeQueue(queue: object[]) {
  await fs.writeFile(filePath, JSON.stringify(queue, null, 2), "utf8");
}

export async function GET() {
  const queue = await readQueue();
  return new Response(JSON.stringify(queue), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  const { item } = await req.json();
  const queue = await readQueue();
  queue.push(item);
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
