import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
  },

  // ✅ Add this
  updateProfile: async (name) => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "https://forums-backend-production-b81e.up.railway.app/auth/update-profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      }
    );

    if (!res.ok) throw new Error("Update failed");

    const data = await res.json();
    set({ user: { ...get().user, name: data.user?.name || name } });
  },

checkAuth: async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      set({ user: null, loading: false });
      return;
    }

    const res = await fetch(
      "https://forums-backend-production-b81e.up.railway.app/auth/verify",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      set({ user: null, loading: false });
      return;
    }

    const data = await res.json();
    set({ user: data.user, loading: false });
  } catch (err) {
    set({ user: null, loading: false });
  }
},
 }));
export default useAuthStore;