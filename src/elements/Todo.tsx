import { useBoolean } from "@/hooks/useBoolean";
import { alpha, Box, Button, Card, CardActions, CardContent, CardMedia, Container, Dialog, DialogActions, DialogContent, IconButton, Rating, Stack, Typography } from "@mui/material"

export type ITodo = {
    id: number
    title: string
    priority: number
    desc: string
    image: string
    projectId: number
}


type Props = {
    onDelete?: VoidFunction
    onEdit?: VoidFunction
}

export function TodoTask({ priority, desc, title, onDelete, onEdit, image }: ITodo & Props) {
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
                image={image ? `/file/${image}` : '/task.jpg'}
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
                <>
                    {onDelete && <IconButton color="error" onClick={onDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21"><g fill="none" fillRule="evenodd"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M6.043 4.773Q8 4.02 10.5 4.01t4.457.763a3 3 0 0 1 2.14 3.341l-1.075 6.994a4 4 0 0 1-3.954 3.392H8.932a4 4 0 0 1-3.954-3.392L3.902 8.114a3 3 0 0 1 2.141-3.34" strokeWidth={1}></path><path fill="currentColor" d="M10.5 10c3.556 0 5-1.5 5-2.5s-1.444-2.25-5-2.25s-5 1.25-5 2.25s1.444 2.5 5 2.5"></path></g></svg>
                    </IconButton>}
                    {onEdit && <IconButton color="warning" onClick={onEdit}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M17 4a2.12 2.12 0 0 1 0 3l-9.5 9.5l-4 1l1-3.944l9.504-9.552a2.116 2.116 0 0 1 2.864-.125zm-1.5 2.5l1 1" strokeWidth={1}></path></svg>
                    </IconButton>}
                    <IconButton color="info" onClick={open.onTrue}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}><path d="M10.5 16q4.695 0 8.5-5.5Q15.195 5 10.5 5T2 10.5Q5.805 16 10.5 16"></path><path d="M10.5 7q.277 0 .543.042a2.5 2.5 0 0 0 2.915 2.916q.042.264.042.542A3.5 3.5 0 1 1 10.5 7"></path></g></svg>
                    </IconButton>
                </>
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
            <Box
                component="img"
                src={image ? `/file/${image}` : '/task.jpg'}
                alt="image"
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: -1,
                    opacity: .4
                }}
            />
            <Box
                component="div"
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                    bgcolor: 'background.default',
                    opacity: .7
                }}
            />
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
                                .map((item, i) => {
                                    if (item.length < 2) return <br key={i} />
                                    const done = item.startsWith("+");
                                    const title = item.startsWith("##");
                                    const text = item.startsWith("#");
                                    return <Stack
                                        direction="row"
                                        alignItems="center"
                                        gap={2}
                                        key={i}
                                        sx={{ my: 1 }}
                                    >
                                        {
                                            !title && !text && <>
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
                                            </>
                                        }

                                        {
                                            title ?
                                                <Typography variant="h4" key={item}>
                                                    {item.replace("+", "").replace("##", "").replace("#", "")}
                                                </Typography>
                                                : text ?
                                                    <Typography variant="body1" key={item} color="text.secondary">
                                                        {item.replace("+", "").replace("##", "").replace("#", "")}
                                                    </Typography> :
                                                    <Typography variant="subtitle1" key={item}>
                                                        {item.replace("+", "").replace("##", "").replace("#", "")}
                                                    </Typography>
                                        }
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