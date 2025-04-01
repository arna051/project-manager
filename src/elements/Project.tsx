import { useBoolean } from "@/hooks/useBoolean";
import { getConfig, run } from "@/utils/electron";
import { alpha, Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Dialog, DialogActions, DialogContent, Skeleton, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { Swipe } from "./Swipe";
import { Recent } from "@/utils/recent";
import { SSH } from "./SSH";

type Props = {
    title: string
    image: string
    desc: string
    id: number
    servers: number[]
}

export function Project({ image, desc, title, id, servers }: Props) {
    const open = useBoolean();
    const save = useBoolean();

    const [items, setItems] = useState<any[]>([]);
    const [sshs, setSShs] = useState<any[]>([]);

    const [search, setSearch] = useState("")


    const load = async () => {
        const ssh = await getConfig("ssh", []);
        setSShs(ssh)
        const temp = (await getConfig("repos", [])).filter((x: any) => x.projectId === id)
        setItems(temp)
    }
    function renderItem(item: any) {
        let label = item.title;
        return <Chip
            variant="filled"
            label={label}
            key={label}
            size="medium"
            sx={{ minWidth: 100, mx: 1 }}
            color="primary"
            onClick={() => {
                run(`code (${item.path})`)
                Recent.set({ ...item, title: `${title} ${item.title}` })
            }}
        />
    }
    function renderItemSSH(id: number) {
        const item = sshs.find(x => x.id === id);
        if (!item) return null;
        return <SSH
            {...item}
            key={item.server}
        />
    }
    useEffect(() => {
        load()
    }, [open.value, save.value])
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
                image={image ? `/file/${image}` : '/project.jpg'}
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
                <Typography variant="caption" color="text.secondary">{desc}</Typography>
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
                <Button onClick={open.onTrue}>
                    See Repos
                </Button>
            </CardActions>
        </Card>
        <Dialog
            open={open.value}
            onClose={open.onFalse}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    sx(theme) {
                        return {
                            backgroundColor: alpha(theme.palette.background.default, .4),
                            backgroundImage: 'none',
                            backdropFilter: 'blur(5px)'
                        }
                    },
                }
            }}
        >
            <DialogContent>
                <Box sx={{ py: 2 }}>
                    <Stack direction="row" alignItems="center">
                        <TextField
                            label="Search"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            sx={{ mx: 2, flex: '1 1 auto' }}
                            variant="standard"
                            size="small"
                        />

                        <Button variant="outlined" color="success" size="large" onClick={() => {
                            items.forEach(x => {
                                run(`code (${x.path})`)

                                Recent.set({ ...x, title: `${title} ${x.title}` })
                            })
                        }}>
                            Open All Repositories
                        </Button>
                    </Stack>
                    <Box sx={{ my: 4 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Repositories
                        </Typography>
                        <Swipe height={50}>
                            {
                                items.length === 0 ?
                                    new Array(13).fill(13).map((_, i) => <Skeleton
                                        variant="rounded"
                                        width={100}
                                        height={32}
                                        key={i}
                                        animation="wave"
                                        sx={{ m: 1 }}
                                    />)
                                    :
                                    items.map(renderItem)
                            }
                        </Swipe>
                    </Box>
                    {
                        !!servers?.length && <Box sx={{ my: 4 }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Servers
                            </Typography>
                            <Swipe height={50}>
                                {
                                    servers.length === 0 ?
                                        new Array(13).fill(13).map((_, i) => <Skeleton
                                            variant="rounded"
                                            width={100}
                                            height={32}
                                            key={i}
                                            animation="wave"
                                            sx={{ m: 1 }}
                                        />)
                                        :
                                        servers.map(renderItemSSH)
                                }
                            </Swipe>
                        </Box>
                    }
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={open.onFalse}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    </>
}