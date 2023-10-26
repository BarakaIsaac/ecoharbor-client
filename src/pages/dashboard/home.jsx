import { Typography, Card, } from "@material-tailwind/react";
import axios from 'axios';
import { backendUrl } from "../../../backendConfig";
import React, { useState, useEffect } from 'react';
import AssetRepair from "./AssetRepair.jsx";

export function Home() {

const [totalCost, setTotalCost] = useState(0);
const [totalAssets, setTotalAssets] = useState(0); 
const [totalEmployees, setTotalEmployees] = useState(0);
const [totalAssetRequests, setTotalAssetRequests] = useState(0);
const [totalRepairs, setTotalRepairs] = useState(0);

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/assetz`, {
          headers: {
            'Authorization': 'Bearer your_token',
            'Content-Type': 'application/json',
          },
        });
        const assets = response.data;

        const calculatedTotalCost = assets.reduce((total, asset) => {
          const assetValue = parseFloat(asset.current_value);
          if (!isNaN(assetValue)) {
            return total + assetValue;
          }
          return total;
        }, 0);
        
        setTotalCost(calculatedTotalCost);
        setTotalAssets(assets.length);
        // Fetch total number of employees
        const employeesResponse = await axios.get(`${backendUrl}/employees`, {
          headers: {
            'Authorization': 'Bearer your_token',
            'Content-Type': 'application/json',
          },
        });
        setTotalEmployees(employeesResponse.data.length);
        // Fetch total number of asset requests
        const assetRequestsResponse = await axios.get(`${backendUrl}/requests`, {
          headers: {
            'Authorization': 'Bearer your_token',
            'Content-Type': 'application/json',
          },
        });
        setTotalAssetRequests(assetRequestsResponse.data.length);
        const repairsResponse = await axios.get(`${backendUrl}/repairs`, {
        headers: {
          'Authorization': 'Bearer your_token',
          'Content-Type': 'application/json',
        },
      });
      setTotalRepairs(repairsResponse.data.length);
      } catch (error) {
        console.error('Error fetching asset data: ', error);
          console.error('Response Data: ', error.response.data);
      }
    };

    fetchData();
  }, []);
  

  return (
<div className="grid mt-12">
  <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-3 xl:grid-cols-4">
    <div className="mb-4 md:col-span-1 xl:col-span-1">
      <Card className="bg-purple-400 hover-bg-blue-600 cursor-pointer p-4 transition duration-300 -mt-4 relative shadow-md">
        <div>
          <Typography variant="h6" className="mb-1 font-bold text-black">
            Total Assets Value:
          </Typography>
          <p className="text-center text-2xl font-bold text-black hover-text-white-300 transition duration-300">
            {totalCost.toLocaleString('en-US', { style: 'currency', currency: 'KES', minimumFractionDigits: 2 })}
          </p>
        </div>
      </Card>
    </div>

    <div className="mb-4 md:col-span-1 xl:col-span-1">
      <Card className="bg-green-500 hover-bg-blue-600 cursor-pointer p-4 transition duration-300 -mt-4 relative shadow-md">
        <div>
          <Typography variant="h6" className="mb-1 font-bold text-black">Total Number of Assets:</Typography>
          <p className="text-center text-2xl font-bold text-black hover-text-yellow-300 transition duration-300">
            {totalAssets}
          </p>
        </div>
      </Card>
    </div>

    <div className="mb-4 md:col-span-1 xl:col-span-1">
      <Card className="bg-orange-500 hover-bg-blue-600 cursor-pointer p-4 transition duration-300 -mt-4 relative shadow-md">
        <div>
          <Typography variant="h6" className="mb-1 font-bold text-black">
            Total Assets on Repair:
          </Typography>
          <p className="text-center text-2xl font-bold text-black hover-text-yellow-300 transition duration-300">
            {totalRepairs}
          </p>
        </div>
      </Card>
    </div>

    <div className="mb-4 md:col-span-1 xl:col-span-1">
      <Card className="bg-pink-500 hover-bg-blue-600 cursor-pointer p-4 transition duration-300 -mt-4 relative shadow-md">
        <div>
          <Typography variant="h6" className="mb-1 font-bold text-black">
            Total Asset Requests:
          </Typography>
          <p className="text-center text-2xl font-bold text-black hover-text-yellow-300 transition duration-300">
            {totalAssetRequests}
          </p>
        </div>
      </Card>
    </div>
  </div>
{/*  <div className="mb-4 md:col-span-1 xl:col-span-1">*/}
{/*  <Card className="bg-[#379CF0] hover-bg-blue-600 cursor-pointer p-4 transition duration-300 -mt-4 relative shadow-md">*/}
{/*    <div>*/}
{/*      <Typography variant="h6" className="mb-1 font-bold text-black">*/}
{/*        Total Assets on Repair:*/}
{/*      </Typography>*/}
{/*      <p className="text-center text-2xl font-bold text-white hover-text-yellow-300 transition duration-300">*/}
{/*        {totalRepairs}*/}
{/*      </p>*/}
{/*    </div>*/}
{/*  </Card>*/}
{/*</div>*/}
  <div className="mb-4 md:col-span-1 xl:col-span-1">
    <AssetRepair/>
  </div>
</div>


  );
}

export default Home;
