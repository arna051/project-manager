import { useBoolean } from "@/hooks/useBoolean"
import { run } from "@/utils/electron"
import { Recent } from "@/utils/recent"
import { alpha, Box, Button, Chip, Dialog, DialogActions, DialogContent, Divider, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"

export type IRepo = {
    id: number
    title: string
    path: string
    deploy: string
    projectId: number
}

type Props = {
    onDelete?: VoidFunction
    onEdit?: VoidFunction
}

export function Repo({ title, deploy, path, projectId, onDelete, onEdit }: IRepo & Props) {
    const open = useBoolean();

    const [commit, setCommit] = useState("");

    function renderIcon() {
        if (title.includes("API")) return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="m12 14l-2-2l2-2l2 2zM9.875 8.471L8.183 6.78L12 2.962l3.817 3.817l-1.692 1.692L12 6.346zm-3.096 7.346L2.962 12l3.817-3.817L8.47 9.875L6.346 12l2.125 2.125zm10.442 0l-1.692-1.692L17.654 12l-2.125-2.125l1.692-1.692L21.038 12zM12 21.038l-3.817-3.817l1.692-1.692L12 17.654l2.125-2.125l1.692 1.692z"></path></svg>
        if (title.includes("Desktop")) return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M6 19.23q-.508 0-.87-.36T4.77 18t.36-.87t.87-.36t.87.36t.36.87t-.36.87t-.87.36m6 0q-.508 0-.87-.36t-.36-.87t.36-.87t.87-.36t.87.36t.36.87t-.36.87t-.87.36m6 0q-.508 0-.87-.36t-.36-.87t.36-.87t.87-.36t.87.36t.36.87t-.36.87t-.87.36m-12-6q-.508 0-.87-.36T4.77 12t.36-.87t.87-.36t.87.36t.36.87t-.36.87t-.87.36m6 0q-.508 0-.87-.36t-.36-.87t.36-.87t.87-.36t.87.36t.36.87t-.36.87t-.87.36m6 0q-.508 0-.87-.36t-.36-.87t.36-.87t.87-.36t.87.36t.36.87t-.36.87t-.87.36m-12-6q-.508 0-.87-.36T4.77 6t.36-.87t.87-.36t.87.36t.36.87t-.36.87t-.87.36m6 0q-.508 0-.87-.36T10.77 6t.36-.87t.87-.36t.87.36t.36.87t-.36.87t-.87.36m6 0q-.508 0-.87-.36T16.77 6t.36-.87t.87-.36t.87.36t.36.87t-.36.87t-.87.36"></path></svg>
        if (title.includes("APP") || title.includes("App")) return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M4.616 19q-.691 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h14.77q.69 0 1.152.463T21 6.616v10.769q0 .69-.463 1.153T19.385 19zm0-1H15v-3.884H4v3.269q0 .23.192.423t.423.192M16 18h3.385q.23 0 .423-.192t.192-.424V9.231h-4zM4 13.116h11V9.23H4z"></path></svg>
        return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M5.5 17q-2.091 0-3.545-1.454T.5 12.002t1.455-3.546T5.5 7q.823 0 1.58.296t1.374.838l2.123 1.82l-.77.657l-2.01-1.746q-.478-.404-1.074-.634Q6.127 8 5.499 8Q3.842 8 2.67 9.172Q1.5 10.345 1.5 12.003q0 1.659 1.171 2.828T5.499 16q.628 0 1.224-.23q.596-.232 1.073-.636l7.75-7q.598-.561 1.361-.848T18.5 7q2.091 0 3.546 1.454t1.454 3.544t-1.455 3.546T18.5 17q-.829 0-1.573-.306t-1.38-.828l-2.085-1.82l.73-.677l2.012 1.766q.477.427 1.073.646t1.225.219q1.656 0 2.827-1.172q1.171-1.173 1.171-2.831t-1.171-2.828T18.501 8q-.628 0-1.224.23q-.596.232-1.073.636l-7.75 7q-.598.561-1.361.848T5.5 17"></path></svg>
    }

    return <>
        <Chip
            label={
                <Stack direction="row" alignItems="center" gap={1}>
                    {renderIcon()}
                    <Typography>
                        {title}
                    </Typography>
                </Stack>
            }
            onClick={open.onTrue}
        />
        <Dialog
            open={open.value}
            onClose={open.onFalse}
            maxWidth="xs"
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
                <Stack gap={2} sx={{ my: 2 }}>

                    <Button
                        variant="contained"
                        color="info"
                        onClick={() => {
                            run(`code (${path})`)
                            Recent.set({ title, deploy, path, projectId })
                        }}
                    >
                        Open in VsCode
                    </Button>
                    <Button
                        variant="contained"
                        color="info"
                        onClick={() => {
                            run(`proxychains4 (code) (${path})`)
                            Recent.set({ title, deploy, path, projectId })
                        }}
                    >
                        Open in VsCode (Proxied)
                    </Button>


                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => run(`gnome-terminal (--) (bash) (-c) (${deploy.split("\n").join(";")}; sleep 60)`)}
                        disabled={!deploy}
                    >
                        Deploy on Server(s)
                    </Button>


                    <Divider sx={{ my: 4 }} />

                    <TextField
                        value={commit}
                        onChange={e => setCommit(e.target.value)}
                        label="Commit"

                    />

                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => run(`gnome-terminal (--) (bash) (-c) (cd "${path}";branch_name=$(git rev-parse --abbrev-ref HEAD); git add . ; git commit -m "${commit}"; proxychains4 git push origin $branch_name; echo Done; sleep 30)`)}
                    >
                        Commit Changes & Push
                    </Button>

                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={onEdit}>Edit</Button>
                <Button color="error" onClick={onDelete}>Delete</Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={open.onFalse} color="inherit">Close</Button>
            </DialogActions>
        </Dialog>
    </>
}