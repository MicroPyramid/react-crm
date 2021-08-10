import {
  TOGGLE_COLLAPSED_NAV,
  TOGGLE_TABLE_SCRUMBOARD
} from '../constants/Theme'

const initTheme = {
  navCollapsed: false,
  toggleTable: true
}

const theme = (state = initTheme, action) => {
  switch (action.type) {
    case TOGGLE_COLLAPSED_NAV: 
      return {
        ...state,
        navCollapsed: action.navCollapsed
      }
      case TOGGLE_TABLE_SCRUMBOARD:
        return {
          ...state,
          toggleTable: action.value
        }
    default:
      return state
  }
}

export default theme