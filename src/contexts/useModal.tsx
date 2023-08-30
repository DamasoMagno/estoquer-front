"use client";
import { ReactNode, createContext, useContext, useState } from "react";

interface ModalContextProps {
  modalIsOpen: boolean;
  onSetModalIsOpen(isOpen: boolean): void;
}

const ModalContext = createContext({} as ModalContextProps);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <ModalContext.Provider
      value={{
        modalIsOpen,
        onSetModalIsOpen: setModalIsOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
