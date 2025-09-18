import { useNavigate } from 'react-router-dom';
import { useCart } from './useCart';
import { useToast } from './use-toast';
import { Product } from '@/data/products';

export const useCartWithNavigation = () => {
  const { addItem: originalAddItem, ...cartRest } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const addItem = async (product: Product): Promise<boolean> => {
    const handleLoginRequired = () => {
      toast({
        title: "Login Required",
        description: "Please sign in to add items to your cart",
      });
      // Delay navigation slightly to allow toast to show
      setTimeout(() => navigate('/login'), 500);
    };

    return await originalAddItem(product, handleLoginRequired);
  };

  return {
    ...cartRest,
    addItem,
  };
};