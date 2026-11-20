#!/usr/bin/env python3
"""Doxygen INPUT_FILTER for the Cuarzo Framework documentation.

Each library lives in its own subproject (subprojects/cz-<name>). This filter
wraps every header in an `@addtogroup` block for its library's module group
(defined in pages/modules.dox), so classes, functions, enums, etc. are listed
on the module's page without touching the headers themselves.

Groups a header defines (e.g. Kay's AKNodes) become subgroups of the module,
and entities explicitly placed in a group with `@ingroup` keep it (doxygen
gives `@ingroup` priority over `@addtogroup`).

Warnings for filtered headers report line numbers one line past the real ones
(the opening comment takes its own line, headers start with include guards).
"""

import os
import re
import sys

# subprojects/<dir> -> module group id (see pages/modules.dox)
MODULES = {
    'cz-core':         'module_core',
    'cz-ream':         'module_ream',
    'cz-srm':          'module_srm',
    'cz-louvre':       'module_louvre',
    'cz-kay':          'module_kay',
    'cz-marco':        'module_marco',
    'cz-xdgkit':       'module_xdgkit',
    'cz-heaven':       'module_heaven',
    'cz-asset-broker': 'module_asset_broker',
}

# Submodules: (subproject dir, directory under it) -> group id. Heaven's three
# libraries have classes with the same names in different namespaces
# (CZ::Bar::HNMenu, CZ::Client::HNMenu), so each one gets its own group.
SUBMODULES = {
    ('cz-heaven', 'Bar'):        'module_heaven_bar',
    ('cz-heaven', 'Client'):     'module_heaven_client',
    ('cz-heaven', 'Compositor'): 'module_heaven_compositor',
}

# Groups a library defines for all of its classes. They are merged into the
# module group instead of showing up as a subgroup with the module's name.
GROUP_ALIASES = {
    'AssetBroker': 'module_asset_broker',
}


def module_of(path):
    parts = os.path.normpath(os.path.abspath(path)).split(os.sep)
    for i, part in enumerate(parts[:-1]):
        if part == 'subprojects' and parts[i + 1] in MODULES:
            project = parts[i + 1]
            for subdir in parts[i + 2:-1]:
                if (project, subdir) in SUBMODULES:
                    return SUBMODULES[(project, subdir)]
            return MODULES[project]
    return None


def merge_group_aliases(text):
    """Returns the text with aliased groups renamed, and the offset of the end
    of the comment that defined one (or -1)."""
    defined_end = -1

    for name, group in GROUP_ALIASES.items():
        text = re.sub(rf'([@\\])ingroup\s+{name}\b', rf'\1ingroup {group}', text)

        match = re.search(rf'([@\\])defgroup\s+{name}\b[^\n]*', text)
        if match:
            text = text[:match.start()] + f'{match.group(1)}addtogroup {group}' + text[match.end():]
            defined_end = text.find('*/', match.start()) + 2

    return text, defined_end


def main():
    path = sys.argv[1]

    with open(path, encoding='utf-8', errors='replace') as f:
        text = f.read()

    group = module_of(path)

    if group is None or not path.endswith(('.h', '.hpp')):
        sys.stdout.write(text)
        return

    text, defined_end = merge_group_aliases(text)
    opener = f'/** @addtogroup {group} */ /** @{{ */'

    if defined_end > 0:
        # The comment documenting the module must not be inside its own block
        sys.stdout.write(text[:defined_end] + ' ' + opener + text[defined_end:])
    else:
        sys.stdout.write(opener + '\n' + text)

    if not text.endswith('\n'):
        sys.stdout.write('\n')

    sys.stdout.write('/** @} */\n')


if __name__ == '__main__':
    main()
