function icon(name, className = 'text-xl') {
    const span = el('span', `material-symbols-outlined ${className}`);
    span.textContent = name;
    return span;
}