
/* IMPORT */

import * as vscode from 'vscode';
import Messages from './messages';
import Utils from './utils';

/* COMMANDS */

async function install ( file: vscode.Uri, args: Array<any> | boolean ) {

  if ( !file || !file.fsPath ) return;

  let force =
    (Array.isArray(args) ? false : args) || Utils.isInstallationForced();

  /* TERMINAL */

  const term = vscode.window.createTerminal ( 'VSIX' ),
        command = Utils.isInsiders () ? 'code-insiders' : ( Utils.isExploration () ? 'code-exploration' : 'code' );

  await term.processId;
  await Utils.delay ( 200 );

  /* MESSAGES */

  Messages.installing ();

  if ( term['onDidWriteData'] ) {

    term['onDidWriteData'] ( data => {

      if ( data.includes ( 'was successfully installed!' ) ) {

        Messages.success ();

        term.dispose ();

      } else if ( data.includes( `Use '--force'` ) ) {
        Messages.retry ( file );

        term.dispose ();
      } else if ( data.includes ( 'Installation ended' ) && !data.includes ( 'echo' ) ) {

        Messages.error ();

      }

    });
  }

  term.sendText ( `${command} --install-extension "${file.fsPath}" ${force ? "--force" : ""}` );
  term.sendText ( `echo 'Installation ended'` );

  term.show ( false );
}

/* EXPORT */

export {install};
