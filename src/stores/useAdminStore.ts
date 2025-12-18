import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
  avatar?: string;
  phone?: string;
  createdAt: string;
}

interface AdminState {
  // Sidebar state
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  
  // Active module
  activeModule: string;
  setActiveModule: (module: string) => void;
  
  // Theme
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  
  // Search
  globalSearch: string;
  setGlobalSearch: (search: string) => void;
  
  // Notifications
  notifications: any[];
  addNotification: (notification: any) => void;
  clearNotifications: () => void;
  
  // Selected items for bulk actions
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
  toggleSelectedItem: (id: string) => void;
  clearSelectedItems: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      activeModule: 'dashboard',
      setActiveModule: (module) => set({ activeModule: module }),
      
      theme: 'system',
      setTheme: (theme) => set({ theme }),
      
      globalSearch: '',
      setGlobalSearch: (search) => set({ globalSearch: search }),
      
      notifications: [],
      addNotification: (notification) =>
        set((state) => ({ notifications: [notification, ...state.notifications] })),
      clearNotifications: () => set({ notifications: [] }),
      
      selectedItems: [],
      setSelectedItems: (items) => set({ selectedItems: items }),
      toggleSelectedItem: (id) =>
        set((state) => ({
          selectedItems: state.selectedItems.includes(id)
            ? state.selectedItems.filter((item) => item !== id)
            : [...state.selectedItems, id],
        })),
      clearSelectedItems: () => set({ selectedItems: [] }),
    }),
    {
      name: 'admin-storage',
      partialize: (state) => ({ theme: state.theme, sidebarOpen: state.sidebarOpen }),
    }
  )
);
