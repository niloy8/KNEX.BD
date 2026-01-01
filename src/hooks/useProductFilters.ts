import { useState } from "react";
import { filters } from "@/data/productsData";

/**
 * Hook for managing product filter state
 * Note: This hook is deprecated. The products page now uses API-based filtering directly.
 * Keeping for backwards compatibility with any components that might use it.
 */
export function useProductFilters() {
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([]);
    const [sortBy, setSortBy] = useState("popularity");
    const [tempBrands, setTempBrands] = useState<string[]>([]);
    const [tempPriceRange, setTempPriceRange] = useState<number[]>([]);

    const toggleBrand = (brand: string, isMobile = false) => {
        if (isMobile) {
            setTempBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
        } else {
            setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
        }
    };

    const togglePriceRange = (index: number, isMobile = false) => {
        if (isMobile) {
            setTempPriceRange(prev => prev.includes(index) ? prev.filter(i => i !== index) : [index]);
        } else {
            setSelectedPriceRange(prev => prev.includes(index) ? prev.filter(i => i !== index) : [index]);
        }
    };

    const clearAllFilters = () => {
        setSelectedBrands([]);
        setSelectedPriceRange([]);
        setTempBrands([]);
        setTempPriceRange([]);
    };

    const openMobileFilters = () => {
        setTempBrands(selectedBrands);
        setTempPriceRange(selectedPriceRange);
    };

    const applyMobileFilters = () => {
        setSelectedBrands(tempBrands);
        setSelectedPriceRange(tempPriceRange);
    };

    const closeMobileFilters = () => {
        setTempBrands(selectedBrands);
        setTempPriceRange(selectedPriceRange);
    };

    return {
        selectedBrands,
        selectedPriceRange,
        tempBrands,
        tempPriceRange,
        sortBy,
        priceRanges: filters.priceRanges,
        setSortBy,
        toggleBrand,
        togglePriceRange,
        clearAllFilters,
        openMobileFilters,
        applyMobileFilters,
        closeMobileFilters,
        setTempBrands,
        setTempPriceRange,
    };
}
