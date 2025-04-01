import { alpha, Box, useTheme } from "@mui/material";
import * as motion from "motion/react-client";

import { AnimatePresence, MotionConfig } from "motion/react"
import Image from "next/image";
import { bringUp } from "@/utils/electron";

export function Assistant() {
    const theme = useTheme();
    return <Box
        component="div"
        className="header"
        sx={{
            width: 90,
            height: 90
        }}
    >
        <MotionConfig transition={{ duration: 5, repeat: Infinity, repeatType: 'mirror' }}>
            <AnimatePresence>
                <Box
                    component={motion.div}
                    sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        m: 'auto',
                    }}
                    initial={{
                        backgroundColor: theme.palette.primary.main,
                        boxShadow: `0 0 5px ${theme.palette.primary.main}, 0 0 10px ${theme.palette.primary.light}, 0 0 20px ${alpha(theme.palette.primary.main, .6)}`
                    }}
                    animate={{
                        backgroundColor: theme.palette.error.main,
                        boxShadow: `0 0 10px ${theme.palette.error.main}, 0 0 15px ${theme.palette.error.light}, 0 0 35px ${alpha(theme.palette.error.main, .8)}`
                    }}
                >
                    <Box
                        component={motion.div}
                        onClick={bringUp}
                        className="noDrag"
                        sx={{
                            width: 45,
                            height: 45,
                            borderRadius: '50%',
                            position: 'absolute',
                            bgcolor: 'background.paper',
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0,
                            m: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        initial={{
                            boxShadow: `inset 0 0 5px ${theme.palette.primary.main}, inset 0 0 10px ${theme.palette.primary.light}, inset 0 0 20px ${alpha(theme.palette.primary.main, .6)}`
                        }}
                        animate={{
                            boxShadow: `inset 0 0 10px ${theme.palette.error.main}, inset 0 0 15px ${theme.palette.error.light}, inset 0 0 30px ${alpha(theme.palette.error.main, .8)}`
                        }}
                    >
                        <Image
                            src="/logo.png"
                            alt="logo"
                            loading="eager"
                            width={35}
                            height={35}
                        />
                    </Box>
                </Box>
            </AnimatePresence>
        </MotionConfig>
    </Box>
}