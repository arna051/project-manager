"use client";
import { saveConfig } from "@/utils/electron";
import { alpha, Box, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";

export function Header() {
    return <Box
        component="header"
        className="header"
        sx={theme => ({
            backgroundColor: alpha(theme.palette.background.paper, .45),
            backdropFilter: 'blur(10px)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            px: 1,
            py: .2,
            zIndex: 999999
        })}
    >
        <Stack direction="row" alignItems="center" gap={.2}>
            <Image
                src="/logo.png"
                alt="logo"
                loading="eager"
                width={35}
                height={35}
            />

            <Typography variant="caption" fontWeight="bold">
                Hippogriff Project Manager
            </Typography>

            <Box sx={{ flex: '1 1 auto' }} />

            <IconButton className="noDrag" onClick={() => saveConfig("fullscreen", true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M18.5 7.5V2.522l-5.5.014m5.5-.014l-6 5.907m.5 10.092l5.5.002l-.013-5.5m.013 5.406l-6-5.907M2.5 7.5v-5H8m.5 5.929l-6-5.907M8 18.516l-5.5.007V13.5m6-1l-6 6" strokeWidth={1}></path></svg>
            </IconButton>
            <IconButton className="noDrag" onClick={() => window.close()}>
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="currentColor" d="M19.853 19.147L12.707 12l7.146-7.147a.5.5 0 0 0-.707-.707L12 11.293L4.853 4.147a.5.5 0 0 0-.707.707L11.293 12l-7.147 7.146a.5.5 0 1 0 .707.707L12 12.707l7.146 7.147a.5.5 0 0 0 .707 0a.5.5 0 0 0 0-.707"></path></svg>
            </IconButton>
        </Stack>
    </Box>
}