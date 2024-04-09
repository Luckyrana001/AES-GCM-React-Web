import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// Set the string key and the initial value
export const darkModeAtom = atomWithStorage('darkMode', false)

export const isAuthPageAtom = atomWithStorage('isAuthPage', true)
