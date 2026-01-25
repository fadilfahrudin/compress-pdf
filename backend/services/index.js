import { ghostScriptCompress } from "./ghostScriptCompressService.js";
import { pdfToImgCompress } from "./pdfToImgCompress.js";

export async function compressPdfByType(type,inputPath,outputPath) {
    if (type === "xs") {
        return await pdfToImgCompress(inputPath,outputPath)
    }
    return ghostScriptCompress(inputPath, outputPath, type);
}