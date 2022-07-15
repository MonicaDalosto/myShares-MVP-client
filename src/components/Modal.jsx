import '../modal.css';
import { RiCloseLine } from 'react-icons/ri';

const Modal = ({ setIsOpen, submitDeleteForm, name }) => {
  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Dialog</h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: '-3px' }} />
          </button>
          <div className="modalContent">
            This action can't be undo. Are you sure you want to{' '}
            <strong>delete</strong> {name}?
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="deleteBtn" onClick={submitDeleteForm}>
                Delete
              </button>
              <button className="cancelBtn" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Modal };
