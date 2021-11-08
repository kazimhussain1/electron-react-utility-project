const path = require('path');
const fs = require('fs');
const unzipper = require('unzipper');
const { app, BrowserWindow, dialog, ipcMain, protocol } = require('electron');

let workingDirectory = '';
function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 850,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  const startUrl = process.env.ELECTRON_START_URL || path.join(__dirname, '../index.html');
  win.loadURL(startUrl);
  // Open the DevTools.
  if (process.env.ELECTRON_START_URL) {
    win.webContents.openDevTools({ mode: 'detach' });
  }

  setIPCListeners(win);

  protocol.registerFileProtocol('atom', (request, callback) => {
    console.log(request.url);
    const url = request.url.substr(7);
    callback({ path: url });
  });
}

function setIPCListeners(win) {
  ipcMain.on('select-dirs', async () => {
    const result = await dialog.showOpenDialog(win, {
      properties: ['openDirectory']
    });

    workingDirectory = result.filePaths;
    win.webContents.send('select-dirs-result', { path: workingDirectory });
  });

  ipcMain.on('load-data', async (event, arg) => {
    const { path } = arg;
    let file = fs.readFileSync(path, { encoding: 'utf8' }).toString();
    file = file.replace(/0.001(\r\n|\r|\n)/g, '');
    let values = file.split(/\r\n|\r|\n/);
    values = values.slice(0, values.length - 1);
    const { sd, mean, median, mode, min, max } = getStats(values);

    values = values.map((val, i) => [0, val, '', i + 1]);

    fs.createReadStream(path.replace('.csv', '.zip'))
      .pipe(unzipper.Extract({ path: path.replace('.csv', '') }))
      .on('finish', () => {
        win.webContents.send('load-data-result', { values, sd, mean, median, mode, min, max });
      });
  });

  // ipcMain.on('load-data', async (event, arg) => {
  //   const { fileName } = arg;

  // });
}

function getStats(data) {
  const n = data.length;

  const modes = {};
  let maxMode = 0;
  let count = 0;

  let min = parseFloat(data[0]);
  let max = parseFloat(data[0]);
  for (let i = 0; i < n; i++) {
    const item = data[i];
    data[i] = parseFloat(item);

    min = data[i] < min ? data[i] : min;
    max = data[i] > max ? data[i] : max;

    if (modes[item]) {
      modes[item]++;
    } else {
      modes[item] = 1;
    }

    if (count < modes[item]) {
      maxMode = item;
      count = modes[item];
    }
  }
  // data = data.map((str) => parseFloat(str));

  data = [...data].sort((a, b) => a - b);
  const mean = data.reduce((a, b) => a + b) / n;
  const median = n % 2 === 0 ? (data[n / 2 - 1] + data[n / 2]) / 2 : data[(n - 1) / 2];
  const sd = Math.sqrt(data.map((x) => (x - mean) ** 2).reduce((a, b) => a + b) / n);

  return { sd, mean, median, mode: parseFloat(maxMode), min, max };
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
