import * as motion from "motion/react-client";

import { AnimatePresence, MotionConfig, type MotionStyle, type Variants } from "motion/react"
import { ReactNode } from "react";

type Props = {
    children: ReactNode
    style?: MotionStyle
    delay?: number
}
const ScrollVariants: Variants = {
    offscreen: {
        opacity: 0,
        scale: .8
    },
    onscreen: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
}

export function Appear({ children, style = {}, delay = 0 }: Props) {

    return (
        <MotionConfig transition={{ duration: 1, delay }}>
            <AnimatePresence>
                <motion.div
                    style={style}
                    initial="offscreen"
                    whileInView="onscreen"
                    variants={ScrollVariants}
                    viewport={{ amount: .1, }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </MotionConfig>
    )
}