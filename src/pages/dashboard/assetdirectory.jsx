import React from 'react';

// const Assetdirectory = () => {
//     return (
//         <div>
//             <p>Hi</p>
//         </div>
//     );
// };

// export default Assetdirectory;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import ReactPaginate from "react-paginate";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const Api_Url = 'http://127.0.0.1:3001/departments';

Modal.setAppElement('#root'); // Set the root element for accessibility

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [editedDepartment, setEditedDepartment] = useState({
        department_name: '',
        department_code: '',
        head_of_department: '',
        assets: 0,
        asset_value: 0,
        
    });
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        // Fetch the list of departments when the component mounts
        axios.get(Api_Url)
            .then(response => {
                setDepartments(response.data);
            })
            .catch(error => {
                console.error('Error fetching departments: ', error);
            });
    }, []);

    const handleEditClick = (department) => {
        setSelectedDepartment(department);
        setEditedDepartment({
            department_name: department.department_name,
            department_code: department.department_code,
            head_of_department: department.head_of_department,
            assets: department.total_assets, // Use the fetched values
            asset_value: department.asset_total_value,
        });
        setShowEditModal(true);
    };

    const handleSaveEdit = () => {
        // Send a PUT request to update the department
        axios.put(`${Api_Url}/${selectedDepartment.id}`, editedDepartment)
            .then(response => {
                // Update the local departments list with the updated data
                setDepartments(departments.map(dep => dep.id === selectedDepartment.id ? response.data : dep));
                setShowEditModal(false);
            })
            .catch(error => {
                console.error('Error updating department: ', error);
            });
    };

    const handleDeleteClick = (department) => {
        setSelectedDepartment(department);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
       
        axios.delete(`${Api_Url}/${selectedDepartment.id}`)
            .then(() => {
                
                setDepartments(departments.filter(dep => dep.id !== selectedDepartment.id));
                setShowDeleteModal(false);
            })
            .catch(error => {
                console.error('Error deleting department: ', error);
            });
    };

    return (
        <div>
            
        </div>
    );
};

export default DepartmentList;
