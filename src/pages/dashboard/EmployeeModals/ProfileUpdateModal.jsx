import React, {useState} from 'react'
import Modal from 'react-modal';

Modal.setAppElement('#root');

export const ProfileUpdateModal = ({ isOpen, onRequestClose, onUpdateProfile}) => {
    const [editedEmail, setEditedEmail] = useState('');
    const [editedPassword, setEditedPassword] = useState('');
    const [editedFirstName, setEditedFirstName] = useState('');
    const [editedLastName, setEditedLastName] = useState('');
    const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
    const [editedEmployeeImage, setEditedEmployeeImage] = useState('');
    const [employeeNames, setEmployeeNames] = useState({});

    const handleUpdateProfile = () => {
        const updatedProfile = {
            email: editedEmail,
            password: editedPassword,
            first_name: editedFirstName,
            last_name: editedLastName,
            phone_number: editedPhoneNumber,
            employee_image: editedEmployeeImage
        };

        const filterUpdatedProfile = Object.entries(updatedProfile).reduce((acc, [key, value]) => {
            if (value !== '') {
                acc[key] = value;
            }
            return acc;
        }, {});

        onUpdateProfile(filterUpdatedProfile);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black" >
            contentLabel="Edit Employee Modal"
        >
        <h2>Update your info here.</h2>
            <input
                type="email"
                value={editedEmail}
                onChange={e => setEditedEmail(e.target.value)}
                placeholder="Email"
                className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
            <input
                type="password"
                value={editedPassword}
                onChange={e => setEditedPassword(e.target.value)}
                placeholder="Password"
                className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
            <input
                type="text"
                value={editedFirstName}
                onChange={e => setEditedFirstName(e.target.value)}
                placeholder="First Name"
                className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
            <input
                type="text"
                value={editedLastName}
                onChange={e => setEditedLastName(e.target.value)}
                placeholder="Last Name"
                className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
            <input
                type="text"
                value={editedPhoneNumber}
                onChange={e => setEditedPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
            <button onClick={handleUpdateProfile}>Update Info</button>
        </Modal>
    );
};

export default ProfileUpdateModal;
