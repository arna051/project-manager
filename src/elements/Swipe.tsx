"use client";

import { Box } from "@mui/material";
import { ReactNode, useRef } from "react";

type Props = {
    children: ReactNode[]
    height?: number
}
export function Swipe({ children, height = 100 }: Props) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const onMouseDown = (e: any) => {
        if (!scrollRef.current) return;
        isDown.current = true;
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft.current = scrollRef.current.scrollLeft;
        scrollRef.current.style.cursor = "grabbing";
    };

    const onMouseLeave = () => {
        if (!scrollRef.current) return;
        isDown.current = false;
        scrollRef.current.style.cursor = "grab";
    };

    const onMouseUp = () => {
        if (!scrollRef.current) return;
        isDown.current = false;
        scrollRef.current.style.cursor = "grab";
    };

    const onMouseMove = (e: any) => {
        if (!scrollRef.current) return;
        if (!isDown.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5;
        scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };

    return (
        <Box
            ref={scrollRef}
            sx={{
                overflowX: "auto",
                overflowY: "hidden",
                height,
                display: "flex",
                gap: 0,
                py: 2,
                px: 1,
                cursor: "grab",
                userSelect: "none",
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE 10+
                "&::-webkit-scrollbar": {
                    display: "none", // Chrome, Safari
                },
            }}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
        >
            {children.map((view, i) => (
                <Box
                    component="span"
                    key={i}
                    sx={{
                        flexShrink: 0,
                        minWidth: 100,
                        height: 40,
                        fontSize: "0.9rem",
                        scrollSnapAlign: "start",
                        p: 1
                    }}
                    children={view}
                />
            ))}
        </Box>
    );
}
