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
marco_op        = get_option('with_marco')
kay_op          = get_option('with_kay') or marco_op
xdgkit_op       = get_option('with_xdgkit') or marco_op
louvre_op       = get_option('with_louvre') or crystals_op
srm_op          = get_option('with_srm') or louvre_op
ream_op         = get_option('with_ream') or srm_op or kay_op
core_op         = get_option('with_core') or ream_op or xdgkit_op
skia_op         = get_option('with_skia') or core_op

if skia_op
    cz_skia_proj     = subproject('cz-skia')
endif

if core_op
    cz_core_proj     = subproject('cz-core')
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
