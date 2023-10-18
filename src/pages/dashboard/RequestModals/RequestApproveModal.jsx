import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function RequestApproveModal({  isOpen,  setShowEditApproveModal,  selectedRequest,  editedRequest,  setEditedRequest,  handleSaveApproveEdit, request}) {
  // Initialize a state variable for the current date
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10));

  // Function to update the current date if needed
  const updateCurrentDate = () => {
    setCurrentDate(new Date().toISOString().slice(0, 10));
  };
// Set the initial value of Request Status to "Approved"
  if (!editedRequest.request_status) {
    setEditedRequest({ ...editedRequest, request_status: 'Approved' });
  }
  
  return (
    <Modal
            isOpen={isOpen}
            onRequestClose={() => setShowEditApproveModal(false)}
            contentLabel="Edit Request Modal"
            className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black" >
            <div className="bg-white w-1/3 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Approve {" "}
                            <span className="font-bold text-blue-600 underline">
                               Request # {selectedRequest?.id}
                            </span>{" "} for Asset # {selectedRequest?.asset_id} requested by {selectedRequest?.employee_id}</h2>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Procurement Approval Comments</label>
                    <input  type="text" value={editedRequest.procurement_comments} required
                        onChange={e => setEditedRequest({ ...editedRequest, procurement_comments: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div className="flex justify-between">
                <button onClick={handleSaveApproveEdit} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none">
                    Approve
                </button>
                <button onClick={() => setShowEditApproveModal(false)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none">
                    Cancel
                </button>
                </div>
            </div>
        </Modal>
  )
}

export default RequestApproveModal
