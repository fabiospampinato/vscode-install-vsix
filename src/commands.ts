
/* IMPORT */

import * as vscode from 'vscode';
import Utils from './utils';
const installationEndMessage = 'INSTALLATION ENDED';

/* COMMANDS */

function isWindows () {
  return process.platform === 'win32';
}

async function showSuccessMessage () {
  const reloadButtonMessage = 'Reload Now',
    option = await vscode.window.showInformationMessage(
      'Extension intalled... A restart is needed.',
      { title: reloadButtonMessage }
    );

  if (option && option.title === reloadButtonMessage)
    vscode.commands.executeCommand('workbench.action.reloadWindow');
}

function showErrorMessage () {
  vscode.window.showInformationMessage(
    `The extension does not appear to be installed correctly. Please check the 'VSIX' terminal for more information.`
  );
}

async function install ( file: vscode.Uri ) {

  if ( !file || !file.fsPath ) return;

  /* TERMINAL */

  const term = <any>vscode.window.createTerminal ( 'VSIX' ),
    command = Utils.isInsiders () ? 'code-insiders' : 'code',
    commandLine = `${command} --install-extension ${file.fsPath} ${
      isWindows () ? '&' : ';'
    } echo ${installationEndMessage}`;

  await term.processId;
  await Utils.delay ( 200 );

  term.sendText ( commandLine, true );
  term.show ( false );

  let installationSuccesful = false;
  term.onDidWriteData ( async data => {
    if (data.indexOf('was successfully installed!') > 0)
      installationSuccesful = true

    if ( data.startsWith( installationEndMessage ) )
      installationSuccesful ? showSuccessMessage() : showErrorMessage()
  } );

  /* INFO */

  await vscode.window.showInformationMessage(
    'Installing extension... Once done, a restart is needed.'
  );
}

/* EXPORT */

export {install};
