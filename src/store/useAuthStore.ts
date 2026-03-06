import { create } from "zustand";

interface AuthState {
    routeSignupPage: boolean;
    setRouteSignupPage: (val: boolean) => void;
    isSignedOut: boolean;
    setSignedOut: (val: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
    routeSignupPage: false,
    setRouteSignupPage: (val) => set({ routeSignupPage: val }),
    isSignedOut: false,
    setSignedOut: (val) => set({ isSignedOut: val })
}));