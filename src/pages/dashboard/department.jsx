import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import ReactPaginate from "react-paginate";


import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const api_url = 'http://127.0.0.1:3001/departments';

Modal.setAppElement('#root'); 

export function Department() {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [editedDepartment, setEditedDepartment] = useState({
        department_name: '',
        department_code: '',
        head_of_department: '',
    });

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const departmentsPerPage = 8;

  useEffect(() => {
    axios
      .get(api_url)
      .then((response) => {
        setDepartments(response.data);
        })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);

  const handleEditClick = (department) => {
        setSelectedDepartment(department);
        setEditedDepartment({
            department_name: department.department_name,
            department_code: department.department_code,
            head_of_department: department.head_of_department,
        });
        setShowEditModal(true);
  };

  const handleSaveEdit = () => {
      axios.put(`${api_url}/${selectedDepartment.id}`, editedDepartment)
            .then(response => {
                // Update the local departments list with the updated data
                setDepartments(departments.map(dep => dep.id === selectedDepartment.id ? response.data : dep));
                setShowEditModal(false);
            })
            .catch(error => {
                console.error('Error updating department: ', error);
            });
  };

  //UPDATE DEPARTMENT
  const openEditModal = (department) => {
    setSelectedDepartment(department);
    setEditedDepartment({
      department_name: department.department_name,
      department_code: department.department_code,
      head_of_department: department.head_of_department,
    });
    setEditModalOpen(true);
  };

  const handleDeleteClick = (department) => {
        setSelectedDepartment(department);
        setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
        // Send a DELETE request to delete the department
        axios.delete(`${api_url}/${selectedDepartment.id}`)
            .then(() => {
                // Update the local departments list by removing the deleted department
                setDepartments(departments.filter(dep => dep.id !== selectedDepartment.id));
                setShowDeleteModal(false);
            })
            .catch(error => {
                console.error('Error deleting department: ', error);
            });
    };


  const pageCount = Math.ceil(departments.length / departmentsPerPage);
  const offset = currentPage * departmentsPerPage;

  const currentDepartments = departments.slice(
    offset,
    offset + departmentsPerPage
  );
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };



  // const handleEditClick = (id) => {
  //   console.log("Edit button clicked");
  //   setShowEditModal(true);
  // };

  // const handleDelete = (id) => {
  //   // setSelectedDepartment("");
  //   console.log("Delete button clicked", selectedDepartment);
  //   setShowDeleteModal(true);
  // };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Department List
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "Department Name",
                  "Department Code",
                  "Head of Department",
                  "Total Assets",
                  "Total Asset Value",
                  "Actions",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentDepartments.map(
                ({ id, department_name, department_code, head_of_department, total_assets, asset_total_value }, key) => {
                  const className = `py-3 px-5 ${
                    key === currentDepartments.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={id}>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          {department_name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {department_code}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {head_of_department}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {total_assets}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {asset_total_value}
                        </Typography>
                      </td>
                      <td className={className}>
                        <button
                          onClick={() => handleEditClick(department)}
                          className="bg-blue-500 text-white py-1 px-3 rounded-md mb-2"
                        >
                          Edit
                        </button>
                        
                        <button
                          onClick={() => handleDeleteClick(department)}
                          className="bg-red-500 text-white py-1 px-3 rounded-md"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <div>
        <ReactPaginate
          previousLabel={<ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />}
          nextLabel={<ArrowRightIcon strokeWidth={2} className="h-4 w-4" />}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active bg-blue-500 text-white"}
          previousClassName={"px-3 py-1 rounded-md bg-blue-500 text-white mb-2"}
          nextClassName={"px-3 py-1 rounded-md bg-blue-500 text-white"}
          pageLinkClassName={"inline-block px-3 py-1 text-black mr-1"}
        />
      </div>
      
   
        <Modal
          isOpen={showEditModal}
          onRequestClose={() => setShowEditModal(false)}
          contentLabel="Edit Department Modal"
          className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black"
        >
          <div className="bg-white w-1/3 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Edit Department</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Department Name:</label>
              <input
                type="text"
                value={editedDepartment.department_name}
                onChange={(e) => setEditedDepartment({ ...editedDepartment, department_name: e.target.value })}
                className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Department Code:</label>
              <input
                type="text"
                value={editedDepartment.department_code}
                onChange={(e) => setEditedDepartment({ ...editedDepartment, department_code: e.target.value })}
                className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Head of Department:</label>
              <input
                type="text"
                value={editedDepartment.head_of_department}
                onChange={(e) => setEditedDepartment({ ...editedDepartment, head_of_department: e.target.value })}
                className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Update
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>


        <Modal
          isOpen={showDeleteModal}
          onRequestClose={() => setShowDeleteModal(false)}
          className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black"
        >
          <div className="bg-white w-1/3 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Are you sure you want to delete this department?</h2>
            <p className="text-gray-700 mb-4">{selectedDepartment?.department_name}</p>
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>

      
      

    </div>
  );
}

export default Department;




