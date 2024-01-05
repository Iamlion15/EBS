import { useState, useRef } from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StatusModal = ({ modalIsOpen, toggleModal }) => {
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
          .success-icon {
            font-size: 3rem;  /* Adjust the icon size as needed */
            color: #28a745;   /* Bootstrap success color */
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
            <i className={`bi bi-check-circle-fill success-icon ${animationCompleted ? 'animate' : ''}`} onAnimationEnd={onAnimationEnd}></i>
            <p className="font-monospace status-message">Successfully paid vendor</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={handleToggle}>
            Close
          </button>
        </ModalFooter>
        <ToastContainer />
      </Modal>
    </div>
  );
};

export default StatusModal;
