import React from 'react'
import Modal from 'react-modal';

Modal.setAppElement('#root');

function AssetValuationModal({showEditValuationModal, setShowEditValuationModal, selectedAsset, editedAsset, setEditedAsset, handleSaveEditValuation, departmentNames }) {
  return (
        <Modal
            isOpen={showEditValuationModal}
            onRequestClose={() => setShowEditValuationModal(false)}
            contentLabel="Asset Valuation Modal"
            className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black" >
            <div className="bg-white w-1/3 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Asset Valuation {" "}<span className="font-bold text-blue-600 underline">{selectedAsset?.asset_name}</span>{" "}</h2>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Purchase Value (KES)</label>
                    <input type="text" value={editedAsset.purchase_value}
                        onChange={e => setEditedAsset({ ...editedAsset, pruchase_value: e.target.value })}
                         />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Current Value (KES)</label>
                    <input type="text" value={editedAsset.current_value}
                        onChange={e => setEditedAsset({ ...editedAsset, current_value: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>

                <div className="flex justify-between">
                    <button onClick={handleSaveEditValuation} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none">Update</button>
                    <button onClick={() => setShowEditValuationModal(false)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none">Cancel</button>
                </div>
            </div>
        </Modal>
  )
}

export default AssetValuationModal



// import React from 'react'
// import Modal from 'react-modal';

// function AssetValuationModal({ showEditValuationModal, setShowEditValuationModal, selectedAsset, editedAsset, setEditedAsset, handleSaveEditValuation }) {
//   return (
//         <Modal
//             isOpen={showEditValuationModal}
//             onRequestClose={() => setShowEditValuationModal(false)}
//             contentLabel="Asset Valuation Modal"
//             className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black" >
//             <div className="bg-white w-1/3 p-6 rounded-lg">
//                 <h2 className="text-2xl font-semibold mb-4">Asset Valuation {" "}<span className="font-bold text-blue-600 underline">{selectedAsset?.asset_name}</span>{" "}</h2>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700">Asset Name</label>
//                     <div className="block w-full mt-1 p-2 border rounded-md bg-gray-100">{editedAsset.asset_name}</div>
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Purchase Value</label>
//                     <div className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300">{editedAsset.purchase_value}</div>
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Current Value</label>
//                     <input type="text" value={editedAsset.current_value}
//                         onChange={e => setEditedAsset({ ...editedAsset, current_value: e.target.value })}
//                         className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
//                 </div>                            
//                 <div className="flex justify-between">
//                     <button onClick={handleSaveEditValuation} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none">Update</button>
//                     <button onClick={() => setShowEditValuationModal(false)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none">Cancel</button>
//                 </div>
//             </div>
//      </Modal>
//   )
// }

// export default AssetValuationModal
