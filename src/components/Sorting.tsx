

export function descendingComparator (a:any, b:any, orderBy:any) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }
  
  export function getComparator (order:any, orderBy:any) {
    return order === 'desc'
      ? (a:any, b:any) => descendingComparator(a, b, orderBy)
      : (a:any, b:any) => -descendingComparator(a, b, orderBy)
  }
  
  export function stableSort (array:any, comparator:any) {
    const stabilizedThis = array.map((el:any, index:any) => [el, index])
    stabilizedThis.sort((a:any, b:any) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) {
        return order
      }
      return a[1] - b[1]
    })
    return stabilizedThis.map((el:any) => el[0])
  }
  