import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "url";
import path from "path";

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
let mainWindow;
function createWindow(){
    mainWindow=new BrowserWindow({
        width: 400,
        height: 650,
        alwaysOnTop: true,
        frame: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
    });
    mainWindow.loadURL("http://localhost:5173");
}

app.whenReady().then(()=>{
    createWindow();
    app.on("activate",()=>{
        if(BrowserWindow.getAllWindows().length===0){
            createWindow();
        }
    });
});

app.on("window-all-closed",()=>{
    if(process.platform!=="darwin"){
        app.quit();
    }
});