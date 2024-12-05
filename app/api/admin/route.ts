import path from "path";
import { promises as fs } from "fs";

const filePath = path.join(process.cwd(), "data", "device.json");

export async function GET() {
  try {
    const jsonData = await fs.readFile(filePath, "utf8");
    const devices = JSON.parse(jsonData);

    return new Response(JSON.stringify(devices), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return new Response(JSON.stringify({ error: "Failed to read data" }), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const updatedData = await req.json();

    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), "utf8");

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error writing JSON file:", error);
    return new Response(JSON.stringify({ error: "Failed to save data" }), {
      status: 500,
    });
  }
}
