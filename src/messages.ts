
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
      'Installation failed, would you force installation. You can go to the extensions settings to force all installation.',
      { title: 'Yes' }, { title: 'No' }
    );

    if ( !option || option.title === 'No' ) {
      return;
    }
	
	vscode.commands.executeCommand( 'installVSIX.install', file, true );

  },

  error () {

    vscode.window.showWarningMessage ( 'The extension was not installed correctly. Please check the terminal for more informations.' );

  }

};

/* EXPORT */

export default Messages;
