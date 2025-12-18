import fs from "node:fs";
import path from "node:path";
import { compressPdfByType } from "../services/PDFCompressService.js";

export async function compressController(req, res) {
    if (!req.file) return res.status(400).send("File is required");

    const type = req.query.type || "md"; // xs | md | lg

    const outputPath = `compressed/${Date.now()}.pdf`;
    const inputPath = path.join(
        "temp_pdf",
        `${Date.now()}-${req.file.originalname}`
    );

    await fs.promises.copyFile(req.file.path, inputPath);

    try {
        await compressPdfByType(type, inputPath, outputPath);

        res.download(outputPath, "compressed.pdf");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Compression failed" });
    } finally {
        fs.promises.rm(inputPath, { force: true }).catch(() => { });
        fs.promises.rm(outputPath, { force: true }).catch(() => { });
        fs.promises.rm(req.file.path, { force: true }).catch(() => { });
    }
}