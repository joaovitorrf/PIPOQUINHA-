// /assets/js/security.js
// Bloqueio de teclas e ações
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P' ||
        e.key === 'i' || e.key === 'I' || e.key === 'j' || e.key === 'J')) {
        e.preventDefault();
    }
    if (e.key === 'F12') e.preventDefault();
});

// Bloqueio right click, copy, paste, selection
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('copy', e => e.preventDefault());
document.addEventListener('paste', e => e.preventDefault());
document.addEventListener('selectstart', e => e.preventDefault());

// Detectar DevTools
setInterval(() => {
    const devtools = /./;
    devtools.toString = () => { window.location.href = 'https://google.com'; };
    console.log('%c', devtools);
}, 1000);

// Anti-debug: Ofuscação simples (código já minify em prod, mas aqui normal)
// Para anti-view-source, não possível, mas bloqueio Ctrl+U acima

// Sem afetar UX: Apenas dev actions bloqueadas