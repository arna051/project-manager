"use client"
import { alpha, Box } from "@mui/material";
import Image from "next/image";

export default function Loading() {
    return <Box
        sx={theme => ({
            backgroundColor: alpha(theme.palette.background.default, .6),
            backdropFilter: 'blur(6px)',
            position: 'fixed',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        })}
    >
        <Image
            src="/logo.png"
            alt="logo"
            loading="eager"
            width={200}
            height={200}
        />
    </Box>
}