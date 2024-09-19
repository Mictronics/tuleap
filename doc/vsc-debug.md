# How to debug Tuleap in Visual Studio Code

This guide is based on the [installation guide](./install.md).

## Prerequisites

Remote Debugging PHP in Visual Studio Code with XDebug:
1) Xdebug install is done when using the `nix-shell`build environment
2) Visual Studio Code (VSC)

## Install PHP Debug extension in VSC

* Open vscode
* Goto the extensions tab (the last icon on the left pane)
* Search for _PHP Debug_ (Publisher XDebug)
* Click install
* Click the debug icon in VSC left pane

## Setup XDebug listener in VSC

* Click the gear-icon next to _Listen for XDebud_ in VSC left debugging  pane
* Change the “Listen for XDebug” section to:

```JSON
    "configurations": [
        {
            "name": "Listen for Xdebug",
            "type": "php",
            "request": "launch",
            "port": 9003,
            "stopOnEntry": true,
            "pathMappings": {
                "/usr/share/tuleap/src/www/": "${workspaceRoot}/src/www/",
            }
        }
    ]
```
* Save and close launch.json

## Install browser extension

Install the easy-xdebug extension in your browser.

* Firefox

    Xdebug Helper is the best solution I have found for firefox – simply install the extension from [here](https://addons.mozilla.org/en-US/firefox/addon/xdebug-helper-for-firefox/), navigate to the site you want to debug, and click the little green bug, select debug and reload your page to open in your editors debugger.

* Chrome

    Xdebug Helper is the best solution I have found for chrome – simply install the extension from [here](https://chrome.google.com/webstore/detail/xdebug-helper/eadndfjplgieldjbigjakmdgkmoaaaoc?hl=en), navigate to the site you want to debug, and click the little green bug, select debug and reload your page to open in your editors debugger.

## Initiating a remote debug session:

In VSC left debugging pane click the _play_ icon (or press F5) to start the debugging session.

In browser, navigate to the site you want to debug, and click the little green bug, select debug and reload your page to open in your editors debugger.

In VSC the debugger should now halt at the entry breakpoint in `/tuleap/src/www/index.php`.

To avoid that the debugger stop on entry set `"stopOnEntry": false,` in launch.json.

Credits: based on [Jonathan's Blog post](https://jonathansblog.co.uk/remote-debugging-php-in-visual-studio-code-with-xdebug)