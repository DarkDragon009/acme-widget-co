import React from "react";

export type TModalProps = {
  setOpenModal: Function;
  children?: React.ReactNode;
};

const Modal: React.FC<TModalProps> = ({ setOpenModal, children }) => {
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
