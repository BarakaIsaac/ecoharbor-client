import React from 'react'
import Modal from 'react-modal';

function RequestApproveModal({  showEditModal,  setShowEditModal,  selectedRequest,  editedRequest,  setEditedRequest,  handleSaveEdit,}) {
  return (
    <Modal
            isOpen={showEditModal}
            onRequestClose={() => setShowEditModal(false)}
            contentLabel="Edit Request Modal"
            className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black" >
            <div className="bg-white w-1/3 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Approve {" "}
                            <span className="font-bold text-blue-600 underline">
                               Request # {selectedRequest?.id}
                            </span>{" "} for Asset # {selectedRequest?.asset_id} requested by {selectedRequest?.employee_id}</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Urgency</label>
                    <select value={editedRequest.urgency}
                        onChange={e => setEditedRequest({ ...editedRequest, urgency: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" >
                        <option value="High" style={{ fontWeight: 'bold', color: 'red' }}>High</option>
                        <option value="Critical" style={{ fontWeight: 'bold', color: 'red' }}>Critical</option>
                        <option value="Medium" style={{ fontWeight: 'bold', color: 'blue' }}>Medium</option>
                        <option value="Low" style={{ color: 'black' }}>Low</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                    type="number"
                    value={editedRequest.quantity}
                    onChange={e => setEditedRequest({ ...editedRequest, quantity: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Reason</label>
                    <input
                    type="text"
                    value={editedRequest.reason}
                    onChange={e => setEditedRequest({ ...editedRequest, reason: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Request Date</label>
                    <div className="block w-full mt-1 p-2 border rounded-md bg-gray-100">
                        {editedRequest.request_date}
                    </div>
                </div>
                <div className="flex justify-between">
                <button onClick={handleSaveEdit} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none">
                    Update
                </button>
                <button onClick={() => setShowEditModal(false)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none">
                    Cancel
                </button>
                </div>
            </div>
        </Modal>
  )
}

export default RequestApproveModal
