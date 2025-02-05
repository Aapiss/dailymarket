import { create } from "zustand";
import { supabase } from "../SupaClient";

export const useAuth = create((set, get) => ({
  user: null,
  auth: false,
  full_name: "",
  role: "",
  email: "",
  avatar_url: "",
  loading: true,

  register: async (full_name, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.log("Something Wrong" + error.message);
    } else {
      try {
        const { error: profRegis } = await supabase.from("profiles").upsert([
          {
            id: data.user.id,
            full_name: full_name,
            email: email,
          },
        ]);

        if (profRegis) {
          console.log("Something Wrong when Update User");
        } else {
          set({
            user: data.user,
            auth: true,
            full_name: full_name,
            email: email,
            loading: false,
          });

          console.log("User has beed added");
        }
      } catch (error) {}
    }
  },

  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("Login Failed");
    } else {
      set({
        user: data.user,
        auth: true,
      });

      console.log("Login Success");
    }
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error.message);
      return;
    }

    set({
      user: null,
      auth: false,
    });
  },

  fetchUser: async () => {
    set({ loading: true });

    const { data } = await supabase.auth.getUser();
    const { user: currentUser } = data;

    if (currentUser) {
      set({ user: currentUser, auth: true });

      // 🔥 Ambil data profil terbaru
      const { data: userData } = await supabase
        .from("profiles")
        .select("full_name, email, avatar_url")
        .eq("id", currentUser.id)
        .single();

      if (userData) {
        set({
          full_name: userData.full_name,
          email: userData.email,
          avatar_url: userData.avatar_url, // 🔥 Update avatar_url
          loading: false,
        });
      }
    } else {
      set({ loading: false });
    }
  },

  fetchUserData: async (userId) => {
    try {
      const { data: userData } = await supabase
        .from("profiles")
        .select("full_name, email, avatar_url") // Tambahkan avatar_url
        .eq("id", userId)
        .single();

      if (userData) {
        set({
          full_name: userData.full_name,
          email: userData.email,
          avatar_url: userData.avatar_url, // Simpan avatar di state
          loading: false,
        });
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
      set({ loading: false });
    }
  },
}));
