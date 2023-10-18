import React from 'react'
import Modal from 'react-modal';

Modal.setAppElement('#root');

function EmployeeCreateModal({showCreateModal, setShowCreateModal, handleCreateEmployee, setNewEmployee, newEmployee, departmentNames}) {
  return (
        <Modal
            isOpen={showCreateModal}
            onRequestClose={() => setShowCreateModal(false)}
            contentLabel="Create Employee Modal"
            className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black"  >
            <div className="bg-white w-1/3 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Create Employee</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input type="text"  value={newEmployee.first_name} required
                        onChange={e => setNewEmployee({ ...newEmployee, first_name: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" value={newEmployee.last_name} required
                        onChange={e => setNewEmployee({ ...newEmployee, last_name: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" value={newEmployee.password} required
                        onChange={e => setNewEmployee({ ...newEmployee, password: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">E-mail</label>
                    <input type="email" value={newEmployee.email} required
                        onChange={e => setNewEmployee({ ...newEmployee, email: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="text" value={newEmployee.phone_number} required
                        onChange={e => setNewEmployee({ ...newEmployee, phone_number: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Employment Image</label>
                    <input type="text" value={newEmployee.employee_image} required
                        onChange={e => setNewEmployee({ ...newEmployee, employee_image: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Employment Date</label>
                    <input type="date" value={newEmployee.employment_date} required
                        onChange={e => setNewEmployee({ ...newEmployee, employment_date: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <select value={newEmployee.department_id} required
                        onChange={e => setNewEmployee({ ...newEmployee, department_id: e.target.value })}
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
                    <select value={newEmployee.employee_role} required
                        onChange={e => setNewEmployee({ ...newEmployee, employee_role: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" >
                        <option value="" disabled>Select a Role</option>
                        <option value="Procurement Manager">Procurement Manager</option>
                        <option value="Normal Employee">Normal Employee</option>
                        <option value="Finance">Finance</option>
                        <option value="Finance">Admin</option>
                    </select>
                </div>
                <div className="flex justify-between">
                    <button onClick={handleCreateEmployee} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none">Create</button>
                    <button onClick={() => setShowCreateModal(false)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none">Cancel</button>
                </div>
            </div>
        </Modal>
  )
}

export default EmployeeCreateModal
