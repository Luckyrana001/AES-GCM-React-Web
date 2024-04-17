import { atomWithStorage } from 'jotai/utils'
import { COLLAPSE_MENU, DARK_MODE, GET_DIALOG_STATUS, GLOBAL_SEARCH, IS_AUTH_PAGE, OPEN_SLIDING_MENU } from '../constants/Constant'

export const darkModeAtom = atomWithStorage(DARK_MODE, false)

export const openSlidingMenu = atomWithStorage(OPEN_SLIDING_MENU, true)
export const showErrorAlertDialog = atomWithStorage(GET_DIALOG_STATUS, false)
export const isAuthPageAtom = atomWithStorage(IS_AUTH_PAGE, true)
export const collapseMenu = atomWithStorage(COLLAPSE_MENU, true)
export const globalSearchText = atomWithStorage(GLOBAL_SEARCH, '')


