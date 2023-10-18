import React from 'react'
import Modal from 'react-modal';
import { Card } from "@material-tailwind/react";

Modal.setAppElement('#root');

function RequestViewModal({isOpen,onClose, request }) {
  return (
       <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="View Request Modal"
            className="bg-[#2E3C43] fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black"
            style={{
                overlay: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    zIndex: 1000,
                },
                content: {
                    position: 'relative',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '0.25rem',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    maxWidth: '70%',                    
                },
            }} >
            {request && (
                <div className="bg-white w-2/3 p-6 rounded-lg " >
                    <Card>
                        <div className="flex items-center"><h2 className="text-center text-2xl font-semibold mb-4"style={{ textAlign: 'center' }}>{request.asset_name}</h2></div>
                          
                        {/* <div className="flex items-center justify-center">
                            {request.asset_image && (
                                <img src={request.asset_image} alt="Asset Image" className="max-w-[500px] max-h-[500px] my-4 border-4 border-blue-500 rounded-lg shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"  />
                            )}
                        </div> */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-[#2F3D44] mb-2"><strong>Request Date:</strong> {request.request_date}</p>
                                <p className="text-xs text-[#2F3D44] mb-2"><strong>Request Type:</strong> {request.request_type}</p>
                                <p className="text-xs text-[#2F3D44] mb-2"><strong>Employee:</strong> {request.employee_id}</p>
                                <p className="text-xs text-[#2F3D44] mb-2"><strong>Department:</strong> {request.department_id}</p>
                                <p className="text-xs text-[#2F3D44] mb-2"><strong>Quantity:</strong> {request.quantity}</p>
                                <p className="text-xs text-[#2F3D44] mb-2"><strong>Urgency:</strong> {request.urgency}</p>
                            </div>
                            <div>
                                <p className="text-xs text-[#2F3D44] mb-2"><strong>Request Status:</strong> {request.request_status}</p>
                                <p className="text-xs text-[#2F3D44] mb-2"><strong>Approval Date:</strong> {request.approval_date}</p>
                                <p className="text-xs text-[#2F3D44] mb-2"><strong>Reason:</strong> {request.reason}</p>
                                <p className="text-xs text-[#2F3D44] mb-2"><strong>Procurement Comment:</strong> {request.procurement_comment}</p>
                                <p className="text-xs text-[#2F3D44] mb-2"><strong>Quantity:</strong> {request.quantity_in_stock}</p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={onClose} className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none mt-4 ml-2">
                                Close
                            </button>                            
                        </div>
                    </Card>
                </div>
            )}
        </Modal>
  )
}

export default RequestViewModal
