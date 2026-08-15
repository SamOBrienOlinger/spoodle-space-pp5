const fs = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");

const port = process.env.PORT || 3000;
const buildDirectory = path.join(__dirname, "build");
const apiTarget = new URL(
  process.env.API_TARGET || "https://spoodlespace.herokuapp.com"
);

const contentTypes = {
  ".css": "text/css; charset=UTF-8",
  ".html": "text/html; charset=UTF-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=UTF-8",
  ".json": "application/json; charset=UTF-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const proxyApiRequest = (request, response) => {
  const targetPath = request.url.replace(/^\/api/, "") || "/";
  const headers = { ...request.headers, host: apiTarget.host };

  const proxyRequest = https.request(
    {
      protocol: apiTarget.protocol,
      hostname: apiTarget.hostname,
      port: apiTarget.port || 443,
      method: request.method,
      path: targetPath,
      headers,
    },
    (proxyResponse) => {
      const responseHeaders = { ...proxyResponse.headers };

      if (responseHeaders["set-cookie"]) {
        responseHeaders["set-cookie"] = responseHeaders["set-cookie"].map(
          (cookie) => cookie.replace(/;\s*Domain=[^;]+/i, "")
        );
      }

      response.writeHead(proxyResponse.statusCode, responseHeaders);
      proxyResponse.pipe(response);
    }
  );

  proxyRequest.on("error", (error) => {
    console.error("API proxy error", error.message);
    if (!response.headersSent) {
      response.writeHead(502, { "Content-Type": "application/json" });
    }
    response.end(JSON.stringify({ detail: "API temporarily unavailable." }));
  });

  request.pipe(proxyRequest);
};

const serveFrontend = (request, response) => {
  const requestPath = decodeURIComponent(request.url.split("?")[0]);
  const relativePath = requestPath === "/" ? "index.html" : requestPath.slice(1);
  const candidatePath = path.resolve(buildDirectory, relativePath);
  const safeCandidate = candidatePath.startsWith(buildDirectory)
    ? candidatePath
    : path.join(buildDirectory, "index.html");

  fs.stat(safeCandidate, (statError, stats) => {
    const filePath = !statError && stats.isFile()
      ? safeCandidate
      : path.join(buildDirectory, "index.html");

    fs.readFile(filePath, (readError, contents) => {
      if (readError) {
        response.writeHead(500, { "Content-Type": "text/plain; charset=UTF-8" });
        response.end("Unable to load SpoodleSpace.");
        return;
      }

      response.writeHead(200, {
        "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream",
      });
      response.end(contents);
    });
  });
};

http
  .createServer((request, response) => {
    if (request.url === "/api" || request.url.startsWith("/api/")) {
      proxyApiRequest(request, response);
      return;
    }

    serveFrontend(request, response);
  })
  .listen(port, () => {
    console.log(`SpoodleSpace frontend listening on port ${port}`);
  });
