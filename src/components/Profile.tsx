"use client";

import { Appear } from "@/elements/Animations";
import { useSettings } from "@/hooks/useSettings";
import { Avatar, Container, Stack, Typography } from "@mui/material";

export function Profile() {
    const { name, welcome, image } = useSettings()
    return <Appear>
        <Container maxWidth="lg" sx={{ mb: 4 }}>
            <Stack direction="row" gap={4} alignItems="center">
                {
                    !!image && <Avatar
                        src={`/file${image}`}
                        alt="sharohil"
                        sx={{
                            width: 110,
                            height: 110
                        }}
                    />
                }
                <Stack>
                    <Typography variant="h2">
                        Hi, <Typography component="span" variant="h2" color="primary.main">{name || "Buddy"}</Typography>
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                        {welcome || "Ready to Work Today? Happy Hacking!"}
                    </Typography>
                </Stack>
            </Stack>
        </Container>
    </Appear>
}