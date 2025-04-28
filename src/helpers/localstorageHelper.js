// utils/localStorageHelper.js

/**
 * Save data to localStorage safely
 * @param {string} key - The key under which to save data
 * @param {any} value - The data to save (will be JSON.stringified)
 */
export const saveToLocalStorage = (key, value) => {
    console.log({ key, value });

    if (typeof window === 'undefined') return; // Next.js safety: run only on client
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
    }
};

/**
 * Load data from localStorage safely
 * @param {string} key - The key to retrieve
 * @returns {any|null} - Parsed data or null if not found or failed
 */
export const loadFromLocalStorage = (key) => {
    if (typeof window === 'undefined') return null;
    try {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
        console.error(`Error loading ${key} from localStorage:`, error);
        return null;
    }
};

/**
 * Remove data from localStorage safely
 * @param {string} key - The key to remove
 */
export const removeFromLocalStorage = (key) => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing ${key} from localStorage:`, error);
    }
};
