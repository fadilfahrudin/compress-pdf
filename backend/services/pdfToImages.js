import { execAsync } from "../utils/exeGhostScript.js";
import fs from "node:fs";
import path from "node:path";

export async function pdfToImages(inputPath, outDir, dpi = 300) {
    fs.mkdirSync(outDir, { recursive: true });
    console.log("📌 XS Change to Img started");

    const gs = process.platform === "win32" ? "gswin64c" : "gs";
    const cmd = `${gs} -q -dNOPAUSE -dBATCH -dSAFER -sDEVICE=jpeg -r${dpi} -dJPEGQ=85 -sOutputFile="${path.join(outDir, "page-%03d.jpg")}" "${inputPath}";`

    await execAsync(cmd);
}