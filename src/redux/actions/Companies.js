import { COMPANIES_LIST } from '../constants/Companies'

export const getCompaniesData = (data) => {
  return {
    type: COMPANIES_LIST,
    data
  }
}
