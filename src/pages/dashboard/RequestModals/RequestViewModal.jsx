import React from 'react'
import Modal from 'react-modal';
import { Card, CardHeader } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";

Modal.setAppElement('#root');

function RequestViewModal({isOpen, onClose, request, }) {
    
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
                        <CardHeader variant="gradient" color="blue" className="mb-2 p-2 text-center">
                            <div className="flex items-center"><h2 className="text-center text-2xl font-semibold mb-4"style={{ textAlign: 'center' }}>Asset Request View - <span style={{ color: '#2F3E45' }}>{request.asset_name}</span></h2></div>
                        </CardHeader>   
                        <div className="flex items-center justify-center">
                            {request.asset_image && (
                                <img src={request.asset_image} alt="Asset Image" className="max-w-[500px] max-h-[500px] my-4 border-4 border-blue-500 rounded-lg shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"  />
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col justify-center">
                                <Typography className="text-sm text-[#2F3D44] mb-2"><strong style={{ fontWeight: 'bold' }} >Request Date:</strong> {request.request_date}</Typography>
                                <Typography className="text-sm text-[#2F3D44] mb-2"><strong style={{ fontWeight: 'bold' }}>Employee:</strong> {request.employee_id}</Typography>
                                <Typography className="text-sm text-[#2F3D44] mb-2"><strong style={{ fontWeight: 'bold' }}>Department:</strong> {request.department_id}</Typography>
                                <Typography className="text-sm text-[#2F3D44] mb-2"><strong style={{ fontWeight: 'bold' }}>Quantity:</strong> {request.quantity}</Typography>                               
                            </div>                            
                            <div className="flex flex-col justify-center">
                                <Typography className="text-xs text-[#2F3D44] mb-2"><strong style={{ fontWeight: 'bold' }}>Reason of Request:</strong> {request.reason}</Typography>
                                <Typography className="text-sm text-[#2F3D44] mb-2"><strong style={{ fontWeight: 'bold' }}>Request Type:</strong> {request.request_type}</Typography>                                                               
                                <Typography className="text-sm text-[#2F3D44] mb-2"><strong style={{ fontWeight: 'bold' }}>Quantity:</strong> {request.quantity}</Typography>
                                <Typography className={`text-sm font-bold ${
                                    request.urgency === "High" || request.urgency === "Critical" ? 'text-red-500' :
                                    request.urgency === "Medium" ? 'text-blue-500' : 'text-black'
                                }`}><strong className="text-black">Urgency:</strong> {request.urgency}</Typography>
                            </div>
                        </div>
                        <div>
                            <hr class="border-3" ></hr>
                            <div>
                                <h1 className="text-[#399EF1]" style={{ fontWeight: 'bold', fontSize: '18px' }}>Official</h1>
                                <Typography className={`text-sm text-[#2F3D44] mb-2 font-bold ${ 
                                        request.request_status === "Approved" ? 'text-[#399EF1]' : 
                                        request.request_status === "Rejected" ? 'text-red-500' : 'text-black'}`}>
                                        <strong className="text-black"><strong style={{ fontWeight: 'bold' }}>Request Status:</strong></strong> {request.request_status} </Typography>
                                <Typography className="text-sm text-[#2F3D44] mb-2"><strong style={{ fontWeight: 'bold' }}>Approval Date:</strong> {request.approval_date}</Typography>
                                <Typography className="text-sm text-[#2F3D44] mb-2"><strong style={{ fontWeight: 'bold' }}>Procurement Comment:</strong> {request.procurement_comments}</Typography>
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
