import React, { createContext, useContext, useState } from 'react';

const ItemCountContext = createContext();

export const ItemCountProvider = ({ children }) => {
  const [itemCount, setItemCount] = useState(0);

  return (
    <ItemCountContext.Provider value={{ itemCount, setItemCount }}>
      {children}
    </ItemCountContext.Provider>
  );
};

export const useItemCount = () => {
  const context = useContext(ItemCountContext);
  if (!context) {
    throw new Error('useItemCount must be used within an ItemCountProvider');
  }
  return context;
};
