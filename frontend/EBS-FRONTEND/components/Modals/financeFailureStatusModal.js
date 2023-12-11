import { useState, useRef } from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FailureModal = ({ modalIsOpen, toggleModal }) => {
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const toastId = useRef(null);

  const onAnimationEnd = () => {
    setAnimationCompleted(true);
  };

  const handleToggle = () => {
    toggleModal();
    setAnimationCompleted(false);
  };

  return (
    <div>
      <style>
        {`
          .failure-icon {
            font-size: 3rem;  /* Adjust the icon size as needed */
            color: #dc3545;   /* Bootstrap danger color */
          }

          .status-message {
            margin-top: 10px;
            font-size: 1.2rem;  /* Adjust the message font size as needed */
            color: #333;        /* Adjust the message color as needed */
          }
        `}
      </style>

      <Modal isOpen={modalIsOpen} toggle={handleToggle} className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <ModalBody>
          <div className="d-flex flex-column align-items-center">
            <i className={`bi bi-x-circle-fill failure-icon ${animationCompleted ? 'animate' : ''}`} onAnimationEnd={onAnimationEnd}></i>
            <p className="font-monospace status-message">Payment Failed</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={handleToggle}>
            Close
          </button>
        </ModalFooter>
        <ToastContainer />
      </Modal>
    </div>
  );
};

export default FailureModal;
