// /assets/js/api.js
// API Baserow Config
const BASE_URL = 'http://213.199.56.115/api/database/rows/table/';
const TOKEN = '1rq7OOnCoVCuSDKXzv8k7JbGh9wO9MsH';
const CONTEUDOS_TABLE = 4400;
const EPISODIOS_TABLE = 5351;

// Fetch all contents for home/search
async function fetchAllContents() {
    try {
        const response = await fetch(`${BASE_URL}${CONTEUDOS_TABLE}/?user_field_names=true`, {
            headers: { 'Authorization': `Token ${TOKEN}` }
        });
        if (!response.ok) throw new Error('Falha ao fetch contents');
        const data = await response.json();
        return data.results; // Assumindo paginacao simples, para producao usar next
    } catch (error) {
        console.error('Erro API:', error);
        return [];
    }
}

// Fetch content by ID (row ID)
async function fetchContentById(id) {
    try {
        const response = await fetch(`${BASE_URL}${CONTEUDOS_TABLE}/${id}/?user_field_names=true`, {
            headers: { 'Authorization': `Token ${TOKEN}` }
        });
        if (!response.ok) throw new Error('Falha ao fetch content');
        return await response.json();
    } catch (error) {
        console.error('Erro API:', error);
        return null;
    }
}

// Fetch episodios by Nome (filter by Nome from Conteudos)
async function fetchEpisodiosByNome(contentId) {
    const content = await fetchContentById(contentId);
    if (!content) return [];
    const nome = content.Nome;
    try {
        const response = await fetch(`${BASE_URL}${EPISODIOS_TABLE}/?user_field_names=true&filter__Nome__equal=${encodeURIComponent(nome)}`, {
            headers: { 'Authorization': `Token ${TOKEN}` }
        });
        if (!response.ok) throw new Error('Falha ao fetch episodios');
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Erro API:', error);
        return [];
    }
}