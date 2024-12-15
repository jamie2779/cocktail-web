# Step 1: 빌드 단계
FROM node:18-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# Next.js 애플리케이션 빌드
RUN npm run build

# Step 2: 실행 단계
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 복사
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# 빌드된 파일 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/server.mjs ./server.mjs
COPY --from=builder /app/hardware-control.mjs ./hardware-control.mjs
COPY --from=builder /app/data ./data

# 포트 설정
EXPOSE 80

# Next.js 애플리케이션 실행
CMD ["npm", "run", "start"]
