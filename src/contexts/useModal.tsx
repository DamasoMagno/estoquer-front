"use client";
import { ReactNode, createContext, useContext, useState } from "react";

interface ModalContextProps {
  modalState: "open" | "closed";
  setModalState: (state: "open" | "closed") => void;
  modalContentId: string;
  onSetModalContentId: (id: string) => void;
}

const ModalContext = createContext({} as ModalContextProps);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalState, setModalState] = useState<"open" | "closed">("closed");
  const [modalContentId, setModalContentId] = useState("");

  function setModalContent(id: string) {
    setModalState("open");
    setModalContentId(id);
  }

  return (
    <ModalContext.Provider
      value={{
        modalState,
        setModalState,
        modalContentId,
        onSetModalContentId: setModalContent,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
