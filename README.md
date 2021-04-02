> This repo is now archived because the feature it provides is now implemented by vscode itself.

# Install .VSIX

<p align="center">
  <img src="https://raw.githubusercontent.com/fabiospampinato/vscode-install-vsix/master/resources/logo.png" width="128" alt="Logo">
</p>

Install .vsix extensions right from the explorer, with a right click.

## Install

Follow the instructions in the [Marketplace](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-install-vsix), or run the following in the command palette:

```shell
ext install fabiospampinato.vscode-install-vsix
```

## Usage

Right click a .vsix file from the explorer and select `Install Extension`:

![Demo](resources/demo.png)

## Settings

```js
{
  "installVSIX.force": false // Always use the '--force' option to force installation
}
```

## Contributing

If you found a problem, or have a feature request, please open an [issue](https://github.com/fabiospampinato/vscode-install-vsix/issues) about it.

If you want to make a pull request you can debug the extension using [Debug Launcher](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-debug-launcher).

## License

MIT © Fabio Spampinato
