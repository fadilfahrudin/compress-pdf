import { motion } from "framer-motion";

type Props = {
    readonly size?: number;
    readonly color?: string;
}
export default function Loading({ size = 10, color = "#fff" }: Props) {
    return (
        <div
            style={{
                display: "flex",
                gap: "6px",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    initial={{ y: 0 }}
                    animate={{ y: [-6, 6, -6] }}
                    transition={{
                        repeat: Infinity,
                        delay: i * 0.15, // efek ombak
                    }}
                    style={{
                        width: size,
                        height: size,
                        borderRadius: "50%",
                        background: color,
                        display: "inline-block",
                    }}
                ></motion.span>
            ))}
        </div>
    );
}
