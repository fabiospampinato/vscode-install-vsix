
/* IMPORT */

import * as vscode from 'vscode';
import Utils from './utils';

/* MESSAGES */

const Messages = {

  installing () {

    vscode.window.showInformationMessage ( 'Installing extension...' );

  },

  async success () {

    const option = await vscode.window.showInformationMessage ( 'Extension intalled, a reload is needed.', { title: 'Reload' } );

    if ( !option || option.title !== 'Reload' ) return;

    vscode.commands.executeCommand ( 'workbench.action.reloadWindow' );

  },

  async retry ( file: vscode.Uri ) {
    const option = await vscode.window.showWarningMessage (
      'Installation failed, would you force installation.',
      { title: 'This time' },
      { title: 'Always' }
    );

    if ( !option ) {
      return;
    } else if ( option.title === 'This time' ) {
      vscode.commands.executeCommand( 'installVSIX.install', file, true );
    } else if ( option.title === 'Always' ) {
      await Utils.setInstallationForced ( true );

      vscode.commands.executeCommand ( 'installVSIX.install', file );
    }
  },

  error () {

    vscode.window.showWarningMessage ( 'The extension was not installed correctly. Please check the terminal for more informations.' );

  }

};

/* EXPORT */

export default Messages;
