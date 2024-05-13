// ====================================================
//
// This is the menu bar handler file
//
// ====================================================
const { ipcRenderer }  = window.require('electron');
// ====================================================

export default function IPCListener(callback) {

  // Listen for any messages from the ipc
  ipcRenderer.on('ipc_message', (event, messageType, ...args) => {
    
    // Call the callback
    callback(messageType, ...args);
  });

  return () => {
    ipcRenderer.removeAllListeners('ipc-message');
  }
}