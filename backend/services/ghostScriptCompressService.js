import { execAsync } from "../utils/exeGhostScript.js";

export async function ghostScriptCompress(inputPath, outputPath, quality) {
    const gs = process.platform === "win32" ? "gswin64c" : "gs";
    const preset = quality === "md" ? "ebook" : "printer";

    const cmd = `${gs} -q -dNOPAUSE -dBATCH -dSAFER \
    -sDEVICE=pdfwrite \
    -dCompatibilityLevel=1.4 \
    -dPDFSETTINGS=/${preset} \
    -dDetectDuplicateImages=true \
    -dCompressFonts=true \
    -dAutoRotatePages=/None \
    -sOutputFile="${outputPath}" "${inputPath}"`;

    console.log("🧠 GS command:", preset);
    await execAsync(cmd);
}