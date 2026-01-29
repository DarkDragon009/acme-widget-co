import React from "react";

import { ShoppingCart } from "@/components/ShoppingCart";

export type ModalProps = {
  setOpenModal: Function;
  children: React.ReactNode;
};

const Modal = ({ setOpenModal, children }: ModalProps) => {
  return (
    <div
      className="modal fade show d-block bg-modal"
      tabIndex={-1}
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Shopping Cart</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setOpenModal(false)}
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
