import { FileText, Tag, X, Plus } from "lucide-react";
import RichTextEditor from "./RichTextEditor";
import { useState, useEffect } from "react";
import { getCategories, addCategory, addSubcategory, getBrands, addBrand, type Category } from "@/lib/categoryManager";

interface Product {
    id?: string;
    title?: string;
    price?: number;
    originalPrice?: number;
    category?: string;
    subcategory?: string;
    brand?: string;
    sku?: string;
    rating?: number;
    totalReviews?: number;
    image?: string;
    features?: string[];
    assured?: boolean;
}

interface ProductFormFieldsProps {
    product: Product;
    setProduct: (product: Product) => void;
    description: string;
    setDescription: (desc: string) => void;
    tags: string[];
    setTags: (tags: string[]) => void;
}

export default function ProductFormFields({ product, setProduct, description, setDescription, tags, setTags }: ProductFormFieldsProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [showNewCategory, setShowNewCategory] = useState(false);
    const [showNewSubcategory, setShowNewSubcategory] = useState(false);
    const [showNewBrand, setShowNewBrand] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newSubcategoryName, setNewSubcategoryName] = useState("");
    const [newBrandName, setNewBrandName] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setCategories(getCategories());
            setBrands(getBrands());
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const handleAddCategory = () => {
        if (newCategoryName.trim()) {
            addCategory(newCategoryName.trim());
            setCategories(getCategories());
            setProduct({ ...product, category: newCategoryName.trim(), subcategory: "" });
            setNewCategoryName("");
            setShowNewCategory(false);
        }
    };

    const handleAddSubcategory = () => {
        if (newSubcategoryName.trim() && product.category) {
            addSubcategory(product.category, newSubcategoryName.trim());
            setCategories(getCategories());
            setProduct({ ...product, subcategory: newSubcategoryName.trim() });
            setNewSubcategoryName("");
            setShowNewSubcategory(false);
        }
    };

    const handleAddBrand = () => {
        if (newBrandName.trim()) {
            addBrand(newBrandName.trim());
            setBrands(getBrands());
            setProduct({ ...product, brand: newBrandName.trim() });
            setNewBrandName("");
            setShowNewBrand(false);
        }
    };

    const selectedCategory = categories.find(c => c.name === product.category);

    return (
        <>
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
                <input
                    type="text"
                    value={product.title}
                    onChange={(e) => setProduct({ ...product, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter product title"
                />
            </div>

            <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Product Description
                </label>
                <RichTextEditor
                    value={description}
                    onChange={setDescription}
                    placeholder="Enter detailed product description..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price (Tk)</label>
                <input
                    type="number"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Original Price (Tk)</label>
                <input
                    type="number"
                    value={product.originalPrice}
                    onChange={(e) => setProduct({ ...product, originalPrice: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                {!showNewCategory ? (
                    <div className="flex gap-2">
                        <select
                            value={product.category || ""}
                            onChange={(e) => setProduct({ ...product, category: e.target.value, subcategory: "" })}
                            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="">Select category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={() => setShowNewCategory(true)}
                            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            title="Add new category"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="Enter new category"
                            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                            autoFocus
                        />
                        <button
                            type="button"
                            onClick={handleAddCategory}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Add
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowNewCategory(false);
                                setNewCategoryName("");
                            }}
                            className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
                {!showNewSubcategory ? (
                    <div className="flex gap-2">
                        <select
                            value={product.subcategory || ""}
                            onChange={(e) => setProduct({ ...product, subcategory: e.target.value })}
                            disabled={!product.category}
                            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-50"
                        >
                            <option value="">Select subcategory</option>
                            {selectedCategory?.subcategories.map((sub, idx) => (
                                <option key={idx} value={sub}>{sub}</option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={() => setShowNewSubcategory(true)}
                            disabled={!product.category}
                            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Add new subcategory"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newSubcategoryName}
                            onChange={(e) => setNewSubcategoryName(e.target.value)}
                            placeholder="Enter new subcategory"
                            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            onKeyPress={(e) => e.key === 'Enter' && handleAddSubcategory()}
                            autoFocus
                        />
                        <button
                            type="button"
                            onClick={handleAddSubcategory}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Add
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowNewSubcategory(false);
                                setNewSubcategoryName("");
                            }}
                            className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                {!showNewBrand ? (
                    <div className="flex gap-2">
                        <select
                            value={product.brand || ""}
                            onChange={(e) => setProduct({ ...product, brand: e.target.value })}
                            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="">Select brand</option>
                            {brands.map((brand, idx) => (
                                <option key={idx} value={brand}>{brand}</option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={() => setShowNewBrand(true)}
                            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            title="Add new brand"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newBrandName}
                            onChange={(e) => setNewBrandName(e.target.value)}
                            placeholder="Enter new brand"
                            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            onKeyPress={(e) => e.key === 'Enter' && handleAddBrand()}
                            autoFocus
                        />
                        <button
                            type="button"
                            onClick={handleAddBrand}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Add
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowNewBrand(false);
                                setNewBrandName("");
                            }}
                            className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                <input
                    type="text"
                    value={product.sku || ""}
                    onChange={(e) => setProduct({ ...product, sku: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating (0-5)</label>
                <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={product.rating || 0}
                    onChange={(e) => setProduct({ ...product, rating: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>

            <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Tags
                </label>
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {tags.map((tag, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                {tag}
                                <X className="w-3 h-3 cursor-pointer" onClick={() => setTags(tags.filter((_, i) => i !== idx))} />
                            </span>
                        ))}
                    </div>
                )}
                <input
                    type="text"
                    placeholder="Add tag and press Enter"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            const input = e.target as HTMLInputElement;
                            if (input.value.trim()) {
                                setTags([...tags, input.value.trim()]);
                                input.value = '';
                            }
                        }
                    }}
                />
            </div>
        </>
    );
}
