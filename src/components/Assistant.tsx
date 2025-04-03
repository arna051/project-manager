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
        <Box
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
                backgroundColor: theme.palette.primary.main,
                boxShadow: `0 0 5px ${theme.palette.primary.main}, 0 0 10px ${theme.palette.primary.light}, 0 0 15px ${alpha(theme.palette.primary.main, .8)}, 0 0 20px ${alpha(theme.palette.primary.main, .6)}`
            }}
        >
            <Box
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
                    justifyContent: 'center',
                    boxShadow: `inset 0 0 5px ${theme.palette.primary.main}, inset 0 0 7.5px ${theme.palette.primary.main}, inset 0 0 10px ${theme.palette.primary.light}, inset 0 0 15px ${alpha(theme.palette.primary.main, .75)}, inset 0 0 20px ${alpha(theme.palette.primary.main, .6)}`

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
    </Box>
}