project(
    'Cuarzo',
    'c', 'cpp',
    version : '0.1.0',
    meson_version: '>= 0.60.0',
    default_options: [
        'warning_level=2',
        'cpp_std=c++20'
    ]
)

crystals_op     = get_option('with_crystals')
firmament_op    = get_option('with_firmament')
shelf_op        = get_option('with_shelf')
desk_op         = get_option('with_desk')
qtcuarzo_op     = get_option('with_qtcuarzo')
portal_op       = get_option('with_portal')
doorman_op      = get_option('with_doorman')
settings_op     = get_option('with_settings')
gazette_op      = get_option('with_gazette')
marco_op        = get_option('with_marco') or firmament_op or shelf_op or desk_op or doorman_op or settings_op or gazette_op
heaven_op       = get_option('with_heaven') or firmament_op or desk_op or qtcuarzo_op
kay_op          = get_option('with_kay') or marco_op
asset_broker_op = get_option('with_asset_broker') or shelf_op or desk_op or firmament_op or gazette_op or kay_op
xdgkit_op       = get_option('with_xdgkit') or marco_op or doorman_op or asset_broker_op
louvre_op       = get_option('with_louvre') or crystals_op
srm_op          = get_option('with_srm') or louvre_op
ream_op         = get_option('with_ream') or srm_op or kay_op or asset_broker_op
core_op         = get_option('with_core') or ream_op or xdgkit_op or heaven_op or portal_op
skia_op         = get_option('with_skia') or core_op

if skia_op
    cz_skia_proj     = subproject('cz-skia')
endif

if core_op
    cz_core_proj     = subproject('cz-core')
endif

if heaven_op
    cz_heaven_proj   = subproject('cz-heaven')
endif

if xdgkit_op
    cz_xdgkit_proj   = subproject('cz-xdgkit')
endif 

if ream_op
    cz_ream_proj     = subproject('cz-ream')
endif

if srm_op
    cz_srm_proj      = subproject('cz-srm')
endif

if asset_broker_op
    cz_asset_broker_proj = subproject('cz-asset-broker')
endif

if louvre_op
    cz_louvre_proj   = subproject('cz-louvre')
endif

if kay_op
    cz_kay_proj      = subproject('cz-kay')
endif

if marco_op
    cz_marco_proj    = subproject('cz-marco')
endif

if crystals_op
    cz_crystals_proj = subproject('cz-crystals')
endif

if firmament_op
    cz_firmament_proj = subproject('cz-firmament')
endif

if shelf_op
    cz_shelf_proj    = subproject('cz-shelf')
endif

if desk_op
    cz_desk_proj     = subproject('cz-desk')
endif

if qtcuarzo_op
    cz_qtcuarzo_proj = subproject('cz-qtcuarzo')
endif

if portal_op
    cz_portal_proj   = subproject('cz-portal')
endif

if doorman_op
    cz_doorman_proj  = subproject('cz-doorman')
endif

if settings_op
    cz_settings_proj = subproject('cz-settings')
endif

if gazette_op
    cz_gazette_proj  = subproject('cz-gazette')
endif

# Documentation of every library (one site, each library a module): `meson compile docs`
doxygen = find_program('doxygen', required: false)

if doxygen.found()
    run_target('docs',
        command: [files('doxygen/gen-docs.sh'), meson.current_build_dir() / 'docs'])
endif
