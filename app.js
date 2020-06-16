const { ipcMain, app, BrowserWindow } = require('electron');
const chokidar = require('chokidar');

function createWindow() {
    let win = new BrowserWindow({
        width: 500,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('public/index.html');
}

ipcMain.on('folder', (_, pathname) => {
    chokidar.watch(pathname).on('all', (event, path) => {
        if (event == 'add') {
            console.log('New File');
        } else if (event == 'change') {
            console.log('File Updated');
        } else if (event == 'unlink') {
            console.log('File Deleted');
        }
    });
});

app.whenReady().then(createWindow);