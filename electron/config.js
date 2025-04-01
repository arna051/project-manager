import { app } from "electron";
import { readFileSync, existsSync, writeFileSync } from "fs";
import { join } from "path";
const configFile = join(app.getPath('userData'), 'configs.json');

function loadFile() {
    if (!existsSync(configFile)) return {};
    return JSON.parse(readFileSync(configFile, { encoding: 'utf-8' }));
}

function saveFile(newConfigs = {}) {
    writeFileSync(configFile, JSON.stringify(newConfigs), { encoding: 'utf-8' });
}

class AppConfigs {
    #configs = {};

    constructor() {
        this.#configs = loadFile();
    }

    save(name, config) {
        this.#configs[name] = config;
        saveFile(this.#configs);
    }

    get(name, defaultValue = []) {
        return this.#configs[name] || defaultValue
    }
}

export default AppConfigs;