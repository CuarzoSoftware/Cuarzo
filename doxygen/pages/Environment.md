# Environment Variables {#environment_page}

Environment variables read by the libraries of the framework, by module.

## Logging

Every library has its own log level. Each accepts an integer, from least to most verbose:
`0` Silent, `1` Fatal, `2` Error, `3` Warning, `4` Info, `5` Debug, `6` Trace. Unset, it's `2`
(errors only).

| Variable | Module |
|---|---|
| `CZ_CORE_LOG_LEVEL` | @ref module_core |
| `CZ_REAM_LOG_LEVEL` | @ref module_ream |
| `CZ_REAM_EGL_LOG_LEVEL` | @ref module_ream (OpenGL/EGL backend) |
| `CZ_REAM_VK_LOG_LEVEL` | @ref module_ream (Vulkan backend; when raised, also enables the Vulkan validation layers if installed) |
| `CZ_SRM_LOG_LEVEL` | @ref module_srm |
| `CZ_LOUVRE_LOG_LEVEL` | @ref module_louvre |
| `CZ_KAY_LOG_LEVEL` | @ref module_kay |
| `CZ_MARCO_LOG_LEVEL` | @ref module_marco |
| `CZ_XDGKIT_LOG_LEVEL` | @ref module_xdgkit |
| `CZ_HEAVEN_BAR_LOG_LEVEL`, `CZ_HEAVEN_CLIENT_LOG_LEVEL`, `CZ_HEAVEN_COMPOSITOR_LOG_LEVEL` | @ref module_heaven |
| `CZ_ASSET_BROKER_LOG_LEVEL` | @ref module_asset_broker |

## Ream

| Variable | Description |
|---|---|
| `CZ_REAM_GAPI` | Graphics API used when @ref CZ::RCore "RCore" is created with `RGraphicsAPI::Auto`: `GL` (OpenGL), `VK` (Vulkan) or `RS` (raster). |
| `CZ_REAM_VK_ALLOW_CPU` | `1` allows CPU/software Vulkan devices (e.g. llvmpipe), for testing and headless setups. |
| `CZ_REAM_VK_SYNC_SUBMIT` | `1` makes the Vulkan painter submit commands synchronously, for debugging and performance comparisons. |

## SRM

| Variable | Description |
|---|---|
| `CZ_SRM_BUFFERING` | Swapchain images per connector: `2` (default) waits for each page flip after committing, `3` renders the next frame while a flip is pending, `1` renders into the image being scanned out (tearing). |
| `CZ_SRM_DEVICE_BLACKLIST` | Colon-separated DRM device nodes to ignore, e.g. `/dev/dri/card0:/dev/dri/card1`. |
| `CZ_SRM_DISABLE_DIRECT_SCANOUT` | `1` disables direct scanout. |
| `CZ_SRM_DISABLE_CURSOR` | `1` disables cursor planes. |
| `CZ_SRM_FORCE_LEGACY_CURSOR` | `1` uses the legacy cursor ioctls. |
| `CZ_SRM_FORCE_LEGACY_API` | `1` uses the legacy DRM API instead of the atomic API. |
| `CZ_SRM_IN_FENCE_FD` | `0` stops passing render fences to the primary plane (`IN_FENCE_FD`). Enabled by default. |
| `CZ_SRM_ENABLE_WRITEBACK_CONNECTORS` | `1` exposes writeback connectors. |
| `CZ_SRM_ENABLE_STEREO_3D` | `1` enables stereo 3D modes. |

## Louvre

| Variable | Description |
|---|---|
| `CZ_LOUVRE_WAYLAND_DISPLAY` | Name of the Wayland socket clients connect to. |
| `WAYLAND_DISPLAY` | When set before launching the compositor, Louvre runs nested with its Wayland backend. |
| `CZ_LOUVRE_ENABLE_LIBSEAT` | `0` disables [libseat](https://github.com/kennylevinsen/seatd) (no multi-session support); allows launching from SSH, which is useful to debug the DRM backend. |
| `CZ_LOUVRE_FREEZE_WATCHDOG_MS` | Debugging: dumps the stacks of the compositor's threads when the main loop is blocked longer than this many milliseconds. |
| `XKB_DEFAULT_RULES`, `XKB_DEFAULT_MODEL`, `XKB_DEFAULT_LAYOUT`, `XKB_DEFAULT_VARIANT`, `XKB_DEFAULT_OPTIONS` | Default keymap when the compositor doesn't set one with @ref CZ::LKeyboard "LKeyboard" (see the [xkbcommon documentation](https://xkbcommon.org/doc/current/structxkb__rule__names.html)). |

## Kay and Marco

| Variable | Description |
|---|---|
| `CZ_AK_BLUR_DEBUG` | Debugging flags for Kay's background blur effect. |
| `CZ_MARCO_FREEZE_WATCHDOG_MS` | Debugging: dumps the stacks of the app's threads when the main loop is blocked longer than this many milliseconds. |

## XDGKit

@ref CZ::XDGKit "XDGKit" follows the XDG base directory variables (`XDG_DATA_HOME`, `XDG_DATA_DIRS`,
`XDG_CONFIG_DIRS`) and `XDG_CURRENT_DESKTOP` for desktop entries.

## AssetBroker

| Variable | Default | Description |
|---|---|---|
| `CZ_ASSET_BROKER_MODE` | | Forces the mode of apps: `auto`, `local` or `remote`. |
| `CZ_ASSET_BROKER_SOCKET` | `$XDG_RUNTIME_DIR/cz-asset-broker` | Socket path. |
| `CZ_ASSET_BROKER_GRACE_MS` | `3000` | How long apps keep released images. |
| `CZ_ASSET_BROKER_SERVER_GRACE_MS` | `10000` | How long the service keeps unused assets. |
| `CZ_ASSET_BROKER_TIMEOUT_MS` | `2000` | How long apps wait for a reply. |
