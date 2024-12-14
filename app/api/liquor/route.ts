import path from "path";
import { promises as fs } from "fs";

const filePath = path.resolve("./data/liquor.json"); // liquor.json 경로

// liquor.json을 읽는 함수
async function readLiquor() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to read liquor.json:", error);
    return {}; // liquor.json이 없거나 오류가 발생하면 빈 객체를 반환
  }
}

// GET 요청 핸들러
export async function GET() {
  try {
    const liquor = await readLiquor();
    return new Response(JSON.stringify(liquor), {
      headers: { "Content-Type": "application/json" },
      status: 200, // 성공 상태 코드 명시
    });
  } catch (error) {
    console.error("Failed to handle GET request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to retrieve liquor data" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500, // 서버 에러 코드 반환
      }
    );
  }
}