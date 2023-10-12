import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import ReactPaginate from "react-paginate";

export function Department() {
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const departmentsPerPage = 12;

  useEffect(() => {
    // Fetch departments from the API using Axios
    axios
      .get("http://127.0.0.1:3000/departments")
      .then((response) => {
        console.log("API Response:", response.data);
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
                        <button onClick={() => handleEdit(id)}>Edit</button>
                        <button onClick={() => handleDelete(id)}>Delete</button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default Department;

