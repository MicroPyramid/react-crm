import styled from "@emotion/styled";
import { Button, css, Fab, IconButton, ListItem, ListItemButton, ListItemText, Select, Switch, Tab, TableCell, tableCellClasses, TableRow, TextField, Toolbar } from "@mui/material";
// import css from "styled-jsx/css";

export const GoogleButton = styled(Button)`
  text-decoration: none;
  text-transform: none;
  color: black;
  border: 1px solid #80808073
`;

export const CustomToolbar = styled(Toolbar)`
  height: 50px !important;
  min-height: 50px !important;
  max-height: 50px !important;
  display: flex;
  justify-content: space-between;
  background-color: #1A3353;
`;
export const CustomTab = styled(Tab)`
  height: 36px !important;
  min-height: 36px !important;
  max-height: 36px !important;
  text-transform: none;
  font-weight: bold;
  font-size: 15px;
  padding: 0px 15px;
  border-radius: 5px 5px 0px 0px;
`;

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'white',
    color: '#1A3353'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#F2F2F7'
  },
  color: '#1A3353',
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

export const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)'
    }
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor:
          //  theme.palette.mode === 'dark' ? '#177ddc' :
          '#1890ff'
      }
    }
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      // theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' :
      'rgba(0,0,0,.25)',
    boxSizing: 'border-box'
  }
}))
export const StyledListItem = styled(ListItem)`
  
`;

export const StyledListItemButton = styled(ListItemButton)`
  &.Mui-selected {
    color: #3e79f7;
  }
  &:hover {
    background-color: #3e79f717;
  }
`;
export const StyledListItemText = styled(ListItemText)`
  & .MuiListItemText-primary {
    font-weight: 500;
  }
`;
export const textFieldStyledc = css`
  .root {
    border-left: 2px solid red;
    height: 40px;
  }
  .fieldHeight {
    height: 40px;
  }
  .rootBox {
    border-left: 2px solid red;
    height: 38px;
  }
`;
export const TextFieldStyled = styled.div`
.root {
  border-left: 2px solid red;
  height: 40px;
}
.fieldHeight {
  height: 40px;
}
.rootBox {
  border-left: 2px solid red;
  height: 38px;
}
`;

export const RequiredTextField = styled(TextField)`
  fieldset {
    border-left: 3px solid red;
    border-bottom-left-radius: 0px;
    border-top-left-radius: 0px;
    padding-left: 12px;
  }
`;
export const RequiredSelect = styled(Select)`
  fieldset {
    border-left: 3px solid red;
    border-bottom-left-radius: 0px;
    border-top-left-radius: 0px;
    padding-left: 12px;
  }
`;

export const CustomSelectTextField = styled(TextField)`
  position: relative;
  height: 40px;
  max-height: 40px;

  /* Custom dropdown arrow */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 8px; /* Adjust the right position based on your design */
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid #888; /* Set the desired grey color */
    transform: translateY(-50%);
    pointer-events: none;
  }

  /* Optional: Hide default arrow */
  & select::-ms-expand {
    display: none;
  }
  & select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding-right: 24px; /* Allow space for custom arrow */
  }
`;
export const CustomSelectField = styled(TextField)`
.MuiSelect-icon {
  background-color: #d3d3d34a;
  width: 46px;
  height: 38px;
  margin-top: -7px;
  margin-right: -7px;
}
`;
export const CustomSelectField1 = styled(TextField)`
.MuiSelect-icon {
  background-color: #d3d3d34a;
  width: 30px;
  height: 30px;
  margin-top: -3px;
  margin-right: -7px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
`;
export const StyledSelect = styled(Select)`
  & .MuiSelect-icon {
    background-color: #d3d3d34a;
    width: 36px;
    height: 36px;
    margin-top: -7px;
    margin-right: -7px;
  }
`;
// const CustomTextField = styled(({ arrowIcon, ...rest }) => <TextField {...rest} />)`
//   position: relative;
//   height: 40px;
//   max-height: 40px;

//   /* Custom dropdown arrow */
//   &::after {
//     content: '';
//     position: absolute;
//     top: 50%;
//     right: 8px; /* Adjust the right position based on your design */
//     width: 0;
//     height: 0;
//     border-top: 6px solid transparent;
//     border-bottom: 6px solid transparent;
//     border-left: 6px solid #888; /* Set the desired grey color */
//     transform: translateY(-50%);
//     pointer-events: none;
//   }

//   /* Optional: Hide default arrow */
//   & select::-ms-expand {
//     display: none;
//   }
//   & select {
//     -webkit-appearance: none;
//     -moz-appearance: none;
//     appearance: none;
//     padding-right: 24px; /* Allow space for custom arrow */
//   }
// `;
export const FabLeft = styled(Fab)({
  height: '40px',
  minHeight: '40px',
  width: '20px',
  minWidth: '20px',
  borderRadius: '7px 0px 0px 7px',
  backgroundColor: 'whitesmoke',
  marginRight:'7px',
  boxShadow:`0px 1px 1px -1px rgba(0,0,0,0.2), 0px 0px 3px 0px rgba(0,0,0,0.14), 0px 1px 0px 0px rgba(0,0,0,0.12)`
});
export const FabRight = styled(Fab)({
  height: '40px',
  minHeight: '40px',
  width: '20px',
  minWidth: '20px',
  borderRadius: '0px 7px 7px 0px',
  backgroundColor: 'whitesmoke',
  marginLeft:'7px',
  boxShadow:`0px 1px 1px -1px rgba(0,0,0,0.2), 0px 0px 3px 0px rgba(0,0,0,0.14), 0px 1px 0px 0px rgba(0,0,0,0.12)`
});
export const CustomPopupIcon = styled(IconButton)`
  cursor: pointer !important;
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
  width: 40px;
  height: 40px;
  border-radius: 0;
  background-color: #d3d3d34a;
  .MuiTouchRipple-root, .Mui-focusVisible, .MuiRipple-root {
    display: none;
  }
  &:hover {
    border-radius: 0 !important;
    background-color: whitesmoke;
  }
`;