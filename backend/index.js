import express from "express";
import multer from "multer";
import cors from "cors";
import { compressController } from "./controllers/compressControler.js";

const app = express();
const port = 3000;

app.use(cors());

// =====================
// MULTER
const upload = multer({ dest: "uploads/" });

// =====================
// ROUTES
app.post("/compress", upload.single("file"), compressController);
app.get("/", (_, res) => {
    res.send("🚀 Compress PDF API running");
});

// =====================
// SERVER
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
