import { useBoolean } from "@/hooks/useBoolean";
import { getConfig } from "@/utils/electron";
import { Button, Chip, Dialog, DialogActions, DialogContent, List, ListItem, ListItemButton, ListItemText, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

type Props = {
    name: string
    parentId: number
}
export function RHFServers({ name, parentId }: Props) {
    const { control, watch } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });
    const [items, setItems] = useState<any[]>([]);
    const open = useBoolean();

    const load = async () => {
        const temp = await getConfig("ssh", [])
        setItems(temp)
    }

    const { configs, servers } = watch();

    useEffect(() => {
        load()
    }, [])

    return <>
        <Stack
            direction="row"
            gap={2}
            alignItems="center"
            flexWrap="wrap"
            sx={{ width: '100%' }}
        >
            {fields.map((keyword, index) => (
                <Chip
                    key={keyword.id}
                    label={items.find(x => x.id === servers[index])?.title}
                    variant="filled"
                    onDelete={() => remove(index)}
                />
            ))}

            <Chip
                label="Add Server"
                variant="filled"
                onClick={open.onTrue}
            />
        </Stack>
        <Dialog
            open={open.value}
            onClick={open.onFalse}
            maxWidth="xs"
            fullWidth
        >
            <DialogContent>
                <List>
                    {
                        items.map(item => <ListItem key={item.id}>
                            <ListItemButton onClick={() => append(item.id)}>
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        </ListItem>)
                    }
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={open.onFalse}>Close</Button>
            </DialogActions>
        </Dialog>
    </>
}