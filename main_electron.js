const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        frame: true, // Hides the default title bar
        transparent: false,
        icon: path.join(__dirname, 'icons/icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // Load the index.html file from your project directory
    mainWindow.loadFile(path.join(__dirname, 'visualize.html'));
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

//Listen for the close signal
ipcMain.on('close-app', function () {
    app.quit();
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});