import { Box } from "@mui/material"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
}
export function Wrapper(props: Props) {
    return <Box
        component="main"
        sx={{
            width: '100%',
            p: 4,
            overflowX: 'hidden',
            my: 10
        }}
        {...props}
    />
}