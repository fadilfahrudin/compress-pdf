import express from "express";
import cors from "cors";
import { compressController } from "./controllers/compressControler.js";
import { uploadPdf } from "./middlewares/multer.js";

const app = express();
const port = 3000;

app.use(cors());

// =====================
// ROUTES
app.post("/compress", uploadPdf.single("file"), compressController);
app.get("/", (_, res) => {
    res.send("🚀 Compress PDF API running");
});

// =====================
// SERVER
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
