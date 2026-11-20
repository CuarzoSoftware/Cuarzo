# Building {#building_page}

The [Cuarzo repository](https://github.com/CuarzoSoftware/Cuarzo) builds every library and
application of the framework together, with versions known to work with each other. The
libraries are Meson subprojects in `subprojects/`.

## Dependencies

### Fedora

```bash
$ sudo dnf install git meson ninja-build gcc gcc-c++ pkgconf-pkg-config cmake glslc \
    boost-devel libglvnd-devel mesa-libgbm-devel libdrm-devel vulkan-loader-devel \
    wayland-devel wayland-protocols-devel libinput-devel libseat-devel systemd-devel \
    libxkbcommon-devel libXcursor-devel libdisplay-info-devel \
    harfbuzz-devel libicu-devel fontconfig-devel freetype-devel zlib-ng-compat-devel \
    libpng-devel libwebp-devel libjpeg-turbo-devel libepoxy-devel spirv-tools-devel expat-devel \
    pipewire-devel qt6-qtbase-devel qt6-qtbase-private-devel pam-devel
```

### Debian (trixie)

```bash
$ sudo apt install git meson ninja-build build-essential pkgconf cmake glslc \
    libboost-dev libboost-container-dev libegl-dev libgl-dev libgles-dev libgbm-dev libdrm-dev libvulkan-dev \
    libwayland-dev wayland-protocols libinput-dev libseat-dev libudev-dev libsystemd-dev \
    libxkbcommon-dev libxcursor-dev libdisplay-info-dev \
    libharfbuzz-dev libicu-dev libfontconfig-dev libfreetype-dev zlib1g-dev \
    libpng-dev libwebp-dev libjpeg-dev libepoxy-dev spirv-tools libexpat1-dev \
    libpipewire-0.3-dev qt6-base-dev qt6-base-private-dev libpam0g-dev
```

### Yoga

[Yoga 3.2.1](https://github.com/facebook/yoga/releases/tag/v3.2.1) (used by @ref module_kay)
isn't packaged by these distributions; build and install it from source:

```bash
$ git clone --branch v3.2.1 --depth 1 https://github.com/facebook/yoga.git
$ cd yoga
$ cmake -S . -B build -DCMAKE_BUILD_TYPE=Release -DBUILD_SHARED_LIBS=ON
$ cmake --build build -j $(nproc)
$ sudo cmake --install build
```

## Build and install

```bash
$ git clone --recurse-submodules https://github.com/CuarzoSoftware/Cuarzo.git
$ cd Cuarzo
$ meson setup builddir -Dbuildtype=release --wrap-mode=forcefallback
$ cd builddir
$ meson compile -j $(nproc)
$ sudo meson install
```

Subprojects can be left out with their `with_*` options (see `meson_options.txt`), e.g.
`-Dwith_qtcuarzo=false`. Enabling a library also enables the libraries it depends on.

## This documentation

The documentation is generated with [Doxygen](https://www.doxygen.nl) (and Graphviz for the
diagrams) from the headers of every library:

```bash
$ meson compile -C builddir docs   # Output in builddir/docs/html
```

or, without a build directory:

```bash
$ doxygen/gen-docs.sh              # Output in docs/html
```
