'use client';
import { createTheme } from '@mui/material/styles';
import { Anta } from 'next/font/google';

const anta = Anta({
    weight: ['400'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    colorSchemes: { dark: true },
    cssVariables: {
        colorSchemeSelector: 'class',
    },
    typography: {
        fontFamily: anta.style.fontFamily,
    },
    components: {
        MuiAlert: {
            styleOverrides: {
                root: {
                    variants: [
                        {
                            props: { severity: 'info' },
                            style: {
                                backgroundColor: '#60a5fa',
                            },
                        },
                    ],
                },
            },
        },
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#ffc107',
            light: '#ffcc36',
            dark: '#b18603',
            contrastText: '#000000',
        },
        secondary: {
            main: '#f43f5e',
            light: '#f7647e',
            dark: '#aa293f',
            contrastText: '#ffffff',
        },
        background: {
            default: '#18170d',
            paper: '#1d1e0b',
        },
    }
});


export default theme;