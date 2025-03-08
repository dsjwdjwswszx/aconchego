
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
};

export type DeliveryMethod = 'retirada' | 'entrega' | null;

type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  totalItems: number;
  deliveryMethod: DeliveryMethod;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'SET_DELIVERY_METHOD'; payload: DeliveryMethod }
  | { type: 'CLEAR_CART' };

type CartContextType = {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  clearCart: () => void;
  calculateTotal: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item => 
            item.product.id === action.payload.id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          ),
          totalItems: state.totalItems + 1
        };
      } else {
        return {
          ...state,
          items: [...state.items, { product: action.payload, quantity: 1 }],
          totalItems: state.totalItems + 1
        };
      }
    }
    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(item => item.product.id === action.payload);
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload),
        totalItems: state.totalItems - (itemToRemove?.quantity || 0)
      };
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const oldItem = state.items.find(item => item.product.id === id);
      const quantityDiff = quantity - (oldItem?.quantity || 0);
      
      return {
        ...state,
        items: state.items.map(item => 
          item.product.id === id ? { ...item, quantity } : item
        ),
        totalItems: state.totalItems + quantityDiff
      };
    }
    case 'SET_DELIVERY_METHOD': {
      return {
        ...state,
        deliveryMethod: action.payload
      };
    }
    case 'CLEAR_CART':
      return {
        items: [],
        totalItems: 0,
        deliveryMethod: null
      };
    default:
      return state;
  }
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { 
    items: [], 
    totalItems: 0,
    deliveryMethod: null
  });

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const setDeliveryMethod = (method: DeliveryMethod) => {
    dispatch({ type: 'SET_DELIVERY_METHOD', payload: method });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const calculateTotal = () => {
    // Se o método de entrega não for 'entrega', não há custos adicionais
    if (state.deliveryMethod !== 'entrega') {
      return 0;
    }
    
    // Base delivery fee is R$200
    let total = 200;
    
    // Contabilizar número total de itens (somando todas as quantidades)
    const totalQuantity = state.items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    
    // Adicionar R$25 para CADA produto após os primeiros 5
    if (totalQuantity > 5) {
      // Número de produtos extras além dos 5 iniciais
      const extraItems = totalQuantity - 5;
      // Adicionar R$25 por cada item extra
      total += extraItems * 25;
    }
    
    console.log('Quantidade total de produtos:', totalQuantity);
    console.log('Produtos extras:', Math.max(0, totalQuantity - 5));
    console.log('Total calculado:', total);
    
    return total;
  };

  return (
    <CartContext.Provider 
      value={{ 
        state, 
        addItem, 
        removeItem, 
        updateQuantity,
        setDeliveryMethod,
        clearCart,
        calculateTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
