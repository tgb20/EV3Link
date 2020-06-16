const { ipcRenderer, remote } = require('electron');
const dialog = remote.dialog;
const win = remote.getCurrentWindow();

function chooseFolder() {

    let options = {
        title: "Pick a folder",
        buttonLabel: "Select Folder",
        properties: ["openDirectory"]
    }

    dialog.showOpenDialog(win, options).then(result => {
        let pathname = result.filePaths[0];

        if (pathname === undefined) {
            console.log('No Path');
            return;
        }

        ipcRenderer.send('folder', pathname);
    });
}