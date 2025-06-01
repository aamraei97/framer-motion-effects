"use client";

import { useScroll } from "motion/react";
import { useRef } from "react";
import { MotionItem } from "./_components/motion-item";

export default function Page() {

    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })


    return (
        <div className="flex justify-center bg-gray-100 relative">
            <div className="w-full h-[400dvh] border flex px-12 gap-3 relative container justify-center" ref={containerRef}>
                <MotionItem index={0} y={scrollYProgress} />
                <MotionItem index={1} y={scrollYProgress} />
                <MotionItem index={2} y={scrollYProgress} />
                <MotionItem index={3} y={scrollYProgress} />
            </div>
        </div>
    );
}
