// /assets/js/search.js
// Fuzzy Search Implementation (Simple Levenshtein for similarity)
function levenshtein(a, b) {
    const matrix = Array.from({ length: a.length + 1 }, (_, i) => i);
    for (let j = 1; j <= b.length; j++) {
        matrix[0] = j;
        const prev = j;
        for (let i = 1; i <= a.length; i++) {
            const temp = matrix[i];
            matrix[i] = a[i - 1] === b[j - 1] ? prev : Math.min(matrix[i - 1] + 1, matrix[i] + 1, prev + 1);
            prev = temp;
        }
    }
    return matrix[a.length];
}

function normalize(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function fuzzySearch(query, items) {
    const normQuery = normalize(query);
    return items.filter(item => {
        const normName = normalize(item.Nome);
        const distance = levenshtein(normQuery, normName);
        return distance <= Math.floor(normName.length / 3) || normName.includes(normQuery);
    }).sort((a, b) => levenshtein(normalize(query), normalize(a.Nome)) - levenshtein(normalize(query), normalize(b.Nome)));
}

// Home Page Logic
document.addEventListener('DOMContentLoaded', async () => {
    if (!document.getElementById('contentGrid')) return; // Apenas na home
    
    const grid = document.getElementById('contentGrid');
    const searchInput = document.getElementById('searchInput');
    
    // Skeleton Loading
    for (let i = 0; i < 12; i++) {
        const skeleton = document.createElement('div');
        skeleton.classList.add('skeleton-card');
        grid.appendChild(skeleton);
    }
    
    const contents = await fetchAllContents();
    
    // Remove skeletons
    grid.innerHTML = '';
    
    // Inicial populate
    populateGrid(contents);
    
    // Debounce Search
    let debounceTimer;
    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const filtered = fuzzySearch(searchInput.value, contents);
            grid.innerHTML = '';
            populateGrid(filtered);
        }, 300);
    });
});

function populateGrid(contents) {
    const grid = document.getElementById('contentGrid');
    contents.forEach(content => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${content.Capa}" alt="${content.Nome}" loading="lazy">
            <div class="card-title">${content.Nome}</div>
        `;
        card.addEventListener('click', () => {
            const page = content.Tipo === 'Filme' ? 'filme.html' : 'serie.html';
            window.location.href = `/public/${page}?id=${content.id}`;
        });
        grid.appendChild(card);
    });
}

// Throttle Scroll (for performance, if infinite scroll, but not implemented here)
window.addEventListener('scroll', throttle(() => {
    // Pode adicionar lazy load custom se necessário
}, 200));

function throttle(fn, wait) {
    let time = Date.now();
    return function() {
        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    };
}