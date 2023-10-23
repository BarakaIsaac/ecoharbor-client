import React from "react";
import { Typography, Card, CardHeader, CardBody, IconButton, Menu, MenuHandler, MenuList, MenuItem, Avatar, Tooltip, Progress, } from "@material-tailwind/react";
import { ClockIcon, CheckIcon, EllipsisVerticalIcon, ArrowUpIcon, } from "@heroicons/react/24/outline";
import StatisticsChart from "/src/widgets/charts/statistics-chart";
import { // statisticsCardsData, 
  statisticsChartsData,
  // projectsTableData,
  // ordersOverviewData,
} from "/src/data/statistics-charts-data.js";

export function Home() {
    const first_name = localStorage.getItem("first_name");
  const last_name = localStorage.getItem("last_name");
  const userImage = localStorage.getItem("employee_image");

  return (
    <div className="mt-12">
      {/* <h1>Welcome {first_name} {last_name}</h1>
       <div>
        <Typography variant="h6" color="black">{`${first_name} ${last_name}`}</Typography>
        <div className="flex items-center"><img src="{userImage}" alt="image" className="h-10 w-10 rounded-full object-cover" /></div>



        </div> */}
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
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
      </div>
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
        <Card>
          <CardHeader floated={false} shadow={false} color="transparent" className="m-0 p-6" >
            <Typography variant="h6" color="blue-gray" className="mb-2">Asset Requests Overview</Typography>
            <Typography variant="small" className="flex items-center gap-1 font-normal text-blue-gray-600"  >
              <ArrowUpIcon strokeWidth={3} className="h-3.5 w-3.5 text-green-500" /> 
              <strong>24%</strong> this month
            </Typography>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

export default Home;
