import { useBoolean } from "@/hooks/useBoolean"
import { run } from "@/utils/electron"
import { alpha, Box, Button, Chip, Dialog, DialogActions, DialogContent, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { toast } from "sonner"

export type ISSH = {
    title: string
    server: string
    proxy: boolean
    id: number
}

type Props = {
    onDelete?: VoidFunction
    onEdit?: VoidFunction
}

export function SSH({ proxy, server, title, onDelete, onEdit }: ISSH & Props) {
    const open = useBoolean();
    const [ssh, setSsh] = useState(server);

    const [user] = ssh.split("@");

    const home = () => {
        if (user === 'root') return '/root'
        return `/home/${user}`
    }
    return <>
        <Chip
            label={
                <Stack direction="row" alignItems="center" gap={1}>
                    <Box className="blob" />
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
                    <TextField
                        variant="standard"
                        value={ssh}
                        onChange={e => setSsh(e.target.value)}
                        label="SSH Connection"
                    />

                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => run(`gnome-terminal (--) (ssh) (${server})`)}
                    >
                        Direct Terminal
                    </Button>


                    {proxy && <Button
                        variant="contained"
                        color="success"
                        onClick={() => run(`gnome-terminal (--) (proxychains4) (ssh) (${server})`)}
                    >
                        Proxy Terminal
                    </Button>}


                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => run(`nautilus (sftp://${server}${home()})`)}
                    >
                        Browse Files
                    </Button>


                    {proxy && <Button
                        variant="contained"
                        color="success"
                        onClick={() => run(`proxychains4 (nautilus) (sftp://${server}${home()})`)}
                    >
                        Proxy Browse Files
                    </Button>}


                    <Button
                        variant="contained"
                        color="warning"
                        onClick={() => {
                            if (proxy)
                                run(`gnome-terminal (--) (proxychains4) (ssh) (${server}) ("reboot")`)
                            else run(`gnome-terminal (--) (ssh) (${server}) ("reboot")`);

                            toast.success("Server was rebooted.")
                        }}
                    >
                        Reboot
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            if (proxy)
                                run(`gnome-terminal (--) (proxychains4) (ssh) (${server}) ("shutdown")`)
                            else run(`gnome-terminal (--) (ssh) (${server}) ("shutdown")`);

                            toast.success("Server was shuted down.")
                        }}
                    >
                        Shutdown
                    </Button>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={onEdit}>Edit</Button>
                <Button color="error" onClick={onDelete}>Delete</Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={open.onFalse}>Close</Button>
            </DialogActions>
        </Dialog>
    </>
}