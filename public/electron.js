const { app, BrowserWindow, Menu } = require("electron");

const os = require('os');
const path = require('path');
const isDev = require('electron-is-dev');

// Custom 
const openAboutWindow = require('about-window').default;

const APP_CONTENT_DEV = 'http://localhost:3000';
const APP_CONTENT_PROD = `file://${path.join(__dirname, '../build/index.html')}`;
const APP_ICON = `${__dirname}/favicon.ico`;
const APP_PNG = `${__dirname}/logo.svg`;
const REACT_DEV_TOOL_URL = path.join(os.homedir(),'/AppData/Local/Google/Chrome/User Data/Profile 2/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.6.0_0');

let mainWindow;
let menu_bar = new Array();

// Initial method.
function createWindow() {

  mainWindow = new BrowserWindow(getWindowOptions());
  
  // Load the Project depending on the environment.
  mainWindow.loadURL(isDev 
    ? APP_CONTENT_DEV
    : APP_CONTENT_PROD);

  // Custom Menu.
  registerFileMenu();
  registerEditMenu();
  registerHelpMenu();
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu_bar));

  mainWindow.on('closed', () => mainWindow = null);
}

/**
 * Set the Electron window options.
 */
function getWindowOptions(){
  const windowWidth =  isDev ? 1500 : 900;

  return {
    title: "Convert and download video as MP3 or MP4.",
    width: windowWidth,
    height: 700,
    maximizeable: false,
    icon: APP_ICON,
    webPreferences: {
      nodeIntegration: true,
    },
  };
}

/* ==================== REGISTER MENUS ================= */
function registerFileMenu(){
  menu_bar.push({
    label: "File",
    submenu: [
      { type: "separator" },
      {
        label: "Quit",
        accelerator: "CmdOrCtrl+shift+Q",
        click: function () {
          app.quit();
        },
      },
    ],
  });
}

function registerEditMenu(){
  menu_bar.push({
    label: "Edit",
    submenu: [
      { role: "Reload", accelerator: "CmdOrCtrl+R", selector: "reload:" },
      { role: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
      { role: "Redo", accelerator: "CmdOrCtrl+Y", selector: "redo:" },
      { type: "separator" },
      { role: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
      { role: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
      { role: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
    ],
  });
}

function registerHelpMenu(){
  menu_bar.push({
    label: "?",
    submenu: [
      {
        label: "About",
        accelerator: "CmdOrCtrl+shift+A",
        click: () =>
          openAboutWindow({
            icon_path: APP_PNG,
            copyright: `Copyright (c) ${new Date().getFullYear()} - Video Converter`,
            package_json_dir: `${__dirname}/..`,
            license: `${__dirname}/../LICENSE.md`,
            css_path: path.join(__dirname, '/about.css'),
            win_options: {
              width: 600,
              height: 450,
              maximizeable: false,
              resizable: false,
              minimizable:false,

              parent: mainWindow,
              modal: true,
            }
          }),
      },
      { type: "separator" },
      {
        label: "Open Dev Tools",
        click: () => {
          mainWindow.webContents.openDevTools();
        },
        accelerator: "CmdOrCtrl+shift+i",
      }
    ],
  });

  // Automatically open the dev tool if it's dev environment.
  if (isDev) {
    // BrowserWindow.addDevToolsExtension(REACT_DEV_TOOL_URL);
    mainWindow.webContents.openDevTools();
  }
}

/* ================= SET APP LISTENERS ================= */
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});