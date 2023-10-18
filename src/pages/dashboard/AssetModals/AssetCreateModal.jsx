// import React, { useState } from 'react'
import React, { useState } from 'react'
import Modal from 'react-modal';

Modal.setAppElement('#root');

function AssetCreateModal({ showCreateModal, setShowCreateModal, handleCreateAsset, departmentNames, newAsset, setNewAsset, }) {
    return (
     <div>
        <Modal
            isOpen={showCreateModal}
            onRequestClose={() => setShowCreateModal(false)}
            contentLabel="Create Asset Modal"
            className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black" >
            <div className="bg-white w-1/3 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Create New Asset</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Asset Name</label>
                <input type="text" value={newAsset.asset_name} required
                    onChange={e => setNewAsset({ ...newAsset, asset_name: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Asset Category</label>
                    <input type="text" value={newAsset.asset_category} required
                        onChange={e => setNewAsset({ ...newAsset, asset_category: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Asset Condition</label>
                    <input type="text" value={newAsset.asset_condition} required
                        onChange={e => setNewAsset({ ...newAsset, asset_condition: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input type="number" value={newAsset.quantity} required
                    onChange={e => setNewAsset({ ...newAsset, quantity: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Asset Image</label>
                    <input type="text" value={newAsset.asset_image} required
                        onChange={e => setNewAsset({ ...newAsset, asset_image: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                {/* <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <select value={newAsset.department_id} 
                        onChange={e => setNewAsset({ ...newAsset, department_id: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" >
                        <option value="" disabled className="text-grey-100" style={{ opacity: 0.6 }}>Select a Department</option>
                        <option value="" key="blank"></option>
                        {Object.keys(departmentNames).map(departmentId => (
                            <option key={departmentId} value={departmentId}>
                                {departmentNames[departmentId]}
                            </option>
                        ))}
                    </select>
                </div> */}
                <div className="flex justify-between">
                    <button onClick={handleCreateAsset} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none">Create</button>
                    <button onClick={() => setShowCreateModal(false)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none">Cancel</button>
                </div>
            </div>
        </Modal>     
    </div>
  )
}

export default AssetCreateModal