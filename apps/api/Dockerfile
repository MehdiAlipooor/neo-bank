FROM node:18

WORKDIR /app

COPY pacakge*.json/
RUN npm install
RUN npm install
COPY ..

EXPOSE 7000

CMD ["ts-node-dev --respawn --transpile-only","src/server.ts"]