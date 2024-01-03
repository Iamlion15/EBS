import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const ReadCommentModal = ({ isOpen, toggle, comment }) => {
  return (
    <div>
    <style>
      {`
        .status-message {
          margin-top: 10px;
          font-size: 1.2rem;  
        }
      `}
    </style>
    <Modal isOpen={isOpen} toggle={toggle} size="md">
      <ModalHeader toggle={toggle}>
        <h4 className="text-primary">Read Comment</h4>
      </ModalHeader>
      <ModalBody>
      <div className="d-flex flex-column align-items-start">
        <p className="font-monospace status-message">{comment}</p>
        </div>
      </ModalBody>
      <div className="d-flex justify-content-end mx-2 my-2">
            <button className="btn btn-sm btn-light" onClick={toggle}>
              Close
            </button>
          </div>
    </Modal>
    </div>
  );
};

export default ReadCommentModal;
