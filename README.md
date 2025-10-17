<img style="position:relative;margin:0px;padding:0;top:40px" src="https://avatars.githubusercontent.com/u/29326763?s=200&v=4" width="64"/>

<h1 style="margin-top:0px;padding-top:0px">The Cuarzo Framework</h1>

This repository serves as a centralized system for building the Cuarzo framework, ensuring version compatibility across its subprojects.

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
