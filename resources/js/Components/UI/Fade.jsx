import { motion } from 'framer-motion';

// Container: mengatur jeda antar elemen (stagger)
const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
};

// Item: efek fade tiap elemen
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
};

// Bungkus grup elemen
export function FadeGroup({ children, className = '' }) {
    const viewport = { once: true, amount: 0.2 };
    return (
        <motion.div
            className={className}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
        >
            {children}
        </motion.div>
    );
}

// Tandai tiap elemen yang mau di-fade
export function FadeItem({ children, className = '' }) {
    return (
        <motion.div className={className} variants={itemVariants}>
            {children}
        </motion.div>
    );
}