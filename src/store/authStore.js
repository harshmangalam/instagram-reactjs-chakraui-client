import create from "zustand";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "AUTHENTICATED":
      return {
        isAuthenticated: payload,
      };

    case "CURRENT_USER":
      return {
        currentUser: payload,
      };

    case "LOADING":
      return {
        loading: payload,
      };
  }
};

const useAuth = create((set) => ({
  loading: true,
  isAuthenticated: false,
  currentUser: null,

  dispatch: (args) => set((state) => reducer(state, args)),
}));

export default useAuth;
