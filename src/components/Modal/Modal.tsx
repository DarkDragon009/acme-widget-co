import React from "react";

import { ShoppingCart } from "@/components/ShoppingCart";

const Modal = ({ setOpenModal }: { setOpenModal: Function }) => {
  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal Title</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setOpenModal(false)}
            />
          </div>
          <ShoppingCart />
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setOpenModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
