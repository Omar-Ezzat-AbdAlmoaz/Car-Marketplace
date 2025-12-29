function buildFooter() {
    const footer = el(
        'footer',
        'bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 pt-16 pb-8'
    );

    const footerContainer = el(
        'div',
        'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
    );

    const footerGrid = el(
        'div',
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12'
    );

    // ===== Brand =====
    const brand = el('div', 'flex flex-col gap-4');
    brand.appendChild(
        el(
            'div',
            'flex items-center gap-2 mb-2',
            {},
            '',
            [
                icon('directions_car', 'text-primary text-3xl'),
                el(
                    'h2',
                    'text-xl font-bold tracking-tight text-[#111318] dark:text-white',
                    {},
                    'CarMarket'
                )
            ]
        )
    );

    brand.appendChild(
        el(
            'p',
            'text-gray-500 dark:text-gray-400 text-sm leading-relaxed',
            {},
            'The most trusted marketplace for buying and selling cars online. Fast, secure, and transparent.'
        )
    );

    footerGrid.appendChild(brand);

    // ===== Marketplace =====
    footerGrid.appendChild(
        createLinksSection('Marketplace', [
            'Browse Cars',
            'Sell Your Car',
            'Car Valuation',
            'Certified Pre-Owned'
        ])
    );

    // ===== Company =====
    footerGrid.appendChild(
        createLinksSection('Company', [
            'About Us',
            'Careers',
            'Press',
            'Contact'
        ])
    );

    // ===== Newsletter =====
    const newsletter = el('div');
    newsletter.appendChild(
        el(
            'h4',
            'font-bold text-[#111318] dark:text-white mb-6',
            {},
            'Stay Updated'
        )
    );

    newsletter.appendChild(
        el(
            'p',
            'text-sm text-gray-500 dark:text-gray-400 mb-3',
            {},
            'Subscribe to our newsletter for the latest updates.'
        )
    );

    const form = el('div', 'flex gap-2');
    form.appendChild(
        el(
            'input',
            'w-full h-10 rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm px-3 focus:ring-2 focus:ring-primary focus:border-transparent',
            { type: 'email', placeholder: 'Email address' }
        )
    );

    form.appendChild(
        el(
            'button',
            'size-10 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors',
            {},
            '',
            [icon('arrow_forward', 'text-lg')]
        )
    );

    newsletter.appendChild(form);
    footerGrid.appendChild(newsletter);

    footerContainer.appendChild(footerGrid);

    // ===== Bottom =====
    const bottom = el(
        'div',
        'border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4'
    );

    bottom.appendChild(
        el(
            'p',
            'text-sm text-gray-400 text-center md:text-left',
            {},
            '© 2026 CarMarket Inc. All rights reserved.'
        )
    );

    bottom.appendChild(el('div', 'flex gap-6')); // social placeholder

    footerContainer.appendChild(bottom);
    footer.appendChild(footerContainer);

    return footer;
}

// ===== Helper =====
function createLinksSection(title, links) {
    const section = el('div');
    section.appendChild(
        el(
            'h4',
            'font-bold text-[#111318] dark:text-white mb-6',
            {},
            title
        )
    );

    const ul = el(
        'ul',
        'flex flex-col gap-3 text-sm text-gray-500 dark:text-gray-400'
    );

    links.forEach(text =>
        ul.appendChild(
            el('li', '', {}, '', [
                el(
                    'a',
                    'hover:text-primary transition-colors',
                    { href: '#' },
                    text
                )
            ])
        )
    );

    section.appendChild(ul);
    return section;
}
