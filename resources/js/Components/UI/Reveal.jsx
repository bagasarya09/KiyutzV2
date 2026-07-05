import { motion } from 'framer-motion';

export default function Reveal({ children, delay = 0, y = 40 }) {
    const hidden = { opacity: 0, y };
    const visible = { opacity: 1, y: 0 };
    const viewport = { once: true, amount: 0.2 };
    const transition = { duration: 0.6, delay, ease: 'easeOut' };

    return (
        <motion.div
            initial={hidden}
            whileInView={visible}
            viewport={viewport}
            transition={transition}
        >
            {children}
        </motion.div>
    );
}