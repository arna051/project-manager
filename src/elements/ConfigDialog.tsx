import { Box, Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from "@mui/material";

export function ConfigDialog({ children, onSubmit, ...props }: DialogProps & { onSubmit: VoidFunction }) {

    return <Dialog maxWidth="sm" fullWidth {...props}>
        <DialogTitle>Config Section</DialogTitle>
        <DialogContent>
            <Box sx={{ py: 2 }}>
                {children}
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClose as any}>Close</Button>
            <Button variant="contained" onClick={onSubmit}>Save Configs</Button>
        </DialogActions>
    </Dialog>
}