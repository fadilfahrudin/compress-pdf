
import pdfPoppler from "pdf-poppler";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { PDFDocument } from "pdf-lib";


export async function pdfToImgCompress(inputPath, outputPath, quality = 60, scale = 0.5) {
    console.log("📌 XS Compression started");
    const TEMP_ROOT = path.join(process.cwd(), "temp_pdf");
    const tempDir = path.join(TEMP_ROOT, Date.now().toString());
    fs.mkdirSync(tempDir, { recursive: true });

    // PDF → Image
    await pdfPoppler.convert(inputPath, {
        format: "jpeg",
        out_dir: tempDir,
        out_prefix: "page",
        scale: 1024,
    });

    const images = fs
        .readdirSync(tempDir)
        .filter((f) => /^page-\d+\.jpg$/.test(f))
        .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));

    const pdfDoc = await PDFDocument.create();

    for (const img of images) {
        const imgPath = path.join(tempDir, img);

        const imgBuffer = fs.readFileSync(imgPath);

        const compressed = await sharp(imgBuffer)
            .resize({ width: Math.floor(2000 * scale) })
            .jpeg({ quality })
            .toBuffer();


        const jpg = await pdfDoc.embedJpg(compressed);
        const { width, height } = jpg.size();

        const page = pdfDoc.addPage([width, height]);
        page.drawImage(jpg, { x: 0, y: 0, width, height });
    }

    fs.writeFileSync(outputPath, await pdfDoc.save());

    // cleanup temp folder
    fs.rmSync(tempDir, { recursive: true, force: true });

    console.log("✅ XS Compression done");
}