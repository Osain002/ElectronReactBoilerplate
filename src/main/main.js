const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');

// Build the menu bar
const menu_builder = require(path.join(__dirname, 'menubuilder.js'));

// Build the menu bar

let mainWindow;

function createWindow() {
  
  // Create a browser window
  mainWindow = new BrowserWindow({  
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  });

  
  const menu = Menu.buildFromTemplate(menu_builder(mainWindow));
  Menu.setApplicationMenu(menu);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  
  // Vite dev server URL
  mainWindow.loadURL('http://localhost:5173');
  mainWindow.on('closed', () => mainWindow = null);
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow == null) {
    createWindow();
  }
});