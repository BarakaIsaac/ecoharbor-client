import React from 'react'
import Modal from 'react-modal';

function AssetEditModal({
  showEditModal,
  setShowEditModal,
  selectedAsset,
  editedAsset,
  setEditedAsset,
  handleSaveEdit,
  uniqueAssetCategories,
  showCustomCategoryInput,
  setShowCustomCategoryInput,
  customCategory,
  setCustomCategory,
  departmentNames,
}) {
  return (
    <div>
        <Modal
            isOpen={showEditModal}
            onRequestClose={() => setShowEditModal(false)}
            contentLabel="Edit Asset Modal"
            className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black"
            >
            <div className="bg-white w-1/3 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Edit {" "}
                            <span className="font-bold text-blue-600 underline">
                                {selectedAsset?.asset_name}</span>{" "}</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Asset Name</label>
                    <input
                    type="text"
                    value={editedAsset.asset_name}
                    onChange={e => setEditedAsset({ ...editedAsset, asset_name: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                        <label className="block text-sm font-medium text-gray-700">Asset Category</label>
                        <select
                            value={showCustomCategoryInput ? 'Other' : editedAsset.category_name}
                            onChange={e => {
                                if (e.target.value === 'Other') {
                                    setShowCustomCategoryInput(true);
                                } else {
                                    setShowCustomCategoryInput(false);
                                    setEditedAsset({ ...editedAsset, category_name: e.target.value });
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
                    value={editedAsset.category_code}
                    onChange={e => setEditedAsset({ ...editedAsset, category_code: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Asset Condition</label>
                    <input
                    type="text"
                    value={editedAsset.condition}
                    onChange={e => setEditedAsset({ ...editedAsset, condition: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700">Asset Status</label>
                    <input
                    type="text"
                    value={editedAsset.status}
                    onChange={e => setEditedAsset({ ...editedAsset, status: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Purchase Value [KES]</label>
                    <input
                    type="text"
                    value={editedAsset.purchase_value}
                    onChange={e => setEditedAsset({ ...editedAsset, purchase_value: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Current Value [KES]</label>
                    <input
                    type="text"
                    value={editedAsset.current_value}
                    onChange={e => setEditedAsset({ ...editedAsset, current_value: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                    type="text"
                    value={editedAsset.quantity_in_stock}
                    onChange={e => setEditedAsset({ ...editedAsset, quantity_in_stock: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <select
                        value={editedAsset.department_id}
                        onChange={e => setEditedAsset({ ...editedAsset, department_id: e.target.value })}
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
                    value={editedAsset.asset_image}
                    onChange={e => setEditedAsset({ ...editedAsset, asset_image: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
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
    </div>
  )
}

export default AssetEditModal
