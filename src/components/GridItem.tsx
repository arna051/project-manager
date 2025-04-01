import { Appear } from "@/elements/Animations";
import { run } from "@/utils/electron";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";

type Props = {
    icon: string
    title: string
    command: string
}
export function GridItem({ command, icon, title }: Props) {
    return <Appear delay={2}>
        <Button
            sx={{ display: 'block' }}
            onClick={() => run(command)}
        >
            <Stack alignItems="center" justifyContent="center" gap={1}>
                <Box
                    component="img"
                    src={icon}
                    alt={title}
                    width={50}
                    height={50}
                />
                <Typography variant="caption">
                    {title}
                </Typography>
            </Stack>
        </Button>
    </Appear>
}