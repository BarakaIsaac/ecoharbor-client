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


export function Department() {
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const departmentsPerPage = 8;
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  
  //UPDATE DEPARTMENT
  const [editData, setEditData] = useState({
      department_name: "",
      department_code: "",
      head_of_department: "",
    });

  const openEditModal = (department) => {
    setSelectedDepartment(department);
    setEditData({
      department_name: department.department_name,
      department_code: department.department_code,
      head_of_department: department.head_of_department,
    });
    setEditModalOpen(true);
  };

   // Define a function to update a department and Implement the API update request here
  const updateDepartment = () => {
    const updatedDepartment = {
      ...selectedDepartment,
      ...editData,
    };
    axios
      .put(`http://127.0.0.1:3001/departments/${updatedDepartment.id}`, updatedDepartment)
      .then((response) => {
        console.log("Department updated successfully:", response.data);
        // You may want to update your state or close the modal here.
        setEditModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating department:", error);
      });
  };


  //DELETE DEPARTMENT
  // Define a function to open the delete modal
  const openDeleteModal = (department) => {
    console.log("Selected Department:", selectedDepartment);
    setSelectedDepartment(department);
    setDeleteModalOpen(true);
  };

  // Define a function to delete a department and // Implement the API delete request here
  const deleteDepartment = () => {
  if (selectedDepartment) {
    const departmentId = selectedDepartment.id;
    // console.log("Selected Department:", selectedDepartment);

    axios
      .delete(`http://127.0.0.1:3001/departments/${departmentId}`)
      .then((response) => {
        // console.log("Selected Department:", selectedDepartment);
        console.log(`Department with ID ${departmentId} deleted successfully.`);
        setDeleteModalOpen(false);
      })
      .catch((error) => {
        console.error(`Error deleting department with ID ${departmentId}:`, error);
      });
  } else {
    // Handle the case where selectedDepartment is null or undefined
    console.error("Cannot delete department: selectedDepartment is null or undefined.");
  }
};
  // const deleteDepartment = () => {
  //   const departmentId = selectedDepartment.id;
   
  //   axios
  //     .delete(`http://127.0.0.1:3000/departments/${departmentId}`)
  //     .then((response) => {
  //       console.log(`Department with ID ${departmentId} deleted successfully.`);
        
  //       setDeleteModalOpen(false);
  //     })
  //     .catch((error) => {
  //       console.error(`Error deleting department with ID ${departmentId}:`, error);
  //     });
  // };
  

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3001/departments")
      .then((response) => {
        // console.log("API Response:", response.data);
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const pageCount = Math.ceil(departments.length / departmentsPerPage);
  const offset = currentPage * departmentsPerPage;

  const currentDepartments = departments.slice(
    offset,
    offset + departmentsPerPage
  );



  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };



  const handleEdit = (id) => {
    console.log("Edit button clicked");
    setEditModalOpen(true);
  };

  const handleDelete = (id) => {
    console.log("Delete button clicked");
    console.log("Delete button clicked", selectedDepartment);
    setDeleteModalOpen(true);
  };

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
                          onClick={() => handleEdit(id)}
                          className="bg-blue-500 text-white py-1 px-3 rounded-md mb-2"
                        >
                          Edit
                        </button>
                        
                        <button
                          onClick={() => handleDelete(id)}
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
          isOpen={isEditModalOpen}
          onRequestClose={() => setEditModalOpen(false)}
          contentLabel="Edit Department Modal"
          className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black"
        >
          <div className="bg-white w-1/3 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Edit Department</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Department Name:</label>
              <input
                type="text"
                value={editData.department_name}
                onChange={(e) => setEditData({ ...editData, department_name: e.target.value })}
                className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Department Code:</label>
              <input
                type="text"
                value={editData.department_code}
                onChange={(e) => setEditData({ ...editData, department_code: e.target.value })}
                className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Head of Department:</label>
              <input
                type="text"
                value={editData.head_of_department}
                onChange={(e) => setEditData({ ...editData, head_of_department: e.target.value })}
                className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={updateDepartment}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Update
              </button>
              <button
                onClick={() => setEditModalOpen(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>


        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={() => setDeleteModalOpen(false)}
          className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black"
        >
          <div className="bg-white w-1/3 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Are you sure you want to delete this department?</h2>
            <p className="text-gray-700 mb-4">{selectedDepartment?.department_name}</p>
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
                onClick={deleteDepartment}
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteModalOpen(false)}
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




