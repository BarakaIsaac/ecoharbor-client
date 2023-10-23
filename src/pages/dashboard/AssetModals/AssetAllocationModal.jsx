import React from 'react'
import Modal from 'react-modal';

Modal.setAppElement('#root');

function AssetAllocationModal({showEditAllocationModal, setShowEditAllocationModal, selectedAsset, editedAsset, setEditedAsset, handleSaveEditAllocation, departmentNames, employeeNames }) {
  return (
        <Modal
            isOpen={showEditAllocationModal}
            onRequestClose={() => setShowEditAllocationModal(false)}
            contentLabel="Edit Asset Modal"
            className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black" >
            <div className="bg-white w-1/3 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Asset Allocation - {" "}<span className="font-bold text-blue-600 underline">{selectedAsset?.asset_name}</span>{" "}</h2>

                <div className="mb-4">
                 <img src={editedAsset.asset_image}  alt="Asset" className="max-w-[500px] max-h-[500px] my-4 border-4 border-blue-500 rounded-lg shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"  />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Employee</label>
                    <select value={editedAsset.employee_id} onChange={(e) => setEditedAsset({ ...editedAsset, employee_id: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" >
                        <option value="" disabled className="text-grey-100" style={{ opacity: 0.6 }}>
                        Select an Employee
                        </option>
                        <option value="" key="blank"></option>
                        {Object.keys(employeeNames).map((employeeId) => (
                        <option key={employeeId} value={employeeId}>
                            {employeeNames[employeeId]}
                        </option>
                        ))}
                    </select>
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
                <div className="flex justify-between mt-4">
                    <button onClick={handleSaveEditAllocation} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none">Update</button>
                    <button onClick={() => setShowEditAllocationModal(false)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none">Cancel</button>
                </div>
            </div>
        </Modal>
  )
}

export default AssetAllocationModal

