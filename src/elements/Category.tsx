import { useBoolean } from "@/hooks/useBoolean";
import { getConfig } from "@/utils/electron";
import { alpha, Box, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, Skeleton, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { Swipe } from "./Swipe";
import { Project } from "./Project";

type Props = {
    title: string
    image: string
    desc: string
}


export function Category({ image, desc, title }: Props) {
    const open = useBoolean();
    const save = useBoolean();

    const [items, setItems] = useState<any[]>([]);

    const [search, setSearch] = useState("")


    const load = async () => {
        const temp = (await getConfig("projects-contracts", [])).filter((x: any) => x.category === title)
        setItems(temp)
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
                image={image ? `/file/${image}` : '/category.jpg'}
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
                    See Projects
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
                <Box sx={{ py: 4 }}>
                    <TextField
                        label="Search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        sx={{ mx: 2 }}
                    />
                    <Swipe height={350}>
                        {
                            items.length === 0 ?
                                new Array(13).fill(13).map((_, i) => <Skeleton
                                    variant="rounded"
                                    width={200}
                                    height={200}
                                    key={i}
                                    animation="wave"
                                    sx={{ m: 1 }}
                                />)
                                :
                                items.map(item => <Project {...item} key={item.id} />)
                        }
                    </Swipe>
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