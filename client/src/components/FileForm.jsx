import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useState } from "react";
export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    setOpen(false);
    let formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    console.log(file);
    try {
      let response = await axios.post(
        "http://127.0.0.1:8080/file",
        formData,
        config
      );

      console.log(response);
      if (response.status === 200) {
        // Trigger file download
        const responseData = await response.data;
        const blob = new Blob([responseData], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Result-${file.name}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.log("Error encountered in handling the file:", error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="info" onClick={() => setOpen(true)}>
        Upload File
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} className="p-4">
        <DialogTitle>Upload File</DialogTitle>
        <div className="mb-4 mx-4">
          <div className="text-black text-lg mb-4">
            Please select your .csv file
          </div>
          <input
            id="input"
            type="file"
            name="data"
            accept=".xlsx,.csv"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            variant="contained"
            color="info"
            type="submit"
            disabled={file ? false : true}
            onClick={() => handleUpload()}
          >
            Upload
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
