

import { create } from 'zustand'

export type TUseSpinnerGlobal = {
    spinnerActive: boolean,
    setSpinnerActive: () => void,
    resetSpinner: () => void,
}

export const useSpinnerGlobal = create<TUseSpinnerGlobal>((set) => ({
    spinnerActive: false,
    setSpinnerActive: () => set({ spinnerActive: true }),
    resetSpinner: () => set({ spinnerActive: false }),
}))
