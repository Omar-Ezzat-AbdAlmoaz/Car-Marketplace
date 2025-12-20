function el(tag, className = '', attrs = {}, text = '', children = []) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    Object.entries(attrs).forEach(([key, value]) => {
        if (key === 'style') element.style.cssText = value;
        else if (key.startsWith('data-')) element.dataset[key.slice(5)] = value;
        else element.setAttribute(key, value);
    });
    if (text) element.textContent = text;
    children.forEach(child => element.appendChild(child));
    return element;
}

function icon(name, className = 'text-xl') {
    const span = el('span', `material-symbols-outlined ${className}`);
    span.textContent = name;
    return span;
}

function buildPage() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    // ===== Navigation =====
    const nav = el('nav', 'sticky top-0 z-50 w-full bg-white/90 dark:bg-[#111318]/90 backdrop-blur-md border-b border-[#f0f2f4] dark:border-gray-800');
    const navContainer = el('div', 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8');
    const navFlex = el('div', 'flex justify-between items-center h-16');

    // Logo
    const logo = el('div', 'flex items-center gap-2');
    logo.appendChild(icon('directions_car', 'text-primary text-3xl'));
    logo.appendChild(el('h2', 'text-xl font-bold tracking-tight text-[#111318] dark:text-white', {}, 'CarMarket'));
    navFlex.appendChild(logo);

    // Menu
    const menu = el('div', 'hidden md:flex items-center gap-8');
    ['Buy', 'Sell', 'Services', 'About'].forEach(item => {
        menu.appendChild(el('a', 'text-sm font-medium text-[#111318] dark:text-gray-300 hover:text-primary transition-colors', { href: '#' }, item));
    });
    navFlex.appendChild(menu);

    // Auth Buttons
    const auth = el('div', 'flex items-center gap-3');
    auth.appendChild(el('button', 'hidden sm:flex items-center justify-center h-9 px-4 rounded-lg bg-[#f0f2f4] dark:bg-gray-800 text-[#111318] dark:text-white text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors', {}, 'Log In'));
    auth.appendChild(el('button', 'flex items-center justify-center h-9 px-4 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors shadow-sm hover:shadow-md', {}, 'Sign Up'));
    navFlex.appendChild(auth);

    navContainer.appendChild(navFlex);
    nav.appendChild(navContainer);
    app.appendChild(nav);

    const hero = el('div', 'relative w-full bg-white dark:bg-background-dark');
    const heroBg = el('div', 'relative h-[600px] w-full overflow-hidden');

    const bgImage = el('div', 'absolute inset-0 bg-cover bg-center', {
        style: "background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBdHIsdQ4dhLJ6WXwTJ6JFiP1VOFnEbT2aJV9-LzQp7BOWkvHP-BITrdH43MkF5TkMSj9TYTxwIxLuWf8hon6_vEmUK1yoKJ9dA8LTVxrxd8M_chwmuCkr7b3JQpTCPr4zLbcn3aGWP10P45Mn1imfSkqfJjCCVGXzEPaH_9k1Y2hpMgIHS9epmEFGaF0bsESVKRKBV5tLj2bBvDICL2cKMOlHJwDJD02E96zw8MJOi0BLXv1CM3_cZuoXUBJAnyU7qJ98z8UHrETs');",
        'data-alt': 'Sleek dark sports car driving on a modern highway at sunset'
    });

    const gradient = el('div', 'absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background-light dark:to-background-dark');
    const heroContent = el('div', 'relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center pt-10 pb-20');

    heroContent.appendChild(el('h1', 'text-4xl md:text-6xl font-black text-white tracking-tight mb-4 drop-shadow-sm', {}, 'Find Your Perfect Drive'));
    heroContent.appendChild(el('p', 'text-lg md:text-xl text-gray-200 font-medium max-w-2xl mb-8 drop-shadow-sm', {}, 'Browse thousands of certified cars from trusted dealers and private sellers. verified for quality and price.'));
    heroContent.appendChild(el('button', 'md:hidden flex items-center justify-center h-12 px-8 rounded-lg bg-primary text-white font-bold hover:bg-primary-dark transition-colors shadow-lg', {}, 'Browse Inventory'));

    heroBg.append(bgImage, gradient, heroContent);

    const searchWidget = el('div', 'relative -mt-24 md:-mt-32 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-20 mb-16');
    const searchCard = el('div', 'bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-6');

    // Tabs
    const tabs = el('div', 'flex gap-6 border-b border-gray-100 dark:border-gray-700 pb-4 mb-6');
    tabs.appendChild(el('button', 'text-primary font-bold border-b-2 border-primary pb-4 -mb-4.5 px-2', {}, 'All Cars'));
    tabs.appendChild(el('button', 'text-gray-500 dark:text-gray-400 font-medium hover:text-[#111318] dark:hover:text-white transition-colors px-2', {}, 'New'));
    tabs.appendChild(el('button', 'text-gray-500 dark:text-gray-400 font-medium hover:text-[#111318] dark:hover:text-white transition-colors px-2', {}, 'Used'));
    searchCard.appendChild(tabs);

    // Filters
    const grid = el('div', 'grid grid-cols-1 md:grid-cols-4 gap-6 items-end');

    // Make
    const makeDiv = el('div', 'flex flex-col gap-2');
    makeDiv.appendChild(el('label', 'text-sm font-semibold text-[#111318] dark:text-gray-200', {}, 'Make'));
    const makeSelect = el('select', 'w-full h-12 rounded-lg border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-[#111318] dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent pl-4 pr-10 appearance-none cursor-pointer');
    ['Any Make', 'BMW', 'Mercedes-Benz', 'Audi', 'Tesla'].forEach(opt => makeSelect.add(new Option(opt)));
    const makeWrapper = el('div', 'relative');
    makeWrapper.append(makeSelect, icon('expand_more', 'absolute right-3 top-3 text-gray-500 pointer-events-none'));
    makeDiv.appendChild(makeWrapper);
    grid.appendChild(makeDiv);

    // Model
    const modelDiv = el('div', 'flex flex-col gap-2');
    modelDiv.appendChild(el('label', 'text-sm font-semibold text-[#111318] dark:text-gray-200', {}, 'Model'));
    const modelSelect = el('select', 'w-full h-12 rounded-lg border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-[#111318] dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent pl-4 pr-10 appearance-none cursor-pointer');
    ['Any Model', '3 Series', 'C-Class', 'A4', 'Model 3'].forEach(opt => modelSelect.add(new Option(opt)));
    const modelWrapper = el('div', 'relative');
    modelWrapper.append(modelSelect, icon('expand_more', 'absolute right-3 top-3 text-gray-500 pointer-events-none'));
    modelDiv.appendChild(modelWrapper);
    grid.appendChild(modelDiv);

    // Price
    const priceDiv = el('div', 'flex flex-col gap-2');
    const priceHeader = el('div', 'flex justify-between items-center mb-1');
    priceHeader.append(el('label', 'text-sm font-semibold text-[#111318] dark:text-gray-200', {}, 'Max Price'), el('span', 'text-sm font-bold text-primary', {}, '$85,000'));
    priceDiv.appendChild(priceHeader);
    const sliderWrapper = el('div', 'relative h-12 flex items-center');
    sliderWrapper.appendChild(el('input', 'w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-primary', { type: 'range', min: '5000', max: '200000', value: '85000' }));
    priceDiv.appendChild(sliderWrapper);
    grid.appendChild(priceDiv);

    // Search Button
    const searchBtn = el('button', 'w-full h-12 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all shadow-md flex items-center justify-center gap-2');
    searchBtn.append(icon('search'), el('span', '', {}, 'Search'));
    grid.appendChild(searchBtn);

    searchCard.appendChild(grid);
    searchWidget.appendChild(searchCard);

    hero.append(heroBg, searchWidget);
    app.appendChild(hero);

    // ===== Featured Cars =====
    const featured = el('section', 'py-16 bg-background-light dark:bg-background-dark');
    const container = el('div', 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8');
    const header = el('div', 'flex justify-between items-end mb-10');
    header.appendChild(el('div', '', {}, '', [
        el('h2', 'text-3xl font-black text-[#111318] dark:text-white mb-2', {}, 'Featured Listings'),
        el('p', 'text-gray-600 dark:text-gray-400', {}, 'Hand-picked vehicles just for you.')
    ]));
    header.appendChild(el('a', 'hidden sm:flex items-center gap-1 text-primary font-bold hover:gap-2 transition-all', { href: '#' }, '', [
        el('span', '', {}, 'View All '),
        icon('arrow_forward', 'text-sm')
    ]));
    container.appendChild(header);

    const carsGrid = el('div', 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6');

    const carsData = [
        { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApPDiHzs03wW_Y4pB1T2dVBbZ65iZZ8NjoPftwTfjdZxY71L6Ueq-gKTzDRYCVz_dV_8aphkLSvKaFrD8SuYsIzhitVBqmjTkEEHqiF7J1Ssp5ooSwpMMF0z9H_k9ZL6AQI6y5XE_0-e-0lDLtbPkgfDMKul5ZJ5OB-QEmY8dolvKz3uqnejl98V6J4IHOZbQKy8V8MSfeRRJ_gzc_SUdDM5oedPCWQzRurXp3Ec3NHHZ6otR0Qprqq7ivF2bvnSMcyz6XSv2yeoM', title: '2021 Tesla Model 3', price: '$34,900', badge: 'Used', specs: ['24k mi', 'Auto', 'Electric'] },
        { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2T2IMxYltKezA4y9Uzky5K8WMgZpxdDEtvOxasgKvMgBHLs2Yp3nip18ju-ka6tFiJsfhmIEy_W1rEuy7ldk4pGDf8jkC38UZrbDtl3K7OEc71hpwDMXJEneaOV-nSu67t2XFVOwZXn0TO64JyDfcQxY6gdJ1m6VXDD4JwG4wVB0GdsDmbgRFqQ4HT65V0vu_e5QK52JOEkENsxbt74h4r1qmRGsmGM4ujxKi24tE37WiRYpOeikS6Z78XwB_UuD4o2m2u4T462k', title: '2024 BMW X5 M', price: '$85,200', badge: 'New', specs: ['15 mi', 'Auto', 'Hybrid'] },
        { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBORFPn_7mD4O0n1IBNlVAyx3S6fHTKUjwu_iIo9llf8D87w4x2503nM4VZ_k-fj3jImMdrtC65Sk1wVyr6qEGVzpShkNgyadFn-vz-CLTbw4TVUVDstZISZNdn3gsXqGMW15mTJbUtQTNDToPjNqor2xozs0CNrG3IxiTvDbAR_5Xvepj_F_DmLN07-iiI2qdkMU0_6yml9z3ER--JZzRRwB91u_HT4vrJGGCar2AVXnc63yWL5XAc7uDy0vnXq5EOk7ThllZMF1s', title: '2019 Audi R8 V10', price: '$142,000', badge: null, specs: ['12k mi', 'Auto', 'Petrol'] },
        { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5jgGuTQysY9lOAKRsZnAfgn8-8c40DOd_fucnmPjm5U2cfRDOwqepM9-3sZM68_M5Z5-m32_EzYfvvvuPWNmGcSNRhN_hI3hhYoVDV0l1ujq00-JdTqyZ1TUCMs-elZa6KQTQxsovEzmEgiidpoKZhh89snsZQmTcjMRQS9YeaKtvl_OP6uTklIkL3dwi0hzl237PxuJjzk8NgYV-zIlMKUjdErQ-CBZ6aPcPAOI1Tf8Fm-mPMPL6k_L0O5qNP6vl-2f2NP3H-DA', title: '2022 Ford Mustang GT', price: '$42,500', badge: null, specs: ['8k mi', 'Manual', 'Petrol'] }
    ];

    carsData.forEach(car => {
        const card = el('div', 'group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300');
        const imgDiv = el('div', 'relative h-48 overflow-hidden');
        imgDiv.appendChild(el('img', 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500', { src: car.img, alt: car.title }));

        // Favorite button
        const fav = el('button', 'absolute top-3 right-3 p-2 bg-white/90 dark:bg-black/50 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors');
        fav.appendChild(icon('favorite'));
        imgDiv.appendChild(fav);

        // Badge
        if (car.badge) {
            const badgeClass = car.badge === 'New' ? 'bg-primary/90' : 'bg-black/70';
            imgDiv.appendChild(el('div', `absolute bottom-3 left-3 ${badgeClass} backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white uppercase tracking-wider`, {}, car.badge));
        }

        const content = el('div', 'p-4');
        content.appendChild(el('h3', 'text-lg font-bold text-[#111318] dark:text-white line-clamp-1 mb-2', {}, car.title));
        content.appendChild(el('p', 'text-xl font-black text-primary mb-4', {}, car.price));

        const specs = el('div', 'flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4');
        car.specs.forEach(spec => {
            let iconName = 'local_gas_station';
            if (spec.includes('mi')) iconName = 'speed';
            else if (spec.includes('Auto') || spec.includes('Manual')) iconName = 'settings_input_component';
            else if (spec.includes('Electric')) iconName = 'ev_station';
            specs.appendChild(el('div', 'flex items-center gap-1', {}, '', [icon(iconName, 'text-base'), el('span', '', {}, spec)]));
        });
        content.appendChild(specs);

        card.append(imgDiv, content);
        carsGrid.appendChild(card);
    });

    container.appendChild(carsGrid);
    featured.appendChild(container);
    app.appendChild(featured);

    // ===== Why Choose Us =====
    const why = el('section', 'py-20 bg-white dark:bg-gray-900');
    const whyContainer = el('div', 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8');
    whyContainer.appendChild(el('div', 'text-center max-w-2xl mx-auto mb-16', {}, '', [
        el('h2', 'text-3xl font-black text-[#111318] dark:text-white mb-4', {}, 'Why Choose CarMarket?'),
        el('p', 'text-gray-600 dark:text-gray-400 text-lg', {}, 'We provide the best experience for buying and selling vehicles with transparency and trust.')
    ]));

    const featuresGrid = el('div', 'grid grid-cols-1 md:grid-cols-3 gap-10');
    const features = [
        { icon: 'verified_user', title: 'Trusted Dealers', desc: 'Every dealer on our platform is verified and vetted to ensure you get the highest quality service.' },
        { icon: 'attach_money', title: 'Transparent Pricing', desc: 'No hidden fees. What you see is what you pay. We believe in complete financial transparency.' },
        { icon: 'rocket_launch', title: 'Fast & Easy', desc: 'Our streamlined process makes buying or selling your car faster than ever before.' }
    ];

    features.forEach(f => {
        const card = el('div', 'flex flex-col items-center text-center p-6 rounded-2xl bg-background-light dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 shadow-sm hover:shadow-lg transition-all duration-300');
        card.appendChild(el('div', 'size-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary', {}, '', [icon(f.icon, 'text-4xl')]));
        card.appendChild(el('h3', 'text-xl font-bold text-[#111318] dark:text-white mb-3', {}, f.title));
        card.appendChild(el('p', 'text-gray-600 dark:text-gray-400 leading-relaxed', {}, f.desc));
        featuresGrid.appendChild(card);
    });

    whyContainer.appendChild(featuresGrid);
    why.appendChild(whyContainer);
    app.appendChild(why);

    // ===== CTA Section =====
    const cta = el('section', 'py-20 bg-background-light dark:bg-background-dark');
    const ctaContainer = el('div', 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8');
    const ctaBox = el('div', 'relative rounded-3xl overflow-hidden bg-primary px-8 py-16 md:px-16 flex flex-col md:flex-row items-center justify-between gap-10');
    ctaBox.appendChild(el('div', 'absolute inset-0 opacity-10', { style: 'background-image: radial-gradient(#fff 2px, transparent 2px); background-size: 20px 20px;' }));

    const ctaText = el('div', 'relative z-10 max-w-xl text-center md:text-left');
    ctaText.append(el('h2', 'text-3xl md:text-4xl font-black text-white mb-4', {}, 'Ready to find your dream car?'));
    ctaText.append(el('p', 'text-blue-100 text-lg', {}, 'Join thousands of satisfied customers today and start your journey.'));

    const ctaButtons = el('div', 'relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto');
    ctaButtons.appendChild(el('button', 'h-12 px-8 rounded-xl bg-white text-primary font-bold hover:bg-gray-50 transition-colors shadow-lg whitespace-nowrap', {}, 'Get Started'));
    ctaButtons.appendChild(el('button', 'h-12 px-8 rounded-xl bg-blue-700/50 border border-blue-400/30 text-white font-bold hover:bg-blue-700 transition-colors whitespace-nowrap', {}, 'Contact Sales'));

    ctaBox.append(ctaText, ctaButtons);
    ctaContainer.appendChild(ctaBox);
    cta.appendChild(ctaContainer);
    app.appendChild(cta);

    // ===== Footer =====
    const footer = el('footer', 'bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 pt-16 pb-8');
    const footerContainer = el('div', 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8');
    const footerGrid = el('div', 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12');

    // Brand
    const brand = el('div', 'flex flex-col gap-4');
    brand.appendChild(el('div', 'flex items-center gap-2 mb-2', {}, '', [icon('directions_car', 'text-primary text-3xl'), el('h2', 'text-xl font-bold tracking-tight text-[#111318] dark:text-white', {}, 'CarMarket')]));
    brand.appendChild(el('p', 'text-gray-500 dark:text-gray-400 text-sm leading-relaxed', {}, 'The most trusted marketplace for buying and selling cars online. Fast, secure, and transparent.'));
    footerGrid.appendChild(brand);

    // Marketplace Links
    const marketplace = el('div');
    marketplace.appendChild(el('h4', 'font-bold text-[#111318] dark:text-white mb-6', {}, 'Marketplace'));
    const ul1 = el('ul', 'flex flex-col gap-3 text-sm text-gray-500 dark:text-gray-400');
    ['Browse Cars', 'Sell Your Car', 'Car Valuation', 'Certified Pre-Owned'].forEach(link => ul1.appendChild(el('li', '', {}, '', [el('a', 'hover:text-primary transition-colors', { href: '#' }, link)])));
    marketplace.appendChild(ul1);
    footerGrid.appendChild(marketplace);

    // Company Links
    const company = el('div');
    company.appendChild(el('h4', 'font-bold text-[#111318] dark:text-white mb-6', {}, 'Company'));
    const ul2 = el('ul', 'flex flex-col gap-3 text-sm text-gray-500 dark:text-gray-400');
    ['About Us', 'Careers', 'Press', 'Contact'].forEach(link => ul2.appendChild(el('li', '', {}, '', [el('a', 'hover:text-primary transition-colors', { href: '#' }, link)])));
    company.appendChild(ul2);
    footerGrid.appendChild(company);

    // Newsletter
    const newsletter = el('div');
    newsletter.appendChild(el('h4', 'font-bold text-[#111318] dark:text-white mb-6', {}, 'Stay Updated'));
    newsletter.appendChild(el('p', 'text-sm text-gray-500 dark:text-gray-400 mb-3', {}, 'Subscribe to our newsletter for the latest updates.'));
    const form = el('div', 'flex gap-2');
    form.appendChild(el('input', 'w-full h-10 rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm px-3 focus:ring-2 focus:ring-primary focus:border-transparent', { type: 'email', placeholder: 'Email address' }));
    form.appendChild(el('button', 'size-10 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors', {}, '', [icon('arrow_forward', 'text-lg')]));
    newsletter.appendChild(form);
    footerGrid.appendChild(newsletter);

    footerContainer.appendChild(footerGrid);

    // Bottom bar
    const bottom = el('div', 'border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4');
    bottom.appendChild(el('p', 'text-sm text-gray-400 text-center md:text-left', {}, '© 2024 CarMarket Inc. All rights reserved.'));

    const social = el('div', 'flex gap-6');
    bottom.appendChild(social);

    footerContainer.appendChild(bottom);
    footer.appendChild(footerContainer);
    app.appendChild(footer);
}

document.addEventListener('DOMContentLoaded', buildPage);