# The Cuarzo Framework {#mainpage}

<div class="cz-hero">
<img class="cz-hero-logo" src="CuarzoLogo.png" alt=""/>
<div class="cz-hero-title">The Cuarzo Framework</div>
<div class="cz-hero-lead">C++ libraries for building Linux desktops: Wayland compositors, Wayland applications and the components of a desktop session (panels, docks, menus, lock screens). They share one core and one graphics stack, so they can be used together or on their own.</div>
<div class="cz-buttons">
<a class="cz-primary" href="building_page.html">Get started</a>
<a href="topics.html">Browse modules</a>
<a href="annotated.html">All classes</a>
</div>
</div>

## Modules

<div class="cz-module-grid">
<div class="cz-card cz-green"><div class="cz-card-title">@ref module_core</div><div class="cz-card-text">Event loop, objects and signals, input events, timers, animations and logging shared by every library.</div><span class="cz-pkg">cz-core</span></div>
<div class="cz-card cz-blue"><div class="cz-card-title">@ref module_ream</div><div class="cz-card-text">GPU buffer allocation, DMA-buf sharing between devices and a portable painter over OpenGL ES, Vulkan and raster.</div><span class="cz-pkg">cz-ream</span></div>
<div class="cz-card cz-purple"><div class="cz-card-title">@ref module_srm</div><div class="cz-card-text">DRM/KMS display output with multi-GPU support.</div><span class="cz-pkg">cz-srm</span></div>
<div class="cz-card cz-red"><div class="cz-card-title">@ref module_louvre</div><div class="cz-card-text">Library for building Wayland compositors.</div><span class="cz-pkg">cz-louvre</span></div>
<div class="cz-card cz-orange"><div class="cz-card-title">@ref module_kay</div><div class="cz-card-text">GPU-accelerated GUI toolkit: a scene of nodes laid out with Yoga and drawn with Skia or Ream.</div><span class="cz-pkg">cz-kay</span></div>
<div class="cz-card cz-green"><div class="cz-card-title">@ref module_marco</div><div class="cz-card-text">Library for building Wayland applications with Kay.</div><span class="cz-pkg">cz-marco</span></div>
<div class="cz-card cz-blue"><div class="cz-card-title">@ref module_xdgkit</div><div class="cz-card-text">XDG specifications: icon themes, desktop entries, MIME types and the trash.</div><span class="cz-pkg">cz-xdgkit</span></div>
<div class="cz-card cz-orange"><div class="cz-card-title">@ref module_services</div><div class="cz-card-text">Clients of the system services a desktop needs: Wi-Fi, audio, battery, media players and notifications.</div><span class="cz-pkg">cz-services</span></div>
<div class="cz-card cz-purple"><div class="cz-card-title">@ref module_heaven</div><div class="cz-card-text">Global menus for Wayland sessions over D-Bus.</div><span class="cz-pkg">cz-heaven-*</span></div>
<div class="cz-card cz-red"><div class="cz-card-title">@ref module_asset_broker</div><div class="cz-card-text">Icon and image loading shared between apps as DMA-bufs.</div><span class="cz-pkg">cz-asset-broker</span></div>
</div>

## Architecture

Each module depends only on the modules below it. Compositors are built with
@ref module_louvre, applications with @ref module_marco and @ref module_kay.

@dot
digraph modules {
    rankdir=BT;
    bgcolor="transparent";
    node [shape=box, style="rounded,filled", fillcolor="#eef2fb", color="#3c64b4", fontname="Helvetica", fontsize=11, margin="0.25,0.08"];
    edge [color="#8a94a6", arrowsize=0.7];

    skia   [label="Skia", fillcolor="#f2f2f2", color="#a0a0a0", URL="https://skia.org"];
    core   [label="Core",        URL="\ref module_core"];
    ream   [label="Ream",        URL="\ref module_ream"];
    srm    [label="SRM",         URL="\ref module_srm"];
    louvre [label="Louvre",      URL="\ref module_louvre"];
    xdg    [label="XDGKit",      URL="\ref module_xdgkit"];
    svc    [label="Services",    URL="\ref module_services"];
    ab     [label="AssetBroker", URL="\ref module_asset_broker"];
    kay    [label="Kay",         URL="\ref module_kay"];
    marco  [label="Marco",       URL="\ref module_marco"];
    heaven [label="Heaven",      URL="\ref module_heaven"];

    core -> skia;
    ream -> core;
    srm -> ream;
    louvre -> srm;
    xdg -> core;
    svc -> core;
    ab -> ream; ab -> xdg;
    kay -> ab;
    marco -> kay; marco -> xdg;
    heaven -> core;

    { rank=same; louvre; marco; heaven; }
}
@enddot

## Built with Cuarzo

The Cuarzo desktop is made of these projects, built and installed together with the framework
(see @ref building_page):

| Project | What it is | Built with |
|---------|------------|------------|
| [Crystals](https://github.com/CuarzoSoftware/Crystals) | Wayland compositor | @ref module_louvre |
| [Desk](https://github.com/CuarzoSoftware/Desk) | Desktop background and icons | @ref module_marco |
| [Shelf](https://github.com/CuarzoSoftware/Shelf) | Dock | @ref module_marco |
| [Firmament](https://github.com/CuarzoSoftware/Firmament) | Global menu bar and control panel | @ref module_marco, @ref module_heaven |
| [Doorman](https://github.com/CuarzoSoftware/Doorman) | Lock screen | @ref module_marco |
| [Settings](https://github.com/CuarzoSoftware/Settings) | System Settings app | @ref module_marco |
| [xdg-desktop-portal-cz](https://github.com/CuarzoSoftware/xdg-desktop-portal-cz) | xdg-desktop-portal backend (screen casting) | @ref module_core |
| [QtCuarzo](https://github.com/CuarzoSoftware/QtCuarzo) | Qt platform theme (global menus, theme) | @ref module_heaven |

## Using the libraries

Each library installs a pkg-config file and its headers under `<prefix>/include/CZ`. Headers
are included by their path, e.g. `#include <CZ/Louvre/LCompositor.h>`, and every class lives
in the `CZ` namespace.

With Meson:

```meson
cz_louvre_dep = dependency('cz-louvre')
executable('my-compositor', 'main.cpp', dependencies: cz_louvre_dep)
```

Or with pkg-config directly:

```bash
$ g++ -std=c++20 main.cpp $(pkg-config --cflags --libs cz-marco) -o my-app
```

See @ref building_page to build and install the framework, and @ref environment_page for the
environment variables the libraries read.
