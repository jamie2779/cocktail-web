import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "device.json");
  const jsonData = await fs.readFile(filePath, "utf8");
  const devices = JSON.parse(jsonData);

  return new Response(JSON.stringify(devices), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  const filePath = path.join(process.cwd(), "data", "device.json");
  const updatedData = await req.json();

  await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), "utf8");

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
}
