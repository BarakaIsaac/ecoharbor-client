import React from 'react'
import Modal from 'react-modal';

Modal.setAppElement('#root');

function AssetDeleteModal({ isOpen, onClose, onConfirm, assetName }) {
  return (
    <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black" >
                <div className="bg-white w-1/3 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Delete Asset</h2>
                    <p className="text-gray-700 mb-4 text-center"> Are you sure you want to delete the{" "} <span className="font-bold text-blue-600">
                        {assetName} </span>{" "}?</p>
                    <div className="flex justify-between">
                        <button onClick={onConfirm} className="bg-red-500 text-white py-2 px-4 rounded-md text-xs hover:bg-red-600 focus:outline-none">
                            Delete
                        </button>
                        <button onClick={onClose} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md text-xs hover:bg-gray-400 focus:outline-none">
                            Cancel
                        </button>
                    </div>
                  
                </div>
        </Modal>
      
    </div>
  )
}

export default AssetDeleteModal
