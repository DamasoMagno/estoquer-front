"use client";
import { ReactNode, createContext, useContext, useState } from "react";

interface ModalContextProps {
  modalIsOpen: boolean;
  modalOrderId: number;
  onSetModalIsOpen(isOpen: boolean): void;
  onSetModalOrderId(id: number): void;
  onCloseModal(): void;
}

const ModalContext = createContext({} as ModalContextProps);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalOrderId, setModalOrderId] = useState<number>(0);

  function openModalToUpdateOrder(id: number) {
    setModalIsOpen(true);
    setModalOrderId(id);
  }

  function closeModalOrder() {
    setModalOrderId(0);
    setModalIsOpen(false);
  }

  return (
    <ModalContext.Provider
      value={{
        modalIsOpen,
        modalOrderId,
        onSetModalIsOpen: setModalIsOpen,
        onSetModalOrderId: openModalToUpdateOrder,
        onCloseModal: closeModalOrder
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
