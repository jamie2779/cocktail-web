import path from "path";
import { promises as fs } from "fs";

const filePath = path.resolve("./data/next.json"); // next.json 경로

// next.json을 읽는 함수
async function readNext() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to read next.json:", error);
    return {}; // next.json이 없거나 오류가 발생하면 빈 객체를 반환
  }
}

// next.json을 빈 객체로 초기화하는 함수
async function resetNext() {
  try {
    await fs.writeFile(filePath, JSON.stringify({}), "utf8");
  } catch (error) {
    console.error("Failed to reset next.json:", error);
    throw error; // 오류 발생 시 예외를 던짐
  }
}

// GET 요청 핸들러
export async function GET() {
  try {
    const next = await readNext();
    return new Response(JSON.stringify(next), {
      headers: { "Content-Type": "application/json" },
      status: 200, // 성공 상태 코드 명시
    });
  } catch (error) {
    console.error("Failed to handle GET request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to retrieve next data" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500, // 서버 에러 코드 반환
      }
    );
  }
}

// DELETE 요청 핸들러
export async function DELETE() {
  try {
    await resetNext(); // next.json을 빈 객체로 초기화
    return new Response(
      JSON.stringify({ message: "next.json has been reset" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200, // 성공 상태 코드 반환
      }
    );
  } catch (error) {
    console.error("Failed to handle DELETE request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to reset next.json" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500, // 서버 에러 코드 반환
      }
    );
  }
}
