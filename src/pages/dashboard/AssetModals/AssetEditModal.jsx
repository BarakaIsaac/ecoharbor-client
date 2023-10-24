import React from 'react'
import Modal from 'react-modal';

Modal.setAppElement('#root');

function AssetEditModal({showEditModal, setShowEditModal, selectedAsset, editedAsset, setEditedAsset, handleSaveEdit, departmentNames }) {
  return (
        <Modal
            isOpen={showEditModal}
            onRequestClose={() => setShowEditModal(false)}
            contentLabel="Edit Asset Modal"
            className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black" >
            <div className="bg-white w-1/3 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Edit {" "}<span className="font-bold text-blue-600 underline">{selectedAsset?.asset_name}</span>{" "}</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Asset Name</label>
                    <input type="text" value={editedAsset.asset_name}
                        onChange={e => setEditedAsset({ ...editedAsset, asset_name: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Asset Category</label>
                    <select
                        value={editedAsset.asset_category}
                        onChange={(e) => setEditedAsset({ ...editedAsset, asset_category: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        <option value="" disabled className="text-grey-100" style={{ opacity: 0.6 }}>
                            Select
                        </option>
                        <option value="Furniture & Fittings">Furniture & Fittings</option>
                        <option value="Computers and Accessories">Computers and Accessories</option>
                        <option value="Mobile Phones">Mobile Phones</option>
                        <option value="Vehicles">Vehicles</option>
                        <option value="Kitchen Appliances">Kitchen Appliances</option>
                        <option value="Office Supplies">Office Supplies</option>
                        <option value="Tools">Tools</option>
                        <option value="Machinery">Machinery</option>
                        <option value="Land and Building">Land and Building</option>
                        <option value="Software">Software</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Asset Condition</label>
                    <input type="text" value={editedAsset.asset_condition}
                        onChange={e => setEditedAsset({ ...editedAsset, asset_condition: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input type="text" value={editedAsset.quantity}
                        onChange={e => setEditedAsset({ ...editedAsset, quantity: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <select value={editedAsset.department_id} 
                        onChange={e => setEditedAsset({ ...editedAsset, department_id: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" >
                        <option value="" disabled className="text-grey-100" style={{ opacity: 0.6 }}>Select a Department</option>
                        <option value="" key="blank"></option>
                        {Object.keys(departmentNames).map(departmentId => (
                            <option key={departmentId} value={departmentId}>
                                {departmentNames[departmentId]}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Asset Image</label>
                    <input type="text" value={editedAsset.asset_image}
                        onChange={e => setEditedAsset({ ...editedAsset, asset_image: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div className="flex justify-between">
                    <button onClick={handleSaveEdit} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none">Update</button>
                    <button onClick={() => setShowEditModal(false)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none">Cancel</button>
                </div>
            </div>
        </Modal>
  )
}

export default AssetEditModal
