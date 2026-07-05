import { useRef } from 'react';
import {
    motion, useScroll, useVelocity, useSpring,
    useTransform, useMotionValue, useAnimationFrame,
} from 'framer-motion';

function wrap(min, max, v) {
    const range = max - min;
    return ((((v - min) % range) + range) % range) + min;
}

export default function VelocityText({ children, baseVelocity = 4 }) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    const springConfig = { damping: 50, stiffness: 400 };
    const smoothVelocity = useSpring(scrollVelocity, springConfig);

    const transformConfig = { clamp: false };
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], transformConfig);

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
    const style = { x };

    const directionFactor = useRef(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
        if (velocityFactor.get() < 0) directionFactor.current = -1;
        else if (velocityFactor.get() > 0) directionFactor.current = 1;
        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="overflow-hidden whitespace-nowrap">
            <motion.div className="inline-block text-4xl font-bold text-accent" style={style}>
                {[0, 1, 2, 3].map((i) => (
                    <span key={i} className="mr-10">{children}</span>
                ))}
            </motion.div>
        </div>
    );
}