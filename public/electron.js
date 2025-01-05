import electron from 'electron';
const { app, BrowserWindow } = electron;
import path from 'path';
import isDev from 'electron-is-dev';

/**
 * Base path where server is running.
 * 
 * @returns {string} directory name
 */
function _get_dir_name(){
    // @ts-ignore
    if(process.pkg){
        return path.dirname(process.execPath);
    } else {
        return process.cwd();
    }
};

let mainWindow = null;
app.on('ready', createWindow);
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 1024,
    icon: '/favicon.ico',
    title: "Dissidia Compendium",
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000/' : `file://${path.join(_get_dir_name(), 'index.html')}`);
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  mainWindow.on('page-title-updated', function (e) {
    e.preventDefault()
  });
}