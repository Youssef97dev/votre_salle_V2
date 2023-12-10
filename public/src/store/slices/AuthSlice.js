export const createAuthSlice = (set, get) => ({
  isAuthModalOpen: false,
  isLoggedIn: false,
  sidebarMenuOpen: false,
  userInfo: null,
  setAuthModal: () => {
    set({ isAuthModalOpen: !get().isAuthModalOpen });
  },
  setIsLoggedIn: (status) => {
    set({ isLoggedIn: status });
  },
  setUserInfo: (userInfo) => {
    set({ userInfo });
  },
  setSidebarMenuOpen: (status) => {
    set({ sidebarMenuOpen: status });
  },
});
