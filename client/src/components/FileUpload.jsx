import React from "react";
import FileForm from "./FileForm";
import "../App.css";
const FileUpload = () => {
  return (
    <div className="demoTable">
      <div className="mb-5 text-blue-400 font-semibold text-xl ml-24">
        Upload the .csv file containing customer data
      </div>
      <div className="">
        <div className="mx-24">
          <table className="border mt-2" cellPadding="15px">
            <thead>
              <td className="font-bold text-lg">#</td>
              <td>0</td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>8</td>
              <td>9</td>
              <td>10</td>
              <td>11</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
              <td>15</td>
              <td>16</td>
              <td>17</td>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold text-lg">Column</td>
                <td>customerID</td>
                <td>gender</td>
                <td>seniorCitizen</td>
                <td>Partner</td>
                <td>Dependents</td>
                <td>tenure</td>
                <td>PhoneService</td>
                <td>InternetService</td>
                <td>DeviceProtection</td>
                <td>TechSupport</td>
                <td>StreamingTV</td>
                <td>StreamingMovies</td>
                <td>Contract</td>
                <td>PaperlessBilling</td>
                <td>PaymentMethod</td>
                <td>MonthlyCharges</td>
                <td>TotalCharges</td>
                <td>Churn</td>
              </tr>
              <tr>
                <td className="font-bold text-lg">Dtype</td>
                <td>object</td>
                <td>object</td>
                <td>int64</td>
                <td>object</td>
                <td>object</td>
                <td>object</td>
                <td>object</td>
                <td>object</td>
                <td>object</td>
                <td>object</td>
                <td>object</td>
                <td>object</td>
                <td>object</td>
                <td>float64</td>
                <td>object</td>
                <td>object</td>
                <td>object</td>
                <td>object</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="font-bold mx-24 mt-12">
          Instructions:
          <ul className="list-disc font-normal">
            <li className="my-4 ml-4">
              Make sure that the data you upload is a .csv file{" "}
              <span className="text-red-600">(not .xlsx)</span>
            </li>
            <li className="my-4 ml-4">
              The columns of csv file should match the schema
            </li>
          </ul>
          <div className="mt-8">
            <FileForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
