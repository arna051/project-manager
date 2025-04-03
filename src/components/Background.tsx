"use client";
import { useSettings } from "@/hooks/useSettings";
import { Box } from "@mui/material";

export function Background() {
    const { background } = useSettings();
    if (background === 'OFF' || !background) return null;
    return <Box
        component="div"
        sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -2,
        }}
    >
        <Box
            component="video"
            src={background ? `/file${background}` : "/background.mp4"}
            autoPlay
            controls={false}
            muted
            loop
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
        />
        <Box
            component="div"
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%',
                bgcolor: 'background.default',
                opacity: .75
            }}
        />
    </Box>
}