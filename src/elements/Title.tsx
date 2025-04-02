"use client";

import { Box, IconButton, Stack, Typography } from "@mui/material"
import { ReactNode, useRef } from "react"
import { Appear } from "./Animations"

type Props = {
    icon: ReactNode
    title: string
    subtitle: string
    onConfig?: VoidFunction
}

const colors = [
    "primary",
    "secondary",
    "info",
    "success",
    "error"
]
export function Title({ onConfig, subtitle, title, icon }: Props) {

    const ref = useRef<HTMLDivElement>(null)

    return <Stack
        direction="row"
        alignItems="center"
        gap={2}
    >
        <Appear>
            {icon}
        </Appear>

        <Appear delay={1}>
            <Stack>
                <Typography
                    variant="h5"
                >
                    {title}
                </Typography>
                <Typography
                    variant="caption"
                    color="text.secondary"
                >
                    {subtitle}
                </Typography>
            </Stack>
        </Appear>
        <Box sx={{ flex: '1 1 auto', }} />
        {
            onConfig ? <Appear delay={5}>
                <IconButton onClick={onConfig}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M11.5 9.5h4l-6 9v-6.997l-4-.003l6-9z" strokeWidth={1}></path></svg>
                </IconButton>
            </Appear> :
                <Box
                    sx={{ width: 40 }}
                />
        }
    </Stack>
}