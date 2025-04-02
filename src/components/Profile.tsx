import { Appear } from "@/elements/Animations";
import { Avatar, Container, Stack, Typography } from "@mui/material";

export function Profile() {
    return <Appear>
        <Container maxWidth="md" sx={{ mb: 4 }}>
            <Stack direction="row" gap={4} alignItems="center">
                <Avatar
                    src="/sharohil.jpg"
                    alt="sharohil"
                    sx={{
                        width: 110,
                        height: 110
                    }}
                />
                <Stack>
                    <Typography variant="h2">
                        Hi, <Typography component="span" variant="h2" color="primary.main">Sharohil</Typography>
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                        Ready to Work Today? Happy Hacking!
                    </Typography>
                </Stack>
            </Stack>
        </Container>
    </Appear>
}