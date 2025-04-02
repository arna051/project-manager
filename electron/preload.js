const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    run: (command) => ipcRenderer.send('run', command),
    saveConfig: (name, configs) => ipcRenderer.send('save-config', name, configs),
    getConfig: async (name, configs) => await ipcRenderer.invoke('get-config', name, configs),
    bringUp: () => ipcRenderer.send('bring-up'),
    selectFile: () => ipcRenderer.invoke('select-file'),
    selectFolder: () => ipcRenderer.invoke('select-folder'),
});