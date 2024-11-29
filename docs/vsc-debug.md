# How to debug Tuleap in Visual Studio Code

This guide is based on the [installation guide](./install.md).

## Prerequisites

Remote Debugging PHP in Visual Studio Code with XDebug:
1) Xdebug install is done when using the `nix-shell`build environment
2) Visual Studio Code (VSC)

## Install PHP Debug extension in VSC

**Start Visual Studio Code from the nix-shell development environment using the `code`command to ensure that all the build tools can be used!**

This will save also issues when committing code changes.

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
                "/usr/share/tuleap/": "${workspaceRoot}/",
            }
        }
    ]
```
* Save and close launch.json

## Setup XDebug configuration in Docker

* From nix-shell run `make bash-web`to open a shell in the Docker web container.
* Edit `/etc/opt/remi/php82/php.d/15-xdebug.ini` and include the changes below
* Set `xdebug.client_host` to the IP or host name of your machine where the IDE or debugging client is running, e.g. VSC.
* Make sure this host is reachable from within Docker shell.

```
# Enable xdebug extension module
zend_extension=xdebug.so

xdebug.log = /tmp/xdebug.log
xdebug.max_nesting_level=200

xdebug.var_display_max_depth=10
#xdebug.profiler_enable=1
xdebug.profiler_enable_trigger=1
xdebug.profiler_output_dir="/data/var/lib/cachegrind"
xdebug.profiler_output_name="cachegrind.out.%s.%r"

xdebug.remote_connect_back=1
xdebug.remote_enable=1

# By default the develop mode is disabled because it triggers
# major slowness on trackers
#xdebug.mode=debug,develop
xdebug.mode=debug
#xdebug.discover_client_host=1
xdebug.remote_autostart=1
xdebug.remote_enable=1
xdebug.remote_handler="dbgp"

xdebug.client_host = <YOUR IDE HOST IP>
xdebug.start_with_request = yes
xdebug.client_port = 9003
xdebug.client_mode="req"
xdebug.idekey="XDEBUG_VSC"
xdebug.extended_info=1
xdebug.cli_color=1
xdebug.connect_timeout_ms=500

xdebug.collect_params = 4
xdebug.collect_return = 1
xdebug.collect_vars = 1
xdebug.show_local_vars = 1
```

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