
/* IMPORT */

import * as vscode from 'vscode';
import Utils from './utils';

/* COMMANDS */

async function install ( file: vscode.Uri ) {

  if ( !file || !file.fsPath ) return;

  /* TERMINAL */

  const term = vscode.window.createTerminal ( 'VSIX' ),
        command = Utils.isInsiders () ? 'code-insiders' : 'code';

  await term.processId;
  await Utils.delay ( 200 );

  term.sendText ( `${command} --install-extension "${file.fsPath}"`, true );

  term.show ( false );

  /* INFO */

  const option = await vscode.window.showInformationMessage ( 'Installing extension... Once done, a restart is needed.', { title: 'Reload Now' } );

  if ( !option || option.title !== 'Reload Now' ) return;

  vscode.commands.executeCommand ( 'workbench.action.reloadWindow' );

}

/* EXPORT */

export {install};
