import { useBoolean } from "@/hooks/useBoolean"
import { run } from "@/utils/electron"
import { Recent } from "@/utils/recent"
import { alpha, Box, Button, Chip, Dialog, DialogActions, DialogContent, Divider, IconButton, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"

export type IRepo = {
    id: number
    title: string
    path: string
    deploy: string
    projectId: number
    dev: string
}

type Props = {
    onDelete?: VoidFunction
    onEdit?: VoidFunction
}

export function Repo({ title, deploy, path, projectId, dev, onDelete, onEdit }: IRepo & Props) {
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
                    <Box sx={{ width: 2 }} />
                    {
                        !!deploy && <IconButton size="small" color="warning" onClick={() => run(`gnome-terminal (--) (bash) (-c) (${deploy.split("\n").join(";")}; sleep 60)`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="currentColor" d="m11.192 20.687l-6.384-3.68q-.38-.217-.593-.59Q4 16.044 4 15.61V8.391q0-.435.215-.808q.214-.373.593-.59l6.384-3.68q.38-.217.808-.217t.808.217l6.384 3.68q.38.216.594.59q.214.373.214.808v7.219q0 .434-.214.807q-.215.373-.594.59l-6.384 3.68q-.38.217-.808.217t-.808-.217m.308-8.4v7.427l.23.132q.135.077.27.077t.27-.077l.23-.132v-7.427L19 8.523v-.242q0-.097-.048-.193t-.144-.153l-.383-.221L12 11.427L5.575 7.714l-.383.22q-.096.058-.144.155Q5 8.185 5 8.28v.242z"></path></svg>
                        </IconButton>
                    }
                    <IconButton size="small" onClick={() => {
                        run(`code (${path})`)
                        Recent.set({ title, deploy, path, projectId })
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 32 32"><path fill="#2196f3" d="M24.003 2L12 13.303L4.84 8L2 10l6.772 6L2 22l2.84 2L12 18.702L24.003 30L30 27.087V4.913ZM24 9.434v13.132L15.289 16Z"></path></svg>
                    </IconButton>

                    {
                        !!dev && <IconButton size="small" color="success" onClick={() => run(`gnome-terminal (--) (bash) (-c) (${dev})`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M9 17.192V6.808L17.154 12z"></path></svg>
                        </IconButton>
                    }

                    <IconButton size="small" onClick={open.onTrue}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="currentColor" d="m10.135 21l-.362-2.892q-.556-.164-1.055-.454t-.927-.664l-2.668 1.135l-1.865-3.25l2.306-1.739q-.045-.27-.073-.548q-.03-.278-.03-.569t.03-.578t.073-.578L3.258 9.126l1.865-3.212L7.771 7.03q.448-.373.938-.664q.489-.29 1.045-.473L10.134 3h3.732l.361 2.912q.537.182 1.016.463t.909.654l2.725-1.115l1.865 3.211l-1.85 1.4q-.519-.183-1.05-.277t-1.073-.094q-.692 0-1.347.164q-.655.165-1.284.444q-.32-.575-.912-.919q-.591-.343-1.253-.343q-1.046 0-1.773.727T9.473 12q0 .662.328 1.24q.328.58.897.92q-.304.711-.414 1.47q-.111.759-.111 1.534q.064 1.053.447 2.047q.384.993 1.076 1.789zm5.93-.1q-1.33-.23-2.276-1.179q-.945-.948-1.156-2.279h.82q.207.981.919 1.693t1.694.919zm1.346.025v-.871q1.143-.237 1.908-1.152q.766-.916.766-2.133t-.766-2.133t-1.908-1.152v-.87q1.512.236 2.535 1.402q1.023 1.167 1.023 2.753t-1.023 2.753t-2.535 1.403m-4.778-4.829q.211-1.33 1.157-2.279q.945-.948 2.276-1.178v.846q-.981.206-1.694.918t-.918 1.693zm3.26 2.366v-3.385l2.6 1.692z"></path></svg>
                    </IconButton>
                </Stack>
            }
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