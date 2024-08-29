import React, { useState } from "react";
import Modal from "./Modal";

const Editor = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      {/* <button onClick={() => setIsOpen(!isOpen)}>Toggle Modal</button> */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Hello</h2>
        <div>I am a custom modal</div>
        <form>
          <input placeholder="Type here..." />
          <button>Submit</button>
        </form>
      </Modal>
    </>
  );
};

export default Editor;
