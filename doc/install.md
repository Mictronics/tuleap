- [How to build and install Tuleap](#how-to-build-and-install-tuleap)
  * [Clone Tuleap Sources](#clone-tuleap-sources)
  * [Installing Docker on Ubuntu](#installing-docker-on-ubuntu)
  * [Install Nix](#install-nix)
    + [Mandatory development dependencies](#mandatory-development-dependencies)
      - [Use Nix to retrieve the mandatory development dependencies](#use-nix-to-retrieve-the-mandatory-development-dependencies)
  * [Set additional environment variables](#set-additional-environment-variables)
  * [Build docker development environment](#build-docker-development-environment)
    + [Descriptions of commands](#descriptions-of-commands)
    + [Connect as Admin](#connect-as-admin)
  * [Build RPMs](#build-rpms)
  * [Installing RPMS on native (non-docker) system](#installing-rpms-on-native--non-docker--system)
    + [Requirements](#requirements)
    + [Install dependencies](#install-dependencies)
    + [Install Tuleap RPM packages](#install-tuleap-rpm-packages)
    + [Prepare the database](#prepare-the-database)
    + [Start nginx web server](#start-nginx-web-server)
    + [Setup Tuleap application](#setup-tuleap-application)
  * [First login](#first-login)
  * [Upgrade](#upgrade)
  * [Disclaimer](#disclaimer)

# How to build and install Tuleap

The general installation and build process follows the official Tuleap [developer guide](https://docs.tuleap.org/dev.html). In addition, some more details are added below.

Build and test environment (at the time this guide was written):

* Linux Mint 22 Wilma (base Ubuntu 24.04 noble)
* Docker v27.2
* Nix 2.18.5

A virtual machine environment requires at least 64GB of total disk size. A minimum of 10GB is used up during the build process and will increase when garbage collection is not running frequently.

AlmaLinux 9 was also tested as build environment.

## Clone Tuleap Sources

Clone Mictronics Tuleap sources:

``` bash
$ git clone https://github.com/Mictronics/tuleap.git tuleap
```

Or use the official Tuleap repository:

``` bash
$ git clone https://tuleap.net/plugins/git/tuleap/tuleap/stable.git tuleap
```

**The folder you are cloning into must be named `tuleap`.**

## Installing Docker on Ubuntu

Check the official Docker documentation: [Installation on Ubuntu](https://docs.docker.com/engine/install/ubuntu/).

The following shell code installs the regular docker (non-desktop) version.
```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  noble stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

# To install the latest version, run:
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Verify that the Docker Engine installation is successful by running the hello-world image.
sudo docker run hello-world

# Add your user to the docker group so you can run docker without permission issues.
sudo usermod -aG docker $USER

# Log out and log in again. (Alternatively log in to the new docker group or try to reboot):
newgrp docker

# Check if docker can be run without root
docker run hello-world
```

## Install Nix

### Mandatory development dependencies

To retrieve the mandatory development dependencies, use
[Nix](https://nixos.org/) and the `shell.nix` available in the sources.

#### Use Nix to retrieve the mandatory development dependencies

Tuleap uses [Nix](https://nixos.org/) for its build process and to share
an uniform configuration for its development environment. This is the
preferred way to get a development environment as it is expected to
always be up to date with Tuleap requirements.

Check the offical Nix documentation: [Install Nix](https://nixos.org/download.html)

Install Nix via the recommended multi-user installation:
```bash
sh <(curl -L https://nixos.org/nix/install) --daemon
```

It is recommended to browse the [Nix
documentation](https://nixos.org/manual/nix/unstable/introduction.html)
to understand the basics of how it works. At the very least you should
know [how to clean the unused
packages](https://nixos.org/manual/nix/unstable/command-ref/nix-collect-garbage.html) (`nix-collect-garbage`).

## Set additional environment variables

Set the following environment variables to create an enterprise build on Ubuntu.

Edit your users `~/.bashrc` and add:
```
export ENTERPRISE=1
export OS=el9
```
You may need to log out and log in again for this change to take apply.

## Build docker development environment

The entire build process will run inside a Nix environment. With a terminal go to sources you previously cloned and type `nix-shell`, you will be dropped in a shell with all the needed tools to develop on Tuleap.

``` bash
cd /path/to/tuleap
nix-shell
# Wait until the shell environment was created the the nix-shell prompt is returning. Then execute:
make composer
pnpm install
pnpm run build
make dev-setup
make start
make post-checkout
```
Docker will download base images for mysql, Tuleap etc. so please be patient!

Then you need to know the IP address of the web container, with `make show-ips` and edit (as root) the `/etc/hosts` file, add: `172.18.0.6      tuleap-web.tuleap-aio-dev.docker`

You may need to reboot for changes to take effect.

### Descriptions of commands

-   `make dev-setup`: This command generates some needed passwords
    (mysql,ldap, ...) and creates data containers. Those data containers are used as volumes to persist data (files, db, ...).

    **This command needs to be run only once.**

-   `make start`: This command is a wrapper around `docker-compose up`.
    It starts 3 containers: `web` for the front end, `ldap` to manage
    users in an OpenLDAP server, and `db` for the mysql server.

    You can issue the following command in order to check that all
    containers are started:

    ``` bash
    $ docker ps --format "{{.ID}}: {{.Names}} — {{.Image}} {{.Ports}}"
    cbf0274de3e3: tuleap-reverse-proxy-1 — tuleap-reverse-proxy 22/tcp, 80/tcp, 443/tcp
    a46df5954298: tuleap-web-1 — ghcr.io/enalean/tuleap-aio-dev:el9-php82 22/tcp, 80/tcp, 443/tcp
    4217788e42ef: tuleap-mailhog-1 — mailhog/mailhog 1025/tcp, 8025/tcp
    3be86a0ca0f3: tuleap-ldap-1 — ghcr.io/enalean/ldap 389/tcp, 636/tcp
    b301dc037a29: tuleap-db-1 — mysql:8.0 3306/tcp, 33060/tcp
    ```

-   `make post-checkout`: Install dependencies, generate the javascript
    and CSS files to be used by the browser, deploy gettext
    translation. **You need to run this command everytime you switch a
    branch.**

-   `make show-passwords`: Will show the passwords for Tuleap site admin
    (admin) and MySQL application user (tuleapadm).

-   `make show.ips`: Will show the IP's for the all docker containers.

Docker images are read-only, and every modification to the OS will be
lost at reboot. If you need to add/change anything and make it
persistant, fork and amend the [Dockerfile](https://hub.docker.com/r/enalean/tuleap-aio-dev/). Everything but the OS (tuleap config, database, user home) is saved in docker volumes held by `tuleap_data`.

### Connect as Admin

Now open your browser and go to <https://tuleap-web.tuleap-aio-dev.docker/>. You should see the homepage of your Tuleap instance. You can connect with `admin` account, the password will be given by `make show-passwords`.

## Build RPMs

Below is a guide how to build the RPM packages from Tuleap sources. Prerequisite is a successful setup the the development environment, especially Nix, but docker doesn't need to run to build the RPMs.

_(inside nix-shell environment)_:
```bash
# Only applicable for this repo branch, not [official] master:
# Create folder where RPMs will be stored
sudo mkdir -p /var/rpms/
sudo chmod 644 /var/rpms/

# Execution recommended before every build to clean up the build environment and keep used disk space low.
nix-collect-garbage

# Start RPM build process. Be patient that takes a while.
./tools/rpm/build_and_run_packages.sh --src-dir="$(pwd)"

# Building from this branch will store all created RPMs in /var/rpms/tuleap-<version>/
```

## Installing RPMS on native (non-docker) system

Installation has been tested on a fresh installed [AlmaLinux 9](https://almalinux.org/).

Check the official Tuleap [installation guide](https://docs.tuleap.org/installation-guide/step-by-step/introduction.html).

### Requirements

To install Tuleap you will need a fully dedicated server. It can be virtualized or physical. It is not recommended to install Tuleap on a server that hosts other applications. Tuleap provides a full suite of software and is deeply integrated with its host system. Installing Tuleap on a server shared with other applications will certainly cause problems in both Tuleap and your other applications.

Tuleap can be installed on the following Linux x86_64 systems:

    Enterprise Linux 9 (RHEL, Rocky, Alma Linux 9).

The server will need an Internet connection as it will download external packages.

### Install dependencies

```bash
# Install additional packages repositories
sudo dnf install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-9.noarch.rpm \
https://rpms.remirepo.net/enterprise/remi-release-9.rpm

# Install package dependencies
sudo dnf install -y git mysql-server redis \
highlight nginx perl-File-Copy perl-FindBin perl-JSON \
php82-php php82-php-common php82-php-ffi \
php82-php-gd php82-php-intl php82-php-mbstring php82-php-mysql php82-php-opcache \
php82-php-pecl-redis5 php82-php-pecl-zip php82-php-process php82-php-sodium php82-php-xml \
php82-php-pecl-mailparse php82-php-ldap

# Install en_US locale
# Required on a non-english language operating system
sudo dnf install -y glibc-locale-source glibc-langpack-en
```
You must disable SELinux prior to the install.

```bash
# Set SELINUX mode
sudo nano /etc/selinux/config
# set to
# SELINUX=permissive

sudo setenforce permissive
```

### Install Tuleap RPM packages

The RPM packages created in the build process must be installed following a specific order:

_build example v15.13.99.22_
```bash
sudo rpm -i tuleap-community-release.rpm
sudo rpm -i tuleap-smokescreen-15.13.99.22-1.1726142289.x86_64.rpm
sudo rpm -i tuleap-mercure-15.13.99.22-1.1726142289.x86_64.rpm
sudo rpm -i tuleap-node-20.15.1-1.1726142289.x86_64.rpm
sudo rpm -i tuleap-realtime-15.13.99.22-1.x86_64.rpm
sudo rpm -i tuleap-wasmtime-wrapper-lib-15.13.99.22-1.1726142289.x86_64.rpm
sudo rpm -i tuleap-git-bin-15.13.99.22-1.2.46.0.1726142289.x86_64.rpm
sudo rpm -i tuleap-gitolite3-15.13.99.22-1.3.6.13.1726142289.noarch.rpm
# The package collision warning for gitolite3 can be ignored
sudo rpm -i tuleap-mathoid-15.13.99.22-1.x86_64.rpm
sudo rpm -i python3-pygments-2.7.4-4.el9.noarch.rpm

sudo rpm -i tuleap-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-tracker-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-cardwall-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-agiledashboard-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-api-explorer-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-archivedeleteditems-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-botmattermost-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-botmattermost-agiledashboard-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-git-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-gitlfs-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-gitlab-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-botmattermost-git-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-bugzilla-reference-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-captcha-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-create-test-env-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-crosstracker-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-document-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-document_generation-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-pdftemplate-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-artidoc-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-dynamic-credentials-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-embed-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-enalean-licensemanager-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-frs-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-fts-common-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-fts-db-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-fts-meilisearch-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-graphontrackers-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-hudson-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-hudson-git-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-projectmilestones-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-jira-import-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-ldap-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-mytuleap-contact-support-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-oauth2-server-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-onlyoffice-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-openidconnectclient-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-program_management-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-project-ownership-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-prometheus-metrics-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-pullrequest-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-roadmap-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-securitytxt-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-taskboard-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-tee-container-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-testmanagement-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-testplan-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-timetracking-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-tracker-encryption-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-tracker-functions-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-velocity-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-webauthn-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-webdav-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-theme-burningparrot-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-theme-flamingparrot-15.13.99.22-1.el9.noarch.rpm

# Optional packages, install as required

# mediawiki
sudo dnf install -y ImageMagick dvipng texlive texlive-latex
sudo rpm -i php-mediawiki-tuleap-123-1.23.9-19.noarch.rpm
sudo rpm -i mediawiki-math-tuleap-1.23-2.1726142289.x86_64.rpm
sudo rpm -i mediawiki-tuleap-flavor-1.35-15.13.99.22-1.1.35.13.noarch.rpm
sudo rpm -i mediawiki-tuleap-flavor-current-lts-15.13.99.22-1.1.39.8.noarch.rpm
sudo rpm -i tuleap-plugin-mediawiki-standalone-15.13.99.22-1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-mediawiki-15.13.99.22-1.el9.noarch.rpm

# SVN support (built but installation not tested)
sudo dnf install -y mod_dav_svn sha1collisiondetection
sudo rpm -i viewvc-theme-tuleap-15.13.99.22-1.1726142289.noarch.rpm
sudo rpm -i viewvc-tuleap-1.3.0-1.1726142289.noarch.rpm
sudo rpm -i tuleap-core-subversion-1.2-15.13.99.22_1.el9.noarch.rpm
sudo rpm -i tuleap-plugin-svn-15.13.99.22-1.el9.noarch.rpm

# Meilisearch support (built but installation not tested)
sudo rpm -i tuleap-meilisearch-server-15.13.99.22-1.1726142289.x86_64.rpm
sudo rpm -i tuleap-plugin-fts-meilisearch-15.13.99.22-1.el9.noarch.rpm
```
### Prepare the database

```bash
# Create /etc/my.cnf.d/tuleap.cnf file
echo -e '[mysqld]\nsql-mode="NO_ENGINE_SUBSTITUTION"' > /etc/my.cnf.d/tuleap.cnf

# Activate mysql on boot
systemctl enable mysqld

# Start it
systemctl start mysqld

# Set the MYSQL root password
mysqladmin -u root password
```

### Start nginx web server
```bash
# Enable nginx service
sudo systemctl enable nginx
sudo systemctl start nginx
```

### Setup Tuleap application
```bash
# As root run
sudo /usr/share/tuleap/tools/setup.sh \
  --configure \
  --server-name=FQDN \
  --mysql-server=localhost \
  --mysql-password=<mysql root password>
```

`FQDN` being the name of the server as you access it on your network (localhost for a local test, tuleap.example.com with a DNS entry 192.168.1.123 if you only have an IP address)

`<mysql root password>` being the password of root password of the db configured earlier.

Ensure the firewall is properly configured. Open needed ports:
* Web (TCP/80 & TCP/443)
* SSH (git, admin): TCP/22

Please follow the [official installation guide](https://docs.tuleap.org/installation-guide/step-by-step/tls-configuration.html) for TLS, Email and Redis configuration.

**Reboot prior first connection to local server**

## First login

First login passwords are located in `/root/.tuleap_passwd`.
```bash
sudo cat /root/.tuleap_passwd
```

In browser open the FQDN given before or on the local server `https://localhost`.

_Enjoy Tuleap on your server!_

## Upgrade

You should always read the [deployment guide](https://docs.tuleap.org/deploy.html) instructions before upgrading.

Run as root:
```bash
# Stop service
systemctl stop tuleap nginx httpd

# Upgrade packages either from new build or repository
dnf update

# Deploy site configurations, run database migration & co
tuleap-cfg site-deploy

# Restart service
systemctl start tuleap nginx httpd
```
## Disclaimer
I am not affiliated, associated, authorized, endorsed by, or in any way officially connected with the [Tuleap project](https://www.tuleap.org/).
