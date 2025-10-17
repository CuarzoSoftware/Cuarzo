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

### Build

```bash
$ git clone --recurse-submodules https://github.com/CuarzoSoftware/Cuarzo.git
$ cd Cuarzo
$ meson setup builddir -Dbuildtype=release
$ cd builddir
$ meson compile -j $(nproc)
$ meson install
```

### Uninstall

```bash
$ cd builddir
$ sudo ninja uninstall
```
