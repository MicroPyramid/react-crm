import {
  TOGGLE_COLLAPSED_NAV,
  TOGGLE_TABLE_SCRUMBOARD
} from '../constants/Theme'

export function toggleCollapsedNav(navCollapsed) {  
  return {
    type: TOGGLE_COLLAPSED_NAV,
    navCollapsed
  };
}

export function toggleTableScrumBoard(value) {
  return {
    type: TOGGLE_TABLE_SCRUMBOARD,
    value
  }
}