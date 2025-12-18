import fs from "node:fs";

export function validatePdfSignature(filePath) {
    const buffer = Buffer.alloc(5);
    const fd = fs.openSync(filePath, "r");
    fs.readSync(fd, buffer, 0, 5, 0);
    fs.closeSync(fd);

    return buffer.toString() === "%PDF-";
}
