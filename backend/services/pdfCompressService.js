import { ghostScriptCompress } from "./ghostScriptCompressService.js";
import { pdfToImgCompress } from "./pdfToImgCompressService.js";

export async function compressPdfByType(type,inputPath,outputPath) {
    if (type === "xs") {
        return pdfToImgCompress(inputPath, outputPath);
    }
    return ghostScriptCompress(inputPath, outputPath, type);
}