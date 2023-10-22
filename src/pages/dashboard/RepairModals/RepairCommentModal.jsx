import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const RepairCommentModal = ({ isOpen, onClose, repair, editedRepairComment, setEditedRepairComment, onUpdateClick }) => {
  const customModalStyles = {
    overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 },
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      height: '35%',
      maxHeight: '800px',
      width: '80%',
      maxWidth: '700px',
      padding: '20px',
      border: 'none',
      borderRadius: '0.25rem',
      backgroundColor: 'white',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    },
  };

  const { asset_name, department_name } = repair || {}; // Default to an empty object if repair is null

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Repair Comment Modal" style={customModalStyles}>
      <h2 className="text-2xl font-semibold mb-4">Repair Comments</h2>
      <div>
        <p>Asset Name: {asset_name }</p>
        <p>Department: {department_name }</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Checkout Date</label>
        <input
          type="date"
          value={editedRepairComment.checkout_date} 
          onChange={(e) => setEditedRepairComment({ ...editedRepairComment, checkout_date: e.target.value })}      
          className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Repair Comments</label>
        <textarea
          value={editedRepairComment.repair_comments}
          onChange={(e) => setEditedRepairComment({ ...editedRepairComment, repair_comments: e.target.value })}
          className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="flex justify-between">
        <button onClick={() => { onUpdateClick(); onClose(); }} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none">
            Update
            </button>
        <button onClick={onClose} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover-bg-gray-400 focus:outline-none">
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default RepairCommentModal;