import { createContext, useContext } from 'react';

const MyContext = createContext<any>(undefined);

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('');
  }
  return context;
};

export default MyContext;
