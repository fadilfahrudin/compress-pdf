import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { PDFDocument } from "pdf-lib";
import { pdfToImages } from "./pdfToImages.js";

export async function pdfToImgCompress(
    inputPath,
    outputPath
) {
    const quality = 50;
    const scale = 1;
    const TEMP_ROOT = path.join(process.cwd(), "temp_pdf");
    const tempDir = path.join(TEMP_ROOT, Date.now().toString());

    console.log("📌 XS Compression started");
    fs.mkdirSync(tempDir, { recursive: true });

    // 1️⃣ PDF → IMG (Ghostscript)
    await pdfToImages(inputPath, tempDir, 300);

    // 2️⃣ Read images
    const images = fs
        .readdirSync(tempDir)
        .filter((f) => /^page-\d+\.jpg$/.test(f))
        .sort(
            (a, b) =>
                Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0])
        );

    if (!images.length) {
        throw new Error("No images generated from PDF");
    }

    // 3️⃣ IMG → PDF
    const pdfDoc = await PDFDocument.create();

    console.log("📌 Merge Image to PDF File")

    for (const img of images) {
        const imgPath = path.join(tempDir, img);
        const imgBuffer = fs.readFileSync(imgPath);

        const compressed = await sharp(imgBuffer)
            .resize({ width: Math.floor(2500 * scale) })
            .jpeg({ quality })
            .toBuffer();

        const jpg = await pdfDoc.embedJpg(compressed);
        const { width, height } = jpg.size();

        const page = pdfDoc.addPage([width, height]);
        page.drawImage(jpg, { x: 0, y: 0, width, height });
    }

    // 4️⃣ SAVE PDF
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, await pdfDoc.save());

    // 5️⃣ CLEANUP
    fs.rmSync(tempDir, { recursive: true, force: true });

    console.log("✅ XS Compression done");
}
