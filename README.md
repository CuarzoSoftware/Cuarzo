<img style="position:relative;margin:0px;padding:0;top:68px" src="https://avatars.githubusercontent.com/u/29326763?s=200&v=4" width="84"/>

<h1 style="margin-top:0px;padding-top:0px">The Cuarzo Framework</h1>

<p align="left">
  <a href="https://github.com/CuarzoSoftware/Cuarzo/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-LGPLv2.1-blue.svg" alt="Cuarzo is released under the LGPLv2.1 license." />
  </a>
  <a href="https://github.com/CuarzoSoftware/Cuarzo">
    <img src="https://img.shields.io/badge/version-0.1.0-brightgreen" alt="Current Cuarzo version." />
  </a>
</p>

This repository serves as a centralized place for building the Cuarzo framework, ensuring version compatibility across its subprojects.

### Links

- 📖 [C++ API Documentation](https://cuarzosoftware.github.io/Cuarzo/)
- 🧩 [Modules](https://cuarzosoftware.github.io/Cuarzo/topics.html)
- 🧭 [Guides](https://cuarzosoftware.github.io/Cuarzo/pages.html)
- ⚙️ [Environment variables](https://cuarzosoftware.github.io/Cuarzo/environment_page.html)

### Projects

- 📚 [Skia](https://github.com/CuarzoSoftware/Skia) (library): Skia, built with Meson
- 📚 [Core](https://github.com/CuarzoSoftware/Core) (library): event loop, objects, signals and utilities shared by every project
- 📚 [Ream](https://github.com/CuarzoSoftware/Ream) (library): GPU buffers and rendering
- 📚 [SRM](https://github.com/CuarzoSoftware/SRM) (library): DRM/KMS display output
- 📚 [Louvre](https://github.com/CuarzoSoftware/Louvre) (library): Wayland compositors
- 📚 [XDGKit](https://github.com/CuarzoSoftware/XDGKit) (library): XDG icon themes, desktop entries and MIME types
- 📚 [Services](https://github.com/CuarzoSoftware/Services) (library): clients of the system services a desktop needs (Wi-Fi, audio, battery, media players)
- 📚 [AssetBroker](https://github.com/CuarzoSoftware/AssetBroker) (library and service): icons and images shared between apps
- 📚 [Kay](https://github.com/CuarzoSoftware/Kay) (library): GUI toolkit
- 📚 [Marco](https://github.com/CuarzoSoftware/Marco) (library): Wayland applications
- 📚 [Heaven](https://github.com/CuarzoSoftware/Heaven) (library): global menus
- 🚀 [Crystals](https://github.com/CuarzoSoftware/Crystals) (Wayland compositor)
- 🚀 [Desk](https://github.com/CuarzoSoftware/Desk) (desktop background and icons)
- 🚀 [Shelf](https://github.com/CuarzoSoftware/Shelf) (dock)
- 🚀 [Firmament](https://github.com/CuarzoSoftware/Firmament) (global menu bar)
- 🚀 [Doorman](https://github.com/CuarzoSoftware/Doorman) (lock screen)
- 🚀 [Settings](https://github.com/CuarzoSoftware/Settings) (System Settings app)
- 🚀 [Gazette](https://github.com/CuarzoSoftware/Gazette) (notifications: banners and notification center)
- 🚀 [xdg-desktop-portal-cz](https://github.com/CuarzoSoftware/xdg-desktop-portal-cz) (xdg-desktop-portal backend)
- 🚀 [QtCuarzo](https://github.com/CuarzoSoftware/QtCuarzo) (Qt platform theme)

### Dependencies

#### Fedora

```bash
$ sudo dnf install git meson ninja-build gcc gcc-c++ pkgconf-pkg-config cmake glslc \
    boost-devel libglvnd-devel mesa-libgbm-devel libdrm-devel vulkan-loader-devel \
    wayland-devel wayland-protocols-devel libinput-devel libseat-devel systemd-devel \
    libxkbcommon-devel libXcursor-devel libdisplay-info-devel \
    harfbuzz-devel libicu-devel fontconfig-devel freetype-devel zlib-ng-compat-devel \
    libpng-devel libwebp-devel libjpeg-turbo-devel libepoxy-devel spirv-tools-devel expat-devel \
    pipewire-devel qt6-qtbase-devel qt6-qtbase-private-devel pam-devel
```

#### Debian (trixie)

```bash
$ sudo apt install git meson ninja-build build-essential pkgconf cmake glslc \
    libboost-dev libboost-container-dev libegl-dev libgl-dev libgles-dev libgbm-dev libdrm-dev libvulkan-dev \
    libwayland-dev wayland-protocols libinput-dev libseat-dev libudev-dev libsystemd-dev \
    libxkbcommon-dev libxcursor-dev libdisplay-info-dev \
    libharfbuzz-dev libicu-dev libfontconfig-dev libfreetype-dev zlib1g-dev \
    libpng-dev libwebp-dev libjpeg-dev libepoxy-dev spirv-tools libexpat1-dev \
    libpipewire-0.3-dev qt6-base-dev qt6-base-private-dev libpam0g-dev
```

#### Yoga

[Yoga 3.2.1](https://github.com/facebook/yoga/releases/tag/v3.2.1) isn't packaged by these distributions, build and install it from source as a shared library, with optimizations:

```bash
$ git clone --branch v3.2.1 --depth 1 https://github.com/facebook/yoga.git
$ cd yoga
$ sed -i 's/add_library(yogacore STATIC/add_library(yogacore SHARED/' yoga/CMakeLists.txt
$ sed -i '/add_subdirectory(tests)/d' CMakeLists.txt
$ cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
$ cmake --build build -j $(nproc)
$ sudo cmake --install build
```

Yoga's CMake project always builds a static library (`BUILD_SHARED_LIBS` has no effect), so the first `sed` makes it shared; the second one leaves out its tests, which would otherwise install GoogleTest too. Don't skip `-DCMAKE_BUILD_TYPE=Release`: without it Yoga is built without optimizations and layout becomes the main cost of every frame (e.g. while resizing a window).

Screen casting in xdg-desktop-portal-cz (PipeWire) and cz-doorman-lock (PAM) are only built if their dependencies are found. Subprojects can be disabled with their `with_*` options (see `meson_options.txt`), e.g. `-Dwith_qtcuarzo=false` to build without Qt.

### Build

```bash
$ git clone --recurse-submodules https://github.com/CuarzoSoftware/Cuarzo.git
$ cd Cuarzo
$ meson setup builddir -Dbuildtype=release --wrap-mode=forcefallback
$ cd builddir
$ meson compile -j $(nproc)
$ sudo meson install
```

### Documentation

To generate the [C++ API Documentation](#links) locally (it requires [Doxygen](https://www.doxygen.nl) and Graphviz):

```bash
$ meson compile -C builddir docs   # Output in builddir/docs/html
```

Or without a build directory: `doxygen/gen-docs.sh` (output in `docs/html`).

### Recommended

Cuarzo's apps use the [WhiteSur](https://github.com/vinceliuice/WhiteSur-icon-theme) icon theme (`WhiteSur` and `WhiteSur-light`). Install it system-wide, then index the icon themes with XDGKit's indexer (installed with Cuarzo), which Cuarzo's apps use to find icons quickly. Run the indexer again after installing or updating icon themes.

```bash
$ git clone --depth 1 https://github.com/vinceliuice/WhiteSur-icon-theme.git
$ cd WhiteSur-icon-theme
$ sudo ./install.sh
$ sudo cz-xdgkit-icon-theme-indexer
```

An emoji font, for emojis in text:

```bash
$ sudo dnf install google-noto-color-emoji-fonts   # Fedora
$ sudo apt install fonts-noto-color-emoji          # Debian
```

### Uninstall

```bash
$ cd builddir
$ sudo ninja uninstall
```
