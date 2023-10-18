import React from 'react'
import Modal from 'react-modal';

function RequestDeleteModal({showDeleteModal, setShowDeleteModal, selectedRequest, handleConfirmDelete}) {
  return (
    <Modal
                isOpen={showDeleteModal}
                onRequestClose={() => setShowDeleteModal(false)}
                className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black"
            >
                <div className="bg-white w-1/3 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Delete Request</h2>
                    <p className="text-gray-700 mb-4 text-center">
                            Are you sure you want to delete request #{" "}
                            <span className="font-bold text-blue-600">
                                {selectedRequest?.request_id}
                            </span>{" "}
                            by {" "}
                            <span className="font-bold text-blue-600">
                                {selectedRequest?.employee_id}
                            </span>
                            ?
                            </p>
                    <div className="flex justify-between">
                        <button onClick={handleConfirmDelete} className="bg-red-500 text-white py-2 px-4 rounded-md text-xs hover:bg-red-600 focus:outline-none">
                            Delete
                        </button>
                        <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md text-xs hover:bg-gray-400 focus:outline-none">
                            Cancel
                        </button>
                    </div>
                   
                </div>
        </Modal>

  )
}

export default RequestDeleteModal
