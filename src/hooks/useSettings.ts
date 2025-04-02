import { ISettings } from "@/type";
import { getConfig } from "@/utils/electron";
import { useEffect, useState } from "react";

const initial = {
    name: "",
    image: "",
    background: "",
    welcome: ""
}
export function useSettings() {

    const [settings, setSettings] = useState<ISettings>(initial);


    const load = async () => {
        const temp = await getConfig<ISettings>("settings", {})
        setSettings({ ...initial, ...temp })
    }

    useEffect(() => {
        load()
    }, []);

    return settings
}