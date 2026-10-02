import express from "express";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";

const app = express();
const port = Number(process.env.PORT || 3001);
const root = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(root));
app.get("/", (_request, response) => {
  response.sendFile(path.join(root, "pages", "browser-minimum.html"));
});

const server = createServer(app);
server.on("upgrade", (request, socket, head) => {
  if (request.url?.endsWith("/wisp/")) {
    wisp.routeRequest(request, socket, head);
  } else {
    socket.end();
  }
});

server.listen(port, () => {
  console.log(`Cherri Safari is serving at http://localhost:${port}/`);
  console.log(`Local Wisp endpoint: ws://localhost:${port}/wisp/`);
});