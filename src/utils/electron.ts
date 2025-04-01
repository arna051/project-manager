import { toast } from "sonner";


export const saveConfig = (name: string, configs: any) => {
    const electronApi = (window as any).electronAPI
    try {
        electronApi.saveConfig(name, configs)
    } catch (err) {
        console.log(err);
    }
}
export const getConfig = async (name: string, defaults: any) => {
    const electronApi = (window as any).electronAPI
    try {
        return electronApi.getConfig(name, defaults)
    } catch (err) {
        console.log(err);
        return defaults
    }
}
export const run = (command: string) => {
    const electronApi = (window as any).electronAPI
    const args = extractParenthesesContent(command);
    const app = removeParenthesesContent(command).trim();
    toast.info(`Running Task: ${app} ${args.join(" ")}`);
    try {
        electronApi.run(command)
    } catch (err) {
        console.log(err);
    }
}
export const bringUp = () => {
    const electronApi = (window as any).electronAPI
    try {
        electronApi.bringUp()
    } catch (err) {
        console.log(err);
    }
}

const extractParenthesesContent = (str: string) => {
    const regex = /\(([^)]+)\)/g;
    return [...str.matchAll(regex)].map(match => match[1]).filter(x => x);
};

const removeParenthesesContent = (str: string) => {
    return str.replace(/\([^)]*\)/g, '');
};