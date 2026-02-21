const REACTON_STORAGE_KEY = 'reacton_scores'

export function getStoredScores() {
    if (typeof window === 'undefined') return { prev: [], tries: 0 }
    try {
        const raw = window.localStorage.getItem(REACTON_STORAGE_KEY)
        if (!raw) return { prev: [], tries: 0 }
        const data = JSON.parse(raw)
        return {
            prev: Array.isArray(data.prev) ? data.prev : [],
            tries: typeof data.tries === 'number' ? data.tries : 0,
        }
    } catch {
        return { prev: [], tries: 0 }
    }
}

export function setStoredScores({ prev = [], tries = 0 }) {
    if (typeof window === 'undefined') return
    try {
        window.localStorage.setItem(REACTON_STORAGE_KEY, JSON.stringify({ prev, tries }))
    } catch (e) {
        console.warn('Could not save scores to localStorage', e)
    }
}
