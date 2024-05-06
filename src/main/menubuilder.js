const { app, BrowserWindow, ipcMain, Menu } = require('electron');


function menu_builder(mainWindow){
  // Build the menu template
  const template = [
    {
      label: app.name,
      submenu: [
        { role: 'about' },
        { role: 'quit' },
      ],
    },
    {
      label: 'File',
      submenu: [
        // Add your "New" section here
        { label: 'New Song', click: () => mainWindow.webContents.send('ipc_message', 'new_song')}, // Create a new client
        { label: 'Save', click: () => mainWindow.webContents.send('ipc_message', 'save_song')}, // Create a new client
        { label: 'Open', click: () => mainWindow.webContents.send('ipc_message', 'open_song')}, // Create a new client
      ],
    },
    {
      label: 'Track',
      submenu: [
        // Add your "New" section here
        { label: 'New Track', click: () => mainWindow.webContents.send('ipc_message', 'new_track')}, // Create a new client
        { label: 'Duplicate Track', click: () => mainWindow.webContents.send('ipc_message', 'duplicate_track')}, // Create a new client
      ],
    },
    // Add other menu sections as needed
    // For example: Edit, View, Help, etc.
  ];

  return template;
}

module.exports = menu_builder;