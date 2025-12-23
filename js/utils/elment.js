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