
/* IMPORT */

import * as _ from 'lodash';
import * as vscode from 'vscode';
import * as Commands from './commands';

/* UTILS */

const Utils = {

  initCommands ( context: vscode.ExtensionContext ) {

    const {commands} = vscode.extensions.getExtension ( 'fabiospampinato.vscode-install-vsix' ).packageJSON.contributes;

    commands.forEach ( ({ command, title }) => {

      const commandName = _.last ( command.split ( '.' ) ) as string,
            handler = Commands[commandName],
            disposable = vscode.commands.registerCommand ( command, handler );

      context.subscriptions.push ( disposable );

    });

    return Commands;

  },

  delay ( ms ) {

    return new Promise ( resolve => setTimeout ( resolve, ms ) );

  },

  isInsiders () {

    return !!vscode.env.appName.match ( /insiders/i );

  },

  isExploration () {

    return /exploration/i.test ( vscode.env.appName );

  },

  isInstallationForced() {
    return vscode.workspace
      .getConfiguration()
      .get("installVSIX.force");
  }

};

/* EXPORT */

export default Utils;
