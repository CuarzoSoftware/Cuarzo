#!/usr/bin/env bash
# Generates the Cuarzo Framework documentation.
#
#   doxygen/gen-docs.sh [output-dir]    (default: <repo>/docs)
#
# The HTML goes to <output-dir>/html, warnings to <output-dir>/warnings.log.
set -euo pipefail

DOXYGEN_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(dirname "$DOXYGEN_DIR")"

OUTPUT="${1:-$REPO_DIR/docs}"
mkdir -p "$OUTPUT"
OUTPUT="$(cd "$OUTPUT" && pwd)"

VERSION="$(sed -nE "s/^\s*version\s*:\s*'([^']+)'.*/\1/p" "$REPO_DIR/meson.build" | head -1)"

cd "$DOXYGEN_DIR"
CZ_DOCS_OUTPUT="$OUTPUT" CZ_DOCS_VERSION="v$VERSION" doxygen Doxyfile

echo "Documentation: $OUTPUT/html/index.html"
if [ -s "$OUTPUT/warnings.log" ]; then
    echo "Warnings: $(wc -l < "$OUTPUT/warnings.log") lines in $OUTPUT/warnings.log"
fi
