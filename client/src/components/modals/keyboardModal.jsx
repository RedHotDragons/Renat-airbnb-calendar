import React from 'react';

const KeyboardModal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button style={{fontSize: "16px", float:"right"}} className="clear-button" onClick={handleClose}>Back to calendar</button>
      </section>
    </div>
  );
};

export default KeyboardModal;

