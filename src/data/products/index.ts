
import { Product } from "@/contexts/CartContext";
import productsData from "../products.json";

// Define the type for the products data
type ProductsData = Record<string, Product[]>;

// Cast the imported JSON to the correct type
const PRODUCTS_BY_SEDE: ProductsData = productsData as ProductsData;

// Constants for sede names to maintain compatibility with existing code
export const LONDRINA_SEDE = "DOAÇÕES SEDE LONDRINA";
export const LONDRINA2_SEDE = "DOAÇÕES SEDE LONDRINA 2";
export const TERCEIRA_SEDE = "DOAÇÕES SEDE TERCEIRA";
export const QUARTA_SEDE = "DOAÇÕES SEDE QUARTA";

// Export the PRODUCTS_BY_SEDE variable that's being imported in Products.tsx
export { PRODUCTS_BY_SEDE };

// Export products by sede for compatibility with existing code
export const LONDRINA_PRODUCTS = PRODUCTS_BY_SEDE[LONDRINA_SEDE] || [];
export const LONDRINA2_PRODUCTS = PRODUCTS_BY_SEDE[LONDRINA2_SEDE] || [];
export const TERCEIRA_PRODUCTS = PRODUCTS_BY_SEDE[TERCEIRA_SEDE] || [];
export const QUARTA_PRODUCTS = PRODUCTS_BY_SEDE[QUARTA_SEDE] || [];

// Utility function to get unique categories from all products
export function getUniqueCategories(): string[] {
  const categories = new Set<string>();
  
  Object.values(PRODUCTS_BY_SEDE).forEach(products => {
    products.forEach(product => {
      categories.add(product.category);
    });
  });
  
  return Array.from(categories);
}

// Utility function to get all available sedes
export function getAvailableSedes(): string[] {
  return Object.keys(PRODUCTS_BY_SEDE);
}

// Utility function to get all products
export function getAllProducts(): Product[] {
  return Object.values(PRODUCTS_BY_SEDE).flat();
}
