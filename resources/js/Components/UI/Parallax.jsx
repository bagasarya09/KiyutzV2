import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Parallax({ children, distance = 120 }) {
    const ref = useRef(null);
    const scrollConfig = { target: ref, offset: ['start end', 'end start'] };
    const { scrollYProgress } = useScroll(scrollConfig);

    // saat elemen discroll, geser vertikal → efek parallax/overlap
    const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
    const style = { y };

    return (
        <div ref={ref}>
            <motion.div style={style}>{children}</motion.div>
        </div>
    );
}