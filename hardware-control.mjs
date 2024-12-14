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
    const newData = fs.readFileSync(messageFilePath, "utf8");
    if (newData !== previousData) {
        const message = JSON.parse(newData);
        if (message.request != "") {
            hardwareSocket.send(message.request);
            console.log("하드웨어로 전송:", message.request);
            message.request = "";
            fs.writeFileSync(messageFilePath, JSON.stringify(message));
        }

        previousData = newData;
    }
});
