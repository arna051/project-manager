"use client";
import { saveConfig } from "@/utils/electron";
import { alpha, AppBar, Box, Button, Container, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";


export function Header() {

    return <>
        <Box
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
        <Container
            sx={{
                mt: 6,
                position: 'fixed',
                left: 0,
                right: 0,
                top: 0,
            }}
            maxWidth="lg"
        >
            <AppBar
                position="relative"
                sx={theme => ({
                    backgroundColor: `${alpha(theme.palette.background.default, .4)} !important`,
                    backdropFilter: 'blur(6px)',
                    borderRadius: 3
                })}
            >
                <Stack direction="row" alignItems="center" gap={2}>
                    <MenuButton
                        label="Home"
                        link="/"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m1.5 10.5l9-9l9 9m-16 1v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" strokeWidth={1}></path></svg>
                        }
                    />
                    <MenuButton
                        label="Projects"
                        link="/projects"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m2.5 10.5l8 4l8.017-4M2.5 14.5l8 4l8.017-4M2.5 6.657l8.008 3.843l8.009-3.843L10.508 2.5z" strokeWidth={1}></path></svg>
                        }
                    />
                    <MenuButton
                        label="Servers"
                        link="/servers"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21"><g fill="none" fillRule="evenodd"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M2.5 14.5v-2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2" strokeWidth={1}></path><path fill="currentColor" d="M6.5 13.5a1 1 0 1 0-2 0a1 1 0 0 0 2 0"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m2.5 8.494l.01-2a2 2 0 0 1 2-1.994H16.5a2 2 0 0 1 1.994 1.85l.006.156l-.01 2a2 2 0 0 1-2 1.994H4.5a2 2 0 0 1-1.995-1.85z" strokeWidth={1}></path><path fill="currentColor" d="M6.5 7.5a1 1 0 1 0-2 0a1 1 0 0 0 2 0"></path></g></svg>
                        }
                    />
                    <MenuButton
                        label="Todo"
                        link="/todo"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21"><g fill="none" fillRule="evenodd"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M4.5 2.5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2m-2 4h16" strokeWidth={1}></path><g fill="currentColor" transform="translate(2 2)"><circle cx={8.5} cy={8.5} r={1}></circle><circle cx={4.5} cy={8.5} r={1}></circle><circle cx={4.5} cy={12.5} r={1}></circle></g></g></svg>
                        }
                    />
                    <MenuButton
                        label="Notes"
                        link="/notes"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}><path d="M6.5 4.5h7l3 3v7a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2"></path><path d="M8.5 12.5h4a1 1 0 0 1 1 1v3h-6v-3a1 1 0 0 1 1-1m-1-5h2v2h-2z"></path></g></svg>
                        }
                    />
                    <MenuButton
                        label="Settings"
                        link="/settings"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 3)" strokeWidth={1}><path strokeWidth={0.933} d="M7.5.5q.527 0 1.034.076l.508 1.539c.445.127.868.308 1.26.536l1.46-.704c.517.397.977.865 1.365 1.389l-.73 1.447q.333.596.514 1.27l1.53.533a7 7 0 0 1-.017 1.948l-1.539.508a5.6 5.6 0 0 1-.536 1.26l.704 1.46a7 7 0 0 1-1.389 1.365l-1.447-.73a5.5 5.5 0 0 1-1.27.514l-.533 1.53a7 7 0 0 1-1.948-.017l-.508-1.539a5.6 5.6 0 0 1-1.26-.536l-1.46.704a7 7 0 0 1-1.365-1.389l.73-1.447a5.6 5.6 0 0 1-.514-1.27l-1.53-.534a7 7 0 0 1 .017-1.947l1.539-.508c.127-.445.308-.868.536-1.26l-.704-1.46a7 7 0 0 1 1.389-1.365l1.447.73a5.5 5.5 0 0 1 1.27-.514l.534-1.53Q7.036.5 7.5.5"></path><circle cx={7.5} cy={7.5} r={3}></circle></g></svg>}
                    />
                </Stack>
            </AppBar>
        </Container>
    </>
}


type Props = {
    label: string
    link: string
    icon: ReactNode
}
function MenuButton({ icon, label, link }: Props) {
    const pathname = usePathname();

    const isActive = pathname === "/" ? link === pathname : new RegExp(`^${pathname}`).test(link);

    return <Button
        variant={isActive ? "contained" : "text"}
        startIcon={icon}
        color="inherit"
        LinkComponent={Link}
        href={link}
        aria-label={label}
        sx={{ borderRadius: 0 }}
    >
        {label}
    </Button>
}