
/* IMPORT */

import * as vscode from 'vscode';
import Messages from './messages';
import Utils from './utils';

/* COMMANDS */

async function install ( file: vscode.Uri ) {

  if ( !file || !file.fsPath ) return;

  /* TERMINAL */

  const term = vscode.window.createTerminal ( 'VSIX' ),
        command = Utils.isInsiders () ? 'code-insiders' :
                  Utils.isExploration () ? 'code-exploration' : 'code';

  await term.processId;
  await Utils.delay ( 200 );

  term.sendText ( `${command} --install-extension "${file.fsPath}"` );
  term.sendText ( `echo 'Installation ended'` );

  term.show ( false );

  /* MESSAGES */

  Messages.installing ();

  if ( term['onDidWriteData'] ) {

    term['onDidWriteData'] ( data => {

      if ( data.includes ( 'was successfully installed!' ) ) {

        Messages.success ();

        term.dispose ();

      } else if ( data.includes ( 'Installation ended' ) && !data.includes ( 'echo' ) ) {

        Messages.error ();

      }

    });

  }

}

/* EXPORT */

export {install};
