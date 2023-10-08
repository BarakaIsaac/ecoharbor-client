import React from "react";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export function Department() {
  return (
      <CardHeader mx="auto">
        <Typography variant="h6" color="blue-gray">
          Department List
        </Typography>
        <Typography variant="caption" color="blue-gray">
          <InformationCircleIcon className="h-5 w-5" />
        </Typography>
      </CardHeader>
  );
}

export default Department;
