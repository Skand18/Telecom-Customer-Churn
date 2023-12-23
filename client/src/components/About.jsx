import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';

const About = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/data");
  };
  return (
    <div className="">
      <div className="text-4xl text-center text-blue-400 font-bold py-4">
        Telecom Customer Churn Prediction
        <div className="flex justify-center items-center mt-8">
          <img
            className="w-auto h-44 "
            src="https://miro.medium.com/v2/resize:fit:1400/1*WqId29D5dN_8DhiYQcHa2w.png"
          />
        </div>
      </div>
      <div className="mt-4 mx-16">
        <div className="text-2xl font-semibold">Objectives</div>
        <div>
          <p className="mt-4">
            The main objective of our project is to evaluate and predict the
            likelihood of a customer churning from a telecom company.The
            objectives are:
          </p>
          <ol className="list-disc">
            <li className="my-2 ml-6">
              Finding the % of Churn Customers and customers that keep in with
              the active services.
            </li>
            <li className="my-2 ml-6">
              Analyzing the data in terms of various features responsible for
              customer Churn.
            </li>
            <li className="my-2 ml-6">
              Finding a most suited machine learning model for correct
              classification of Churn and Non-Churn customers
            </li>
            <li className="my-2 ml-6">
              Predicting based on customer details the likelihood of churning.
            </li>
          </ol>
        </div>
      </div>
      <div className="text-center mt-8">
        <Button variant="contained" onClick={handleClick}>Upload Files / Enter Details</Button>
      </div>
    </div>
  );
};

export default About;
