import http from "node:http";
import { URL } from "node:url";

const PORT = Number(process.env.PORT || 4000);

const state = {
  groq: false,
  kling: false,
  chatGpt: false,
  elevenlabs: false,
  veo: false,
  gemini: false,
  seedance: false,
};

function sendJson(res, payload, status = 200) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString();
}

function isValidService(service) {
  return [
    "groq",
    "kling",
    "chatGpt",
    "elevenlabs",
    "veo",
    "gemini",
    "seedance",
  ].includes(service);
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "", `http://${req.headers.host}`);
    const pathname = url.pathname;
    const parts = pathname.split("/").filter(Boolean);

    if (req.method === "GET" && parts[0] === "status" && parts[1] && isValidService(parts[1])) {
      return sendJson(res, { status: state[parts[1]] });
    }

    if (req.method === "POST" && parts[0] === "set" && parts[1] && isValidService(parts[1])) {
      const body = await readBody(req);
      const data = JSON.parse(body || "{}");
      state[parts[1]] = Boolean(data.key && String(data.key).trim().length > 0);
      return sendJson(res, { status: state[parts[1]] });
    }

    if (req.method === "POST" && pathname === "/askGemini") {
      const body = await readBody(req);
      const { prompt } = JSON.parse(body || "{}");
      const aiResponse = prompt
        ? `Mock Gemini answer for: ${prompt}`
        : "Mock Gemini response could not be generated.";
      return sendJson(res, {
        __kind__: "ok",
        ok: {
          aiResponse,
          followUpOptions: [
            "Generate a video prompt",
            "Refine the concept",
            "Start with a new prompt",
          ],
        },
      });
    }

    if (req.method === "GET" && pathname === "/") {
      return sendJson(res, { message: "Lensentic mock backend is running." });
    }

    sendJson(res, { error: "Not found" }, 404);
  } catch (error) {
    sendJson(res, { error: error instanceof Error ? error.message : "Server error" }, 500);
  }
});

server.listen(PORT, () => {
  console.log(`Mock backend listening on http://127.0.0.1:${PORT}`);
});
