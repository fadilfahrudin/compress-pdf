import { exec } from "child_process";
export const execAsync = (cmd) =>
    new Promise((resolve, reject) => {
        exec(cmd, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });