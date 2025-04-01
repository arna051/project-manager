"use client";
import { Box } from "@mui/material";

export function Background() {
    return <Box
        component="div"
        sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -2,
            opacity: .5,
        }}
    >
        <Box
            component="video"
            src="/background.mp4"
            autoPlay
            controls={false}
            loop
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
        />
    </Box>
}