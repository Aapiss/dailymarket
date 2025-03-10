import { create } from "zustand";
import { supabase } from "../SupaClient";

export const useAuth = create((set) => ({
  user: null,
  auth: false,
  full_name: "",
  role: "",
  loading: true,

  register: async (fullName, email, password) => {
    const { data } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.log("Something Wrong" + error.message);
    } else {
      try {
        const { error: profileRegister } = await supabase
          .from("profiles")
          .upsert([
            {
              id: data.user.id,
              full_name: fullName,
              email: email,
            },
          ]);

        if (profileRegister) {
          console.log("Something Wrong When Updated User");
        } else {
          set({
            user: data.user,
            auth: true,
            full_name: fullName,
            loading: false,
          });
          console.log("User Successfully Registered");
        }
      } catch (error) {
        console.log("Something Wrong" + error.message);
      }
    }
  },
}));
