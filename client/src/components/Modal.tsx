import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
}

const Modal = ({ children, isOpen }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="overlay fixed inset-0 z-10 bg-[#333333] bg-opacity-50" />
      <div className="fixed bottom-[12%] lg:bottom-[30%] left-[5%] sm:left-[20%] lg:left-[30%]  bg-white z-20 w-[90%] sm:w-[60%] lg:w-[40%]  p-8 rounded-3xl ">
        <div>{children}</div>
      </div>
    </>
  );
};

export default Modal;
