import { create } from "zustand";
import { supabase } from "../SupaClient";

export const useCart = create((set, get) => ({
  cart: [],

  fetchCart: async () => {
    const { data, error } = await supabase
      .from("cart")
      .select("*, item(image_item)");

    if (!error) {
      set({ cart: data });
    }
  },

  addToCart: async (item) => {
    const { cart, fetchCart } = get();
    const existingItem = cart.find((i) => i.id_product === item.id_product);

    if (existingItem) {
      const updateItem = {
        ...existingItem,
        amount: existingItem.amount + 1,
        price: (existingItem.amount + 1) * item.price,
      };

      const { error } = await supabase
        .from("cart")
        .update({
          amount: updateItem.amount,
          price: updateItem.price,
        })
        .eq("id", existingItem.id);

      if (!error) {
        set((state) => ({
          cart: state.cart.map((cartItem) =>
            cartItem.id === existingItem.id ? updateItem : cartItem
          ),
        }));
      }
    } else {
      const { error } = await supabase
        .from("cart")
        .insert([item], { returning: "minimal" });

      if (!error) {
        await fetchCart(); // Panggil fetchCart agar state diperbarui dengan data terbaru
      }
    }
  },

  removeFromCart: async (idProduct) => {
    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("id_product", idProduct);

    if (!error) {
      set((state) => ({
        cart: state.cart.filter((item) => item.id_product !== idProduct),
      }));
    }
  },

  getTotalUniqueItems: () => {
    return new Set(get().cart.map((item) => item.id_product)).size;
  },
}));
