import { WebSocketServer } from "ws";

const wss = new WebSocketServer({
  port: 8080,
  //   perMessageDeflate: {
  //     zlibDeflateOptions: {
  //       // See zlib defaults.
  //       chunkSize: 1024,
  //       memLevel: 7,
  //       level: 3,
  //     },
  //     zlibInflateOptions: {
  //       chunkSize: 10 * 1024,
  //     },
  //     // Other options settable:
  //     clientNoContextTakeover: true, // Defaults to negotiated value.
  //     serverNoContextTakeover: true, // Defaults to negotiated value.
  //     serverMaxWindowBits: 10, // Defaults to negotiated value.
  //     // Below options specified as default values.
  //     concurrencyLimit: 10, // Limits zlib concurrency for perf.
  //     threshold: 1024, // Size (in bytes) below which messages
  //     // should not be compressed if context takeover is disabled.
  //   },
});

// handle client connection

const rooms = new Map();

wss.on("connection", (ws, req) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    const data = JSON.parse(message.toString());

    if (data.type === "join-room") {
      const { roomId, userId } = data;
      if (!rooms.has(roomId)) {
        rooms.set(roomId, new Set());
      }

      rooms.get(roomId).add(ws);
      ws.roomId = roomId;
      ws.userId = userId;
      console.log(rooms);
    }

    if (["offer", "answer", "ice-candidate"].includes(data.type)) {
      const room = rooms.get(ws.roomId);

      room?.forEach((client) => {
        if (client !== ws && client.readyState === client.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    }
  });

  ws.on("close", () => {
    const room = rooms.get(ws.roomId);
    room?.delete(ws);
    console.log("Client disconneted");
  });
});

console.log("Signaling server is running on port 8080");
