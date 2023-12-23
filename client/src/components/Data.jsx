import React, { useState } from "react";
import TableComponent from "./TableComponent";
import FileUpload from "./FileUpload";
import { Button } from "@mui/material";

const Data = () => {
  const [option, setOption] = useState("table");

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-fit">
        <div className="text-center mb-10 flex justify-center items-center gap-4">
          <Button
            variant={option === "table" ? "contained" : "outlined"}
            id="table-select"
            onClick={() => setOption("table")}
          >
            Table
          </Button>
          <Button
            variant={option === "file" ? "contained" : "outlined"}
            id="file-select"
            onClick={() => setOption("file")}
          >
            File
          </Button>
        </div>
        <div className="">
          {option === "file" ? <FileUpload /> : <TableComponent />}
        </div>
      </div>
    </div>
  );
};

export default Data;
