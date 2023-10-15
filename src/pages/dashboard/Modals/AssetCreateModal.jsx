import React, { useState } from 'react'
import Modal from 'react-modal';

function AssetCreateModal({ 
    showCreateModal, 
    setShowCreateModal, 
    handleCreateAsset, 
    departmentNames, 
    newAsset, 
    setNewAsset, 
    showCustomCategoryInput, 
    setShowCustomCategoryInput, 
    uniqueAssetCategories 
}) {
  
 
    const [customCategory, setCustomCategory] = useState('');
    return (

    
    <div>
        <Modal
            isOpen={showCreateModal}
            onRequestClose={() => setShowCreateModal(false)}
            contentLabel="Create Asset Modal"
            className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black"
            >
            <div className="bg-white w-1/3 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Create New Asset</h2>

                <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Asset Name</label>
                <input
                    type="text"
                    value={newAsset.asset_name}
                    onChange={e => setNewAsset({ ...newAsset, asset_name: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                />
                </div>

                {/* <div>
                    <label className="block text-sm font-medium text-gray-700">Asset Category</label>
                    <select
                            value={newAsset.category_name}
                            onChange={e => setNewAsset({ ...newAsset, category_name: e.target.value })}
                            className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="" disabled>Select an Asset Category</option>
                            {uniqueAssetCategories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                </div> */}

                <div>
                        <label className="block text-sm font-medium text-gray-700">Asset Category</label>
                        <select
                            value={showCustomCategoryInput ? 'Other' : newAsset.category_name}
                            onChange={e => {
                                if (e.target.value === 'Other') {
                                    setShowCustomCategoryInput(true);
                                } else {
                                    setShowCustomCategoryInput(false);
                                    setNewAsset({ ...newAsset, category_name: e.target.value });
                                }
                            }}
                            className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="" disabled>Select an Asset Category</option>
                            {uniqueAssetCategories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                            <option value="Other">Other (Enter custom category)</option>
                        </select>
                    </div>

                    {showCustomCategoryInput && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Custom Asset Category</label>
                            <input
                                type="text"
                                value={customCategory}
                                onChange={e => setCustomCategory(e.target.value)}
                                className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                    )}


                <div>
                    <label className="block text-sm font-medium text-gray-700">Category Code</label>
                    <input
                    type="text"
                    value={newAsset.category_code}
                    onChange={e => setNewAsset({ ...newAsset, category_code: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Asset Condition</label>
                    <input
                    type="text"
                    value={newAsset.condition}
                    onChange={e => setNewAsset({ ...newAsset, condition: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                {/* <div>
                    <label className="block text-sm font-medium text-gray-700">Asset Status</label>
                    <input
                    type="text"
                    value={newAsset.status}
                    onChange={e => setNewAsset({ ...newAsset, status: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div> */}

                {/* <div>
                    <label className="block text-sm font-medium text-gray-700">Asset Purchase Value [KES]</label>
                    <input
                    type="text"
                    id="currency"
                    pattern="^\d+(\.\d{2})?$" placeholder="KES 0.00"
                    value={newAsset.purchase_value}
                    onChange={e => setNewAsset({ ...newAsset, purchase_value: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Asset Current Value [KES] </label>
                    <input
                    type="text"
                    id="currency"
                    pattern="^\d+(\.\d{2})?$" placeholder="KES 0.00"
                    value={newAsset.current_value}
                    onChange={e => setNewAsset({ ...newAsset, current_value: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div> */}

                <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                    type="number"
                    value={newAsset.quantity_in_stock}
                    onChange={e => setNewAsset({ ...newAsset, quantity_in_stock: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <select
                        value={newAsset.department_id}
                        onChange={e => setNewAsset({ ...newAsset, department_id: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    >
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
                    <input
                    type="text"
                    value={newAsset.asset_image}
                    onChange={e => setNewAsset({ ...newAsset, asset_image: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div className="flex justify-between">
                <button onClick={handleCreateAsset} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none">
                    Create
                </button>
                <button onClick={() => setShowCreateModal(false)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none">
                    Cancel
                </button>
                </div>
            </div>
        </Modal>
      
    </div>
  )
}

export default AssetCreateModal
