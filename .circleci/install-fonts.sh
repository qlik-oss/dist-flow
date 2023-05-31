#!/bin/bash

set -euo pipefail

sudo apt install cabextract
sudo wget https://www.freedesktop.org/software/fontconfig/webfonts/webfonts.tar.gz
sudo tar -xzf webfonts.tar.gz
cd msfonts/
sudo cabextract *.exe
sudo cp *.ttf *.TTF /usr/share/fonts/
fc-list