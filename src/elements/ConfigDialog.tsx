import { alpha, Box, Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from "@mui/material";

export function ConfigDialog({ children, onSubmit, title, ...props }: DialogProps & { onSubmit: VoidFunction, title?: string }) {

    return <Dialog maxWidth="sm" fullWidth {...props}
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
        }}>
        <DialogTitle>
            {title || "Config Section"}
        </DialogTitle>
        <DialogContent>
            <Box sx={{ py: 2 }}>
                {children}
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClose as any}>Close</Button>
            <Button variant="contained" onClick={onSubmit}>Save</Button>
        </DialogActions>
    </Dialog>
}