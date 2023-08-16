import express from "express";
import multer from "multer";
import cors from "cors";
import { join, resolve } from "path";
import { readdir } from "fs/promises";

import { createServer } from "http";
import { storage } from "./multer-config";

const upload = multer({ storage });
const app = express();

app.use(
  cors({
    origin: "*",
  }),
);

const httpServer = createServer(app);

app.get("/files", async (req, res) => {
  const filesDir = resolve("src/uploads");
  const files: string[] = await readdir(filesDir);
  res.json({ error: null, files });
});

app.get("/file/:fileName", (req, res) => {
  const { fileName } = req.params;
  const filePath = join(__dirname, "../", "uploads", fileName);

  res.download(filePath, (err) => {
    if (err) return console.log(err);
    console.log("Arquivo baixado");
  });
});

app.post("/upload", upload.single("file"), (req, res) => {
  return res.json({ systemFileName: req.file?.filename });
});

export { httpServer, app };
