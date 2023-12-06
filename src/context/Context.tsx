import { createContext, useContext } from 'react';

// interface MyContextData {
//   screen: string;
//   drawerWidth: number;
  // count: number;
  // updateCount: (newCount: number) => void;
// }

const MyContext = createContext<any>(undefined);

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('');
  }
  return context;
};

export default MyContext;
