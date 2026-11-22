/*
 * Cuarzo Framework documentation: Qt-like touches on doxygen's pages.
 *
 * - "LSurface Class Reference" -> "LSurface Class"
 * - On class pages, the include line, module and inheritance paragraphs are
 *   gathered in an info table (Header / pkg-config / Module / Inherits /
 *   Inherited By), like the one at the top of Qt's class pages.
 * - "More..." links are removed from member summaries.
 * - The descriptions of inherited members are hidden and expanded with them.
 */
(function () {
    'use strict';

    // Module title (doxygen group) -> pkg-config package
    var PACKAGES = {
        'Core': 'cz-core',
        'Ream': 'cz-ream',
        'SRM': 'cz-srm',
        'Louvre': 'cz-louvre',
        'Kay': 'cz-kay',
        'Marco': 'cz-marco',
        'XDGKit': 'cz-xdgkit',
        'Heaven Bar': 'cz-heaven-bar',
        'Heaven Client': 'cz-heaven-client',
        'Heaven Compositor': 'cz-heaven-compositor',
        'AssetBroker': 'cz-asset-broker'
    };

    function fixTitle() {
        var title = document.querySelector('div.header .title');
        if (!title || !title.firstChild || title.firstChild.nodeType !== Node.TEXT_NODE)
            return;
        title.firstChild.nodeValue = title.firstChild.nodeValue
            .replace(/ (Class|Struct|Union|Namespace|Class Template|Struct Template) Reference/, ' $1');
        document.title = document.title.replace(/ (Class|Struct|Union|Namespace) Reference/, ' $1');
    }

    function row(table, label, content) {
        var tr = document.createElement('tr');
        var th = document.createElement('th');
        var td = document.createElement('td');
        th.textContent = label + ':';
        if (typeof content === 'string')
            td.innerHTML = content;
        else
            td.appendChild(content);
        tr.appendChild(th);
        tr.appendChild(td);
        table.appendChild(tr);
    }

    // The <p> directly inside .contents whose text starts with prefix
    function findParagraph(contents, test) {
        var ps = contents.querySelectorAll(':scope > p');
        for (var i = 0; i < ps.length; i++)
            if (test(ps[i]))
                return ps[i];
        return null;
    }

    // "Inherits <a>X</a>, and <a>Y</a>." -> "<a>X</a> and <a>Y</a>"
    function stripSentence(p, prefix) {
        var html = p.innerHTML.trim();
        html = html.replace(new RegExp('^' + prefix + '\\s*'), '');
        html = html.replace(/\.\s*$/, '');
        html = html.replace(/,\s*and\s+/, ' and ');
        return html;
    }

    function buildClassInfo() {
        if (!/\b(class|struct|union)[A-Z_]/.test(location.pathname.split('/').pop()))
            return;

        var contents = document.querySelector('div.contents');
        if (!contents)
            return;

        var include = findParagraph(contents, function (p) {
            var code = p.querySelector('code');
            return code && /^#include/.test(code.textContent.trim());
        });

        if (!include)
            return;

        var inherits = findParagraph(contents, function (p) {
            return /^Inherits\s/.test(p.textContent.trim());
        });

        var inheritedBy = findParagraph(contents, function (p) {
            return /^Inherited by\s/.test(p.textContent.trim());
        });

        var table = document.createElement('table');
        table.className = 'cz-class-info';

        row(table, 'Header', include.querySelector('code'));

        var moduleLink = document.querySelector('div.ingroups a');
        if (moduleLink) {
            var name = moduleLink.textContent.trim();
            if (PACKAGES[name])
                row(table, 'pkg-config', '<code>' + PACKAGES[name] + '</code>');
            row(table, 'Module', moduleLink.cloneNode(true));
        }

        if (inherits) {
            row(table, 'Inherits', stripSentence(inherits, 'Inherits'));
            inherits.remove();
        }

        if (inheritedBy) {
            row(table, 'Inherited By', stripSentence(inheritedBy, 'Inherited by'));
            inheritedBy.remove();
        }

        include.replaceWith(table);

        var members = document.querySelector('div.summary a[href$="-members.html"]');
        if (members) {
            var p = document.createElement('p');
            p.className = 'cz-all-members';
            var a = members.cloneNode(true);
            a.textContent = 'List of all members, including inherited members';
            p.appendChild(a);
            table.after(p);
        }
    }

    function removeMoreLinks() {
        var links = document.querySelectorAll('.memberdecls .mdescRight a');
        for (var i = 0; i < links.length; i++)
            if (links[i].textContent.trim() === 'More...')
                links[i].remove();
    }

    // Class lists (module pages, nested classes): the left column only holds
    // "class"/"struct", so it doesn't need the width of a return type column
    function markKindCells() {
        var cells = document.querySelectorAll('table.memberdecls td.memItemLeft');
        for (var i = 0; i < cells.length; i++)
            if (/^(class|struct|union|namespace)$/.test(cells[i].textContent.replace(/\u00a0/g, ' ').trim()))
                cells[i].classList.add('cz-kind');
    }

    // Doxygen doesn't give the description rows of some inherited members (e.g. enums) the classes
    // of their member row ("inherit <section>"), so they'd show while the section is collapsed
    // and wouldn't be toggled with it
    function fixInheritedDescriptions() {
        var rows = document.querySelectorAll('table.memberdecls tr.inherit');

        for (var i = 0; i < rows.length; i++) {
            var classes = Array.prototype.filter.call(rows[i].classList, function (c) {
                return !/^memitem:/.test(c);
            });

            for (var next = rows[i].nextElementSibling;
                 next && /^(memdesc|separator):/.test(next.className) && !next.classList.contains('inherit');
                 next = next.nextElementSibling)
                for (var j = 0; j < classes.length; j++)
                    next.classList.add(classes[j]);
        }
    }

    function run() {
        if (document.querySelector('.cz-hero'))
            document.body.classList.add('cz-home');
        fixTitle();
        buildClassInfo();
        removeMoreLinks();
        markKindCells();
        fixInheritedDescriptions();
    }

    if (document.readyState === 'loading')
        document.addEventListener('DOMContentLoaded', run);
    else
        run();
})();
