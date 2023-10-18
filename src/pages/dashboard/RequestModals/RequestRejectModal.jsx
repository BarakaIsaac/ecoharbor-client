import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function RequestRejectModal({  isOpen,  setShowEditRejectModal,  selectedRequest,  editedRequest,  setEditedRequest,  handleSaveRejectEdit, request}) {

// Set the initial value of Request Status to "Rejected"
  if (!editedRequest.request_status) {
    setEditedRequest({ ...editedRequest, request_status: 'Rejected' });
  }

  return (
    <Modal
            isOpen={isOpen}
            onRequestClose={() => setShowEditRejectModal(false)}
            contentLabel="Edit Request Modal"
            className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black" >
            <div className="bg-white w-1/3 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Reject {" "}
                            <span className="font-bold text-blue-600 underline">
                               Request # {selectedRequest?.id}
                            </span>{" "} for Asset # {selectedRequest?.asset_id} requested by {selectedRequest?.employee_id}</h2>
                {/* <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs text-[#2F3D44] mb-2"><strong>Request Date:</strong> {request.request_date}</p>
                        <p className="text-xs text-[#2F3D44] mb-2"><strong>Request Type:</strong> {request.request_type}</p>
                        <p className="text-xs text-[#2F3D44] mb-2"><strong>Employee:</strong> {request.employee_id}</p>
                        <p className="text-xs text-[#2F3D44] mb-2"><strong>Department:</strong> {request.department_id}</p>
                        <p className="text-xs text-[#2F3D44] mb-2"><strong>Urgency:</strong> {request.urgency}</p>
                    </div>
                    <div>
                        <p className="text-xs text-[#2F3D44] mb-2"><strong>Request Status:</strong> {request.request_status}</p>
                        <p className="text-xs text-[#2F3D44] mb-2"><strong>Reason:</strong> {request.reason}</p>
                        <p className="text-xs text-[#2F3D44] mb-2"><strong>Quantity:</strong> {request.quantity}</p>
                    </div> defaultValue={editedRequest.procurement_comments} 
                </div> */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Rejection Comments</label>
                    <input type="text" required
                        onChange={e => setEditedRequest({ ...editedRequest, procurement_comments: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                {/* <div>
                    <label className="block text-sm font-medium text-gray-700">Request Status</label>
                    <input  type="text" value="Rejected" 
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div> */}
                {/* <div>
                    <label className="block text-sm font-medium text-gray-700">Approval Date</label>
                    <input type="text" value={editedRequest.approval_date ? editedRequest.approval_date : null} 
                        onChange={(e) =>
                            setEditedRequest({
                                ...editedRequest, approval_date: e.target.value !== '' ? e.target.value : null,
                            })
                            }
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div> */}
                <div className="flex justify-between">
                <button onClick={handleSaveRejectEdit} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none">
                    Reject
                </button>
                <button onClick={() => setShowEditRejectModal(false)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none">
                    Cancel
                </button>
                </div>
            </div>
        </Modal>
  )
}

export default RequestRejectModal
