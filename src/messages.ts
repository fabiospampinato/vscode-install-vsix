
/* IMPORT */

import * as vscode from 'vscode';

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

  error () {

    vscode.window.showWarningMessage ( 'The extension was not installed correctly. Please check the terminal for more informations.' );

  }

};

/* EXPORT */

export default Messages;
