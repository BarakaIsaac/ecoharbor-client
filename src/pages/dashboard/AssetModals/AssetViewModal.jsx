import React, { useState } from 'react';
import Modal from 'react-modal';
import { Card, CardHeader } from "@material-tailwind/react";

import AssetRequestFormModal from '../RequestModals/AssetRequestFormModal'; 

Modal.setAppElement('#root');

function AssetViewModal({ isOpen, onClose, asset, departmentNames }) {
  
  const [showRequestModal, setShowRequestModal] = useState(false);

  const openRequestModal = () => { setShowRequestModal(true); };

  return (
       <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="View Asset Modal"
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
            {asset && (
                <div className="bg-white w-2/3 p-6 rounded-lg " >
                    <Card>
                        <CardHeader variant="gradient" color="blue" className="mb-2 p-2 text-center">
                            <div className="flex items-center"><h2 className="text-center text-2xl font-semibold mb-4"style={{ textAlign: 'center' }}>{asset.asset_name}</h2></div>
                        </CardHeader>                   
                        <div className="flex items-center justify-center">
                            {asset.asset_image && (
                                <img src={asset.asset_image} alt="Asset Image" className="max-w-[500px] max-h-[500px] my-4 border-4 border-blue-500 rounded-lg shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"  />
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-[#2F3D44] mb-2"><strong>Category:</strong> {asset.asset_category}</p>
                                <p className="text-xs text-[#2F3D44] mb-2"><strong>Category Code:</strong> {asset.category_code}</p>
                                <p className="text-xs text-[#2F3D44] mb-2"><strong>Condition:</strong> {asset.asset_condition}</p>
                                <p className="text-xs text-[#2F3D44] mb-2"><strong>Status:</strong> {asset.status}</p>
                            </div>
                            <div>
                                <p className="text-xs text-[#2F3D44] mb-2"><strong>Purchase Value [KES]:</strong> {asset.purchase_value}</p>
                                <p className="text-xs text-[#2F3D44] mb-2"><strong>Current Value [KES]:</strong> {asset.current_value}</p>
                                <p className="text-xs text-[#2F3D44] mb-2"><strong>Quantity:</strong> {asset.quantity}</p>
                                <p className="text-xs text-[#2F3D44]"><strong>Owning Dept:</strong> {departmentNames[asset.department_id]}</p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            {/* <button onClick={openRequestModal} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none mt-4" >Request Asset</button> */}
                            <button onClick={onClose} className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none mt-4 ml-2">Close</button>                        
                        </div>
                    </Card>
                </div>
            )}       
                {/* <AssetRequestFormModal
                    isOpen={showRequestModal}
                    onClose={() => setShowRequestModal(false)}
                    selectedAsset={asset}
                    departmentNames={departmentNames}
                /> */}
                {showRequestModal && (
                    <AssetRequestFormModal
                        isOpen={showRequestModal}
                        onClose={() => setShowRequestModal(false)}
                        selectedAsset={asset}
                        departmentNames={departmentNames}  />
                    )}                
        </Modal>
  )
}

export default AssetViewModal
