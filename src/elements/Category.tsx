import { useBoolean } from "@/hooks/useBoolean";
import { getConfig } from "@/utils/electron";
import { Box, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material"
import Link from "next/link";
import { useEffect, useState } from "react";
export type ICategory = {
    title: string
    image: string
    desc: string
    index?: number
}


type Props = {
    onDelete?: VoidFunction
    onEdit?: VoidFunction
    link?: string
}

export function Category({ image, desc, title, link, onDelete, onEdit }: ICategory & Props) {
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
        </Card>
    </>
}