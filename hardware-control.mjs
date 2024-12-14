import path from "path";
import fs from "node:fs";
import chokidar from "chokidar";

let hardwareSocket = null;

export function setHardwareSocket(socket) {
    hardwareSocket = socket;
    if(hardwareSocket == null){
      updateResponse("disconnect");
    }
}

export function getHardwareSocket() {
    return hardwareSocket;
}


const messageFilePath = path.join(process.cwd(), "data", "message.json");

export function updateResponse(response) {
  const message = JSON.parse(fs.readFileSync(messageFilePath, "utf8"));
  message.response = response;
  fs.writeFileSync(messageFilePath, JSON.stringify(message));
}



const watcher = chokidar.watch(messageFilePath, { persistent: true });

let previousData = fs.readFileSync(messageFilePath, "utf8");

watcher.on("change", async () => {
    if (hardwareSocket === null) {
        console.log("하드웨어 소켓이 없어서 동작을 수행할 수 없습니다.");
        return;
    }

    let newData;
    let retryCount = 0;
    const maxRetries = 5;

    while (retryCount < maxRetries) {
        try {
            newData = fs.readFileSync(messageFilePath, "utf8");
            if (newData.trim() === "") {
                throw new Error("File is empty");
            }

            const message = JSON.parse(newData);
            if (newData !== previousData) {
                if (message.request != "") {
                    hardwareSocket.send(message.request);
                    console.log("하드웨어로 전송:", message.request);
                    message.request = "";
                    fs.writeFileSync(messageFilePath, JSON.stringify(message));
                }
                previousData = newData;
            }
            break; // 성공적으로 처리되면 반복문 종료
        } catch (error) {
            retryCount++;
            console.log(
                `JSON 파싱 실패: ${error.message}. ${retryCount}/${maxRetries} 재시도 중...`
            );
            await new Promise((resolve) => setTimeout(resolve, 100)); // 100ms 대기 후 재시도
        }
    }

    if (retryCount === maxRetries) {
        console.error("최대 재시도 횟수 초과. JSON 파일 처리 실패.");
    }
});
