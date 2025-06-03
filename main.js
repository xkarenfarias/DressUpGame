
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 450,
        height: 500,
        minWidth: 450,
        minHeight: 500,
        resizable: true,
        frame: false,
        fullscreenable: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        icon: path.join(__dirname, './images/icon/cakerosa.ico')
    });

    win.loadFile('index.html');

    win.webContents.on('before-input-event', (event, input) => {
        if ((input.key === 'r' && input.control) || input.key === 'F5') {
            event.preventDefault();
        }
    });
}

function setupListeners() {
    ipcMain.on('minimizar-janela', () => {
        if (win) win.minimize();
    });

    ipcMain.on('fechar-janela', () => {
        if (win) win.close();
    });

    ipcMain.on('maximizar-janela', () => {
        if (win) {
            const isFull = win.isFullScreen();
            win.setFullScreen(!isFull);  // Toggle fullscreen
        }
    });
}

app.whenReady().then(() => {
    createWindow();
    setupListeners();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
            setupListeners();
        }
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});