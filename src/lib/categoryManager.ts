// Utility for managing categories, subcategories, and brands in localStorage

const STORAGE_KEYS = {
    CATEGORIES: 'admin_categories',
    BRANDS: 'admin_brands'
};

export interface Category {
    id: string;
    name: string;
    subcategories: string[];
}

// Get all categories
export const getCategories = (): Category[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return stored ? JSON.parse(stored) : [];
};

// Save categories
export const saveCategories = (categories: Category[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
};

// Add new category
export const addCategory = (categoryName: string): void => {
    const categories = getCategories();
    const exists = categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
    if (!exists) {
        categories.push({
            id: Date.now().toString(),
            name: categoryName,
            subcategories: []
        });
        saveCategories(categories);
    }
};

// Add subcategory to a category
export const addSubcategory = (categoryName: string, subcategoryName: string): void => {
    const categories = getCategories();
    const category = categories.find(c => c.name === categoryName);
    if (category && !category.subcategories.includes(subcategoryName)) {
        category.subcategories.push(subcategoryName);
        saveCategories(categories);
    }
};

// Get all brands
export const getBrands = (): string[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEYS.BRANDS);
    return stored ? JSON.parse(stored) : [];
};

// Save brands
export const saveBrands = (brands: string[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.BRANDS, JSON.stringify(brands));
};

// Add new brand
export const addBrand = (brandName: string): void => {
    const brands = getBrands();
    if (!brands.includes(brandName)) {
        brands.push(brandName);
        saveBrands(brands.sort());
    }
};
