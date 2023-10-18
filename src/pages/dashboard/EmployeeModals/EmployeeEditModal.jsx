import React from 'react'
import Modal from 'react-modal';

Modal.setAppElement('#root');

function EmployeeEditModal({ showEditModal, setShowEditModal, setEditedEmployee, editedEmployee, departmentNames, handleSaveEdit, selectedEmployee    }) {
  return (
         <Modal
            isOpen={showEditModal}
            onRequestClose={() => setShowEditModal(false)}
            contentLabel="Edit Employee Modal"
            className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black" >
            <div className="bg-white w-1/3 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Edit {" "} <span className="font-bold text-blue-600 underline">{selectedEmployee?.first_name} {selectedEmployee?.last_name} </span>{" "}</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input type="text" value={editedEmployee.first_name}
                        onChange={e => setEditedEmployee({ ...editedEmployee, first_name: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" value={editedEmployee.last_name}
                        onChange={e => setEditedEmployee({ ...editedEmployee, last_name: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" value={editedEmployee.email}
                    onChange={e => setEditedEmployee({ ...editedEmployee, email: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" value={editedEmployee.password}
                        onChange={e => setEditedEmployee({ ...editedEmployee, password: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="text" value={editedEmployee.phone_number}
                        onChange={e => setEditedEmployee({ ...editedEmployee, phone_number: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Employment Date</label>
                    <input type="date" value={editedEmployee.employment_date}
                        onChange={e => setEditedEmployee({ ...editedEmployee, employment_date: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>  
                <div>
                    <label className="block text-sm font-medium text-gray-700">Employee Image</label>
                    <input type="text" value={editedEmployee.employee_image}
                        onChange={e => setEditedEmployee({ ...editedEmployee, employee_image: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>                 
                <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <select value={departmentNames[editedEmployee.department_id]}
                        onChange={e => setEditedEmployee({ ...editedEmployee, department_id: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" >
                        <option value="" disabled className="text-grey-100" style={{ opacity: 0.6 }}>Select a Department</option>
                        {Object.keys(departmentNames).map(departmentId => (
                            <option key={departmentId} value={departmentId}>
                                {departmentNames[departmentId]}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Employee Role</label>
                    <select value={editedEmployee.employee_role}
                        onChange={e => setEditedEmployee({ ...editedEmployee, employee_role: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" >
                        <option value="" disabled className="text-grey-100" style={{ opacity: 0.6 }}>Select a Role</option>
                        <option value="Procurement Manager">Procurement Manager</option>
                        <option value="Normal Employee">Normal Employee</option>
                        <option value="Finance">Finance</option>
                    </select>                    
                </div>
                <div className="flex justify-between">
                    <button onClick={handleSaveEdit} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none">Update</button>
                    <button onClick={() => setShowEditModal(false)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none">Cancel</button>
                </div>
            </div>
        </Modal>
  )
}

export default EmployeeEditModal
