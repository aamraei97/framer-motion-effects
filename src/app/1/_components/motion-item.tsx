import { motion, MotionValue, useTransform, useMotionValueEvent } from "motion/react";
import { useMemo, useState } from "react";

export function MotionItem({ index, y, color }: { index: number, y: MotionValue<number>, color: string }) {
    const test = useTransform(y, [0, Math.abs(0.12 + (index * 0.25))], [`${115 + (index * 70)}%`, `${15 + (index * 2)}%`])
    const rotateValue = useMemo(() => index % 2 === 0 ? Math.random() * 5 : -1 * Math.random() * 5, [index])
    const [top, setTop] = useState("100%")
    useMotionValueEvent(test, "change", (latest) => {
        setTop(latest)
    })

    console.log({ test })
    return (
        <motion.div className="sticky h-[70dvh] flex-1 bg-white border border-gray-400"
            style={{ marginLeft: `-${index * 50}px`, rotate: `${rotateValue}deg` }}
            animate={{ top: top }}
            transition={{ top: { duration: 0.25 } }}
        />
    )
}