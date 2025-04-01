import { app, BrowserWindow, globalShortcut, ipcMain, screen } from 'electron';
import path from 'path';
import { existsSync } from 'fs';
import { spawn } from 'child_process';
import next from 'next';
import express from 'express';
import AppConfigs from './config.js'; // ensure config is ESM or has default export
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Proxy } from './proxy.js';

// __dirname polyfill in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dev = process.env.ELECTRON_ENV === 'development';

console.log(`Development: ${dev}`);

const configs = new AppConfigs();
let mainWindow;
const createWindow = () => {
    const { workArea } = screen.getPrimaryDisplay();

    const win = new BrowserWindow({
        icon: path.join(__dirname, '../public/logo.png'),
        width: 1024,
        height: 768,
        x: ((workArea.x + workArea.width) - (workArea.width / 2)) - (1024 / 2),
        y: ((workArea.y + workArea.height) - (workArea.height / 2)) - (768 / 2),
        frame: false,
        transparent: true,
        fullscreen: configs.get("fullscreen", false),
        backgroundColor: '#18170d',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    win.loadURL('http://localhost:3000');


    mainWindow = win;

    win.on("close", () => {
        mainWindow = null;
    })
    win.on("closed", () => {
        mainWindow = null;
    })
    // Register a shortcut to toggle fullscreen (e.g., F11)
    globalShortcut.register('F11', () => {
        const isFullScreen = win.isFullScreen();
        win.setFullScreen(!isFullScreen);
    });
    if (dev) win.webContents.openDevTools();
};

const createAssistWindow = () => {
    const { workArea } = screen.getPrimaryDisplay()
    const win = new BrowserWindow({
        icon: path.join(__dirname, '../public/logo.png'),
        width: 90,
        height: 90,
        frame: false,
        x: workArea.x + workArea.width - 20,
        y: workArea.y + workArea.height - 20,
        skipTaskbar: true,
        transparent: true,
        maxHeight: 90,
        maxWidth: 90,
        minHeight: 90,
        minWidth: 90,
        resizable: false,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    win.loadURL('http://localhost:3000/?type=assist');

    // if (dev) win.webContents.openDevTools();
};

const startServer = async () => {
    const nextApp = next({ dev, dir: path.join(__dirname, '..') });
    const handle = nextApp.getRequestHandler();

    await nextApp.prepare();

    const server = express();

    server.get("/file/*", (req, res) => {
        const filePath = decodeURIComponent(req.path.replace('/file', ''));
        const safePath = path.normalize(filePath);
        if (!existsSync(safePath)) {
            return res.status(404).send("File not found");
        }
        res.download(safePath, path.basename(safePath), (err) => {
            if (err) {
                console.error("Download error:", err);
                res.status(500).send("Error downloading file");
            }
        });
    });
    server.get("/config.json", (req, res) => {
        if (!existsSync('./configs.json')) {
            return res.status(404).send("File not found");
        }
        res.download('./configs.json', path.basename('./configs.json'), (err) => {
            if (err) {
                console.error("Download error:", err);
                res.status(500).send("Error downloading file");
            }
        });
    });


    server.get("/youth", Proxy.data("https://ahmedalhasan.me/api/data/documents?order=desc&orderBy=updatedAt&project=title&project=latinTitle&project=description&project=image&project=type"))
    server.get("/youth/image/:name", Proxy.image('https://ahmedalhasan.me/api/fs/files/'));

    server.get("/omega", Proxy.data("https://omegateb.com/api/data/products"))
    server.get("/omega/image/:name", Proxy.image('https://omegateb.com/api/fs/files/'));

    server.get("/ghalbedovom", Proxy.data("https://ghlbedovom.com/api/data/products"))
    server.get("/ghalbedovom/image/:name", Proxy.image('https://ghlbedovom.com/api/fs/files/'));

    server.all('*', (req, res) => handle(req, res));

    server.listen(3000, () => {
        console.log('> Next.js server ready on http://localhost:3000');

        createAssistWindow()
        createWindow();
    });
};

ipcMain.on('save-config', (_, name, _configs) => {
    configs.save(name, _configs);
    if (name === 'fullscreen' && mainWindow) {
        const isFullScreen = mainWindow.isFullScreen();
        configs.save(name, !isFullScreen);
        mainWindow.setFullScreen(!isFullScreen);
    }
});

ipcMain.handle('get-config', async (_, name, _configs) => {
    return configs.get(name, _configs);
});

const extractParenthesesContent = (str) => {
    const regex = /\(([^)]+)\)/g;
    return [...str.matchAll(regex)].map(match => match[1]).filter(x => x);
};

const removeParenthesesContent = (str) => {
    return str.replace(/\([^)]*\)/g, '');
};

ipcMain.on('run', (_, command = '') => {
    const args = extractParenthesesContent(command);
    const child = spawn(removeParenthesesContent(command).trim(), args, {
        detached: true,
        stdio: 'ignore'
    });
    child.unref();
});



ipcMain.on('bring-up', () => {
    if (mainWindow) return mainWindow.focus();
    createWindow();
});


app.whenReady().then(startServer);
