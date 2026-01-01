// Price ranges for filters - keep this for filter UI
export const filters = {
    categories: [] as { id: string; name: string }[],
    brands: [] as string[],
    priceRanges: [
        { label: "Under Tk 1,000", min: 0, max: 1000 },
        { label: "Tk 1,000 - Tk 5,000", min: 1000, max: 5000 },
        { label: "Tk 5,000 - Tk 10,000", min: 5000, max: 10000 },
        { label: "Above Tk 10,000", min: 10000, max: 999999 },
    ],
};
