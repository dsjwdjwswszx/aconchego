import { useEffect, useState } from "react";
import { Product } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { 
  PRODUCTS_BY_SEDE, 
  getUniqueCategories, 
  getAvailableSedes, 
  getAllProducts 
} from "@/data/products/index";
import SearchFilters from "@/components/SearchFilters";
import ProductList from "@/components/ProductList";
import LocationSelector from "@/components/LocationSelector";

const Products = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSede, setSelectedSede] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  const availableSedes = getAvailableSedes();
  const availableCategories = getUniqueCategories();
  
  useEffect(() => {
    let products: Product[] = [];
    
    if (selectedSede === "all") {
      products = getAllProducts();
    } else {
      products = PRODUCTS_BY_SEDE[selectedSede] || [];
    }
    
    if (selectedCategory !== "all") {
      products = products.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      products = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    products = sortProducts(products, sortOrder);
    
    setFilteredProducts(products);
  }, [searchQuery, selectedSede, selectedCategory, sortOrder]);
  
  const sortProducts = (products: Product[], order: string): Product[] => {
    return [...products].sort((a, b) => {
      switch (order) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "category-asc":
          return a.category.localeCompare(b.category);
        case "category-desc":
          return b.category.localeCompare(a.category);
        default:
          return 0;
      }
    });
  };
  
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedSede("all");
    setSortOrder("name-asc");
  };

  return (
    <div className="container mx-auto px-4 py-8 mb-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-foreground">
        Catálogo de Produtos para Doação
      </h1>
      
      <LocationSelector 
        availableSedes={availableSedes}
        onSedeChange={setSelectedSede}
      />
      
      <SearchFilters 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedSede={selectedSede}
        onSedeChange={setSelectedSede}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        resetFilters={resetFilters}
        availableSedes={availableSedes}
        availableCategories={availableCategories}
      />
      
      <ProductList 
        filteredProducts={filteredProducts}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default Products;
