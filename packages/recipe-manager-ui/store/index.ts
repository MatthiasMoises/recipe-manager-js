import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist, createJSONStorage } from 'zustand/middleware'

type State = {
  username: string
  authToken: string
}

type Actions = {
  updateUsername: (username: string) => void
  updateAuthToken: (authToken: string) => void
  reset: () => void
}

const initialState: State = {
  username: '',
  authToken: ''
}

export const useStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      username: '',
      authToken: '',
      updateUsername: (username: string) =>
        set((state) => {
          state.username = username
        }),
      updateAuthToken: (authToken: string) =>
        set((state) => {
          state.authToken = authToken
        }),
      reset() {
        set(initialState)
      },
    })),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
