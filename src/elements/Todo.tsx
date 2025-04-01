import { useBoolean } from "@/hooks/useBoolean";
import { alpha, Box, Button, Card, CardActions, CardContent, CardMedia, Container, Dialog, DialogActions, DialogContent, Rating, Stack, Typography } from "@mui/material"

type Props = {
    title: string
    priority: number
    desc: string
}


export function TodoTask({ priority, desc, title }: Props) {
    const open = useBoolean();


    return <>
        <Card
            sx={{
                m: 1,
                width: 200,
                height: 200,
                position: 'relative'
            }}>
            <CardMedia
                component="img"
                alt={title}
                image={'/task.jpg'}
                sx={{
                    width: '100%',
                    aspectRatio: '1/1',
                    opacity: .5
                }}
            />
            <Box
                sx={theme => ({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: theme.palette.background.paper,
                    opacity: .6
                })}
            />
            <CardContent sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0
            }}>
                <Typography variant="h6">{title}</Typography>
                <Rating value={priority} readOnly size="small" />
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{desc.substring(0, 150)}</Typography>
            </CardContent>
            <CardActions
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: 'end'
                }}
            >
                <Button onClick={open.onTrue} size="small">
                    Check Details
                </Button>
            </CardActions>
        </Card>
        <Dialog
            open={open.value}
            onClose={open.onFalse}
            maxWidth="sm"
            fullScreen
            slotProps={{
                paper: {
                    sx(theme) {
                        return {
                            backgroundColor: alpha(theme.palette.background.default, .4),
                            backgroundImage: 'none',
                            backdropFilter: 'blur(10px)'
                        }
                    },
                }
            }}
        >
            <DialogContent>
                <Container maxWidth="md">
                    <Box sx={{ py: 12 }}>
                        <Typography variant="h1">
                            {title}
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <Rating value={priority} readOnly />
                        </Box>
                        {
                            desc
                                .split("\n")
                                .map(item => {
                                    if (item.length < 2) return <br />
                                    const done = item.startsWith("+");
                                    return <Stack
                                        direction="row"
                                        alignItems="center"
                                        gap={2}
                                        sx={{ my: 1 }}
                                    >
                                        {
                                            done ?
                                                <Box
                                                    sx={{
                                                        color: 'success.main',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2" className="duoicon-secondary-layer" opacity={0.3}></path><path fill="currentColor" d="m15.535 8.381l-4.95 4.95l-2.12-2.121a1 1 0 1 0-1.415 1.414l2.758 2.758a1.1 1.1 0 0 0 1.556 0l5.586-5.586a1 1 0 1 0-1.415-1.415" className="duoicon-primary-layer"></path></svg>
                                                </Box> :
                                                <Box
                                                    sx={{
                                                        color: 'warning.main',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"></path><rect width={2} height={7} x={11} y={6} fill="currentColor" rx={1}><animateTransform attributeName="transform" dur="9s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></rect><rect width={2} height={9} x={11} y={11} fill="currentColor" rx={1}><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></rect></svg>
                                                </Box>
                                        }
                                        <Typography variant="subtitle1" key={item}>
                                            {item.replace("+", "")}
                                        </Typography>
                                    </Stack>
                                })
                        }
                    </Box>
                </Container>
            </DialogContent>
            <DialogActions>
                <Button onClick={open.onFalse}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    </>
}