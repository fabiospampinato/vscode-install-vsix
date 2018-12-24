
/* IMPORT */

import * as vscode from 'vscode';
import Utils from './utils';
const installationEndMessage = 'INSTALLATION ENDED';

/* COMMANDS */

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
  vscode.window.showWarningMessage(
    `The extension does not appear to be installed correctly. Please check the 'VSIX' terminal for more information.`
  );
}

async function install ( file: vscode.Uri ) {

  if ( !file || !file.fsPath ) return;

  /* TERMINAL */

  const term = <any>vscode.window.createTerminal ( 'VSIX' ),
    command = Utils.isInsiders () ? 'code-insiders' : 'code',
    commandEndInstallation = `echo ${installationEndMessage}`;

  await term.processId;
  await Utils.delay ( 200 );

  term.sendText ( `${command} --install-extension ${file.fsPath}` );
  term.sendText ( commandEndInstallation );
  term.show ( false );

  let installationSuccesful = false;
  term.onDidWriteData ( async data => {
    if (data.indexOf('was successfully installed!') > 0)
      installationSuccesful = true

    if ( data.indexOf(commandEndInstallation) === -1 && data.indexOf( installationEndMessage ) >= 0 )
      installationSuccesful ? showSuccessMessage() : showErrorMessage()
  } );

  /* INFO */

  await vscode.window.showInformationMessage(
    'Installing extension... Once done, a restart is needed.'
  );
}

/* EXPORT */

export {install};
