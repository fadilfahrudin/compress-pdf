import multer from "multer";
import path from "node:path";
import fs from "node:fs";

const UPLOAD_DIR = "uploads";

// Pastikan folder ada
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (_, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const safeName = `${Date.now()}-${Math.random()
            .toString(36)
            .slice(2)}${ext}`;
        cb(null, safeName);
    },
});

const fileFilter = (req, file, cb) => {
    // 1️⃣ Ekstensi harus .pdf
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".pdf") {
        return cb(new Error("Only .pdf files are allowed"));
    }

    // 2️⃣ MIME type harus PDF
    const allowedMimeTypes = ["application/pdf"];

    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new Error("Invalid MIME type, only PDF is allowed"));
    }

    cb(null, true);
};

export const uploadPdf = multer({
    storage,
    fileFilter,
});
