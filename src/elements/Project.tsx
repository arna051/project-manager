import { useBoolean } from "@/hooks/useBoolean";
import { getConfig, run } from "@/utils/electron";
import { alpha, Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Dialog, DialogActions, DialogContent, IconButton, Skeleton, Stack, SxProps, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { Swipe } from "./Swipe";
import { Recent } from "@/utils/recent";
import { SSH } from "./SSH";
import Link from "next/link";

export type IProject = {
    title: string
    image: string
    desc: string
    id: number
    servers: number[]
    category: string
    rate: number
}

type Props = {
    onDelete?: VoidFunction
    onEdit?: VoidFunction
    link?: string
    sx?: SxProps
}

export function Project({ image, desc, title, id, servers, category, onEdit, onDelete, link, sx = {} }: IProject & Props) {
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
    }, [open.value, save.value]);



    const renderMedia = <>
        <CardMedia
            component="img"
            alt={title}
            image={image ? `/file/${image}` : '/project.jpg'}
            sx={{
                width: '100%',
                height: '100%',
                aspectRatio: '1/1',
                objectFit: 'cover'
            }}
        />
        <Box
            sx={theme => ({
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: theme.palette.background.default,
                opacity: .8
            })}
        />
    </>

    const renderContent = <>
        {renderMedia}
        <CardContent sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0
        }}>
            {category && <Chip variant="outlined" color="primary" label={category} size="small" sx={{ mb: 1 }} />}
            <Typography variant="h6">{title}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{desc}</Typography>
        </CardContent>
    </>
    const renderContentSecondary = <>
        {renderMedia}
        <CardContent sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
        }}>
            {category && <Chip variant="outlined" color="primary" label={category} size="small" sx={{ mb: 1 }} />}
            <Typography variant="h6">{title}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{desc}</Typography>
        </CardContent>
    </>

    const renderAction = <CardActions
        sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'end',
            gap: 0,
            '& *': {
                ml: '0 !important'
            }
        }}
    >

        <>
            {onDelete && <IconButton color="error" onClick={onDelete}>
                <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21"><g fill="none" fillRule="evenodd"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M6.043 4.773Q8 4.02 10.5 4.01t4.457.763a3 3 0 0 1 2.14 3.341l-1.075 6.994a4 4 0 0 1-3.954 3.392H8.932a4 4 0 0 1-3.954-3.392L3.902 8.114a3 3 0 0 1 2.141-3.34" strokeWidth={1}></path><path fill="currentColor" d="M10.5 10c3.556 0 5-1.5 5-2.5s-1.444-2.25-5-2.25s-5 1.25-5 2.25s1.444 2.5 5 2.5"></path></g></svg>
            </IconButton>}
            {onEdit && <IconButton color="warning" onClick={onEdit}>
                <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M17 4a2.12 2.12 0 0 1 0 3l-9.5 9.5l-4 1l1-3.944l9.504-9.552a2.116 2.116 0 0 1 2.864-.125zm-1.5 2.5l1 1" strokeWidth={1}></path></svg>
            </IconButton>}
            {!!link && <IconButton color="info" LinkComponent={Link} href={link}>
                <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}><path d="M10.5 16q4.695 0 8.5-5.5Q15.195 5 10.5 5T2 10.5Q5.805 16 10.5 16"></path><path d="M10.5 7q.277 0 .543.042a2.5 2.5 0 0 0 2.915 2.916q.042.264.042.542A3.5 3.5 0 1 1 10.5 7"></path></g></svg>
            </IconButton>}
        </>
    </CardActions>
    return <>
        <Card
            className="bring-me-up"
            sx={{
                m: 1,
                width: 200,
                height: 200,
                position: 'relative',
                ...sx,
                '&:hover .overlay': {
                    transform: 'translateY(0%)',
                }
            }}>
            {renderContent}
            <Box
                className="overlay"
                sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    transform: 'translateY(100%)',
                    transition: 'all .5s ease',

                }}>
                {renderContentSecondary}
                {renderAction}
            </Box>
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