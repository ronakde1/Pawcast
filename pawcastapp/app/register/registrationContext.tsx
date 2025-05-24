import React, { createContext, useContext, useState } from 'react';

export type Dog = {
  name: string;
  breed: string;
  age: number;
  imageUri: string;
}

type UserData= {
  name: string;
  location: string;
  dogs: Dog[]
}

type RegistrationContextType = {
  data: UserData;
  setData: React.Dispatch<React.SetStateAction<UserData>>;
};

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<UserData>({ name: "", location: "", dogs: [] });

  return (
    <RegistrationContext.Provider value={{ data, setData }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error("useRegistration must be used within RegistrationProvider");
  }
  return context;
};