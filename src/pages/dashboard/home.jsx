import { Typography, Card, CardHeader, CardBody, IconButton, Menu, MenuHandler, MenuList, MenuItem, Avatar, Tooltip, Progress, } from "@material-tailwind/react";
import { ClockIcon, CheckIcon, EllipsisVerticalIcon, ArrowUpIcon, } from "@heroicons/react/24/outline";
import StatisticsChart from "/src/widgets/charts/statistics-chart";
import {  statisticsChartsData,} from "/src/data/statistics-charts-data.js";
import { TokenOutlined } from "@mui/icons-material";
import axios from 'axios';
import { backendUrl } from "../../../backendConfig";
import React, { useState, useEffect } from 'react';

export function Home() {

    const [totalCost, setTotalCost] = useState(0); 

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
      } catch (error) {
        console.error('Error fetching asset data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-12">

      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
    <Card className="bg-white p-4 w-96 mx-auto shadow-lg">
      <Card className="bg-blue-500 hover:bg-blue-600 cursor-pointer p-4 transition duration-300 -mt-4 relative">
        <div>
          <Typography variant="h6" color="white" className="mb-1 font-bold">
            Total Assets Value:
          </Typography>
          <p className="text-2xl font-bold text-white hover:text-yellow-300 transition duration-300">
            {totalCost.toLocaleString('en-US', { style: 'currency', currency: 'KES', minimumFractionDigits: 2 })}
          </p>
        </div>
      </Card>
    </Card>
      </div>
      {/* <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography variant="small" className="flex items-center font-normal text-blue-gray-600" >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                &nbsp;{props.footer}
              </Typography>
            } />
        ))}
      </div> */}
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6" >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">Projects</Typography>
              <Typography variant="small" className="flex items-center gap-1 font-normal text-blue-gray-600" children={true}></Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"/>
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["asset_id", "asset", "category", "status", "Purchase Price", "Current Value"].map(
                    (el) => (
                      <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                        <Typography variant="small" className="text-[11px] font-medium uppercase text-blue-gray-400" >{el}</Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </CardBody>
        </Card>
        {/* <Card>
          <CardHeader floated={false} shadow={false} color="transparent" className="m-0 p-6" >
            <Typography variant="h6" color="blue-gray" className="mb-2">Asset Requests Overview</Typography>
            <Typography variant="small" className="flex items-center gap-1 font-normal text-blue-gray-600"  >
              <ArrowUpIcon strokeWidth={3} className="h-3.5 w-3.5 text-green-500" /> 
              <strong>24%</strong> this month
            </Typography>
          </CardHeader>
        </Card> */}
      </div>
    </div>
  );
}

export default Home;
