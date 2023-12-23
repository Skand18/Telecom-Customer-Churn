import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Popup from "reactjs-popup";
import axios from "axios";
import "reactjs-popup/dist/index.css";
const TableComponent = () => {
  const [user, setUser] = useState({
    customerID: "",
    gender: "",
    SeniorCitizen: "",
    Partner: "",
    Dependents: "",
    tenure: "",
    PhoneService: "",
    MultipleLines: "",
    InternetService: "",
    OnlineSecurity: "",
    OnlineBackup: "",
    DeviceProtection: "",
    TechSupport: "",
    StreamingTV: "",
    StreamingMovies: "",
    Contract: "",
    PaperlessBilling: "",
    PaymentMethod: "",
    MonthlyCharges: "",
    TotalCharges: "",
  });

  const [fill, setFill] = useState(false);
  const [activity, setActivity] = useState(() => {
    const storedData = localStorage.getItem("act");
    return storedData ? JSON.parse(storedData) : [];
  });

  const handleRemove = i => {
    console.log("Deleted");
    const updateList = activity.filter((_val, idx) => {
      return i != idx;
    });
    setActivity(updateList);
  };
  const handleUpload = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let response = await axios.post(
      "http://127.0.0.1:8080/data",
      JSON.stringify(activity),
      config
    );
    console.log("Response received: ", response.status);
    if (response.status === 200) {
      // Trigger file download
      const responseData = await response.data;
      const blob = new Blob([responseData], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Result.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };
  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const Add = () => {
    setActivity(activit => {
      const list = [...activit, user];
      return list;
    });
    setUser({});
  };
  useEffect(() => {
    let val = JSON.stringify(activity);
    localStorage.setItem("act", val);
    if (activity.length > 0) setFill(true);
    else setFill(false);
  }, [activity]);

  return (
    <div className="text-center p-10">
      <div className="mb-5 text-blue-400 font-semibold">
        Enter the customer details
      </div>
      <div className="button-row flex justify-center items-center gap-4 mt-10">
        <Popup
          className="w-48"
          trigger={
            <Button variant="contained" color="info">
              New Customer
            </Button>
          }
          modal
          nested>
          <div>
            <label>Customer Id : </label>
            <input
              type="text"
              placeholder="Customer ID"
              value={user.customerID}
              name="customerID"
              className="ml-8 w-64 p-2 outline-none"
              onChange={handleChange}></input>
            {/* <br /> */}
            <label>Gender : </label>
            <input
              type="text"
              placeholder="Male/Female"
              value={user.gender}
              name="gender"
              className="ml-8 w-64 p-2 outline-none"
              onChange={handleChange}
              required></input>
            <br />
            <label>Senior Citizen : </label>
            <input
              type="number"
              placeholder="0/1"
              value={user.SeniorCitizen}
              name="SeniorCitizen"
              className="ml-8 w-64 p-2 outline-none"
              onChange={handleChange}></input>
            {/* <br /> */}
            <label>Partner : </label>
            <input
              type="text"
              placeholder="Yes/No"
              value={user.Partner}
              name="Partner"
              className="ml-8 w-64 p-2 outline-none"
              onChange={handleChange}></input>
            <br />
            <label>Dependents : </label>
            <input
              type="text"
              placeholder="Yes/No"
              value={user.Dependents}
              name="Dependents"
              className="ml-8 w-64 p-2 outline-none"
              onChange={handleChange}></input>
            {/* <br /> */}
            <label>Tenure : </label>
            <input
              type="number"
              placeholder="0"
              value={user.tenure}
              name="tenure"
              className="ml-8 w-64 p-2 outline-none"
              onChange={handleChange}></input>
            <br />
            <label>PhoneService : </label>
            <input
              type="text"
              placeholder="Yes/No"
              value={user.PhoneService}
              name="PhoneService"
              className="ml-8 w-64 p-2 outline-none"
              onChange={handleChange}></input>{" "}
            {/* <br /> */}
            <label>MultipleLines</label>
            <input
              type="text"
              placeholder="Yes/No"
              value={user.MultipleLines}
              name="MultipleLines"
              className="ml-8 w-64 p-2 outline-none"
              onChange={handleChange}></input>
            <br />
            <label>InternetService : </label>
            <input
              type="text"
              placeholder="Yes/No"
              value={user.InternetService}
              name="InternetService"
              className="ml-8 w-64 p-2 outline-none"
              onChange={handleChange}></input>{" "}
            {/* <br /> */}
            <label>Online Security : </label>
            <input
              type="text"
              placeholder="Yes/No"
              value={user.OnlineSecurity}
              name="OnlineSecurity"
              className="ml-8 w-64 p-2 outline-none"
              onChange={handleChange}></input>
            <br />
            <label>OnlineBackup : </label>
            <input
              type="text"
              placeholder="Yes/No"
              value={user.OnlineBackup}
              name="OnlineBackup"
              className="ml-8 w-64 p-2 outline-none"
              onChange={handleChange}></input>
            {/* <br /> */}
            <label className="mx-2">DeviceProtection : </label>
            <input
              type="text"
              placeholder="Yes/No"
              value={user.DeviceProtection}
              name="DeviceProtection"
              className="ml-8 w-64 p-2 outline-none"
              onChange={handleChange}></input>{" "}
            <br />
            <label>TechSupport : </label>
            <input
              type="text"
              placeholder="Yes/No"
              value={user.TechSupport}
              name="TechSupport"
              className="ml-8 w-64 p-2 outline-none"
              onChange={handleChange}></input>{" "}
            {/* <br /> */}
            <label>StreamingTV : </label>
            <input
              type="text"
              placeholder="Yes/No"
              value={user.StreamingTV}
              name="StreamingTV"
              className="ml-8 w-64 p-2 outline-none"
              onChange={handleChange}></input>{" "}
            <br />
            <label>StreamingMovies : </label>
            <input
              type="text"
              placeholder="Yes/No"
              value={user.StreamingMovies}
              name="StreamingMovies"
              className="ml-8 w-64 p-2 outline-none"
              onChange={handleChange}></input>{" "}
            {/* <br /> */}
            <label>Contract : </label>
            <input
              type="text"
              placeholder="Enter your Contract"
              value={user.Contract}
              name="Contract"
              className="ml-8 w-64 p-2 outline-none"
              onChange={handleChange}></input>
            <br />
            <label>PaperlessBilling : </label>
            <input
              type="text"
              placeholder="billing"
              value={user.PaperlessBilling}
              name="PaperlessBilling"
              className="ml-8 w-64 p-2 outline-none"
              onChange={handleChange}></input>{" "}
            {/* <br /> */}
            <label>Payment Method : </label>
            <input
              type="text"
              placeholder="Payment Method"
              value={user.PaymentMethod}
              name="PaymentMethod"
              className="ml-8 w-64 p-2 outline-none"
              onChange={handleChange}></input>{" "}
            <br />
            <label>Monthly Charges : </label>
            <input
              type="number"
              placeholder="0"
              value={user.MonthlyCharges}
              name="MonthlyCharges"
              className="ml-8 w-64 p-2 outline-none"
              onChange={handleChange}></input>
            {/* <br /> */}
            <label>Total Charges: </label>
            <input
              type="number"
              placeholder="0"
              value={user.TotalCharges}
              name="TotalCharges"
              className="ml-8 w-64 p-2 outline-none"
              onChange={handleChange}></input>
            <br />
            <Button variant="contained" color="info" onClick={() => Add()}>
              Add Your Details
            </Button>
          </div>
        </Popup>
        <Button
          variant="contained"
          color="info"
          onClick={() => {
            handleUpload();
          }}>
          Submit
        </Button>
      </div>

      {fill ? (
        <div>
          <table className="border border-black mt-8">
            <thead>
              <tr>
                <th>Customer Id</th>
                <th>Gender</th>
                <th>Senior Citizen</th>
                <th>Partners</th>
                <th>Dependents</th>
                <th>Tenure</th>
                <th>PhoneService</th>
                <th>Multiple Lines</th>
                <th>Internet Service</th>
                <th>Online Security</th>
                <th>Online Backup</th>
                <th>Device Protection</th>
                <th>Tech Support</th>
                <th>Stream TV</th>
                <th>Stream Movies</th>
                <th>Contract</th>
                <th>Paperless Billing</th>
                <th>Payment Method</th>
                <th>Monthly Charges</th>
                <th>Total Charges</th>
              </tr>
            </thead>
            <tbody>
              {activity !== null &&
                activity.map((val, i) => {
                  return (
                    <tr key={i}>
                      <td>{val.customerID}</td>
                      <td>{val.gender}</td>
                      <td>{val.SeniorCitizen}</td>
                      <td>{val.Partner}</td>
                      <td>{val.Dependents}</td>
                      <td>{val.tenure}</td>
                      <td>{val.PhoneService}</td>
                      <td>{val.MultipleLines}</td>
                      <td>{val.InternetService}</td>
                      <td>{val.OnlineSecurity}</td>
                      <td>{val.OnlineBackup}</td>
                      <td>{val.DeviceProtection}</td>
                      <td>{val.TechSupport}</td>
                      <td>{val.StreamingMovies}</td>
                      <td>{val.StreamingTV}</td>
                      <td>{val.Contract}</td>
                      <td>{val.PaperlessBilling}</td>
                      <td>{val.PaymentMethod}</td>
                      <td>{val.MonthlyCharges}</td>
                      <td>{val.TotalCharges}</td>
                      <td>
                        <DeleteIcon
                          onClick={() => handleRemove(i)}
                          className="cursor-pointer"
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-8 text-center font-semibold text-lg">
          No data exists!!
        </div>
      )}
    </div>
  );
};
export default TableComponent;
