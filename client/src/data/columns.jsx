import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const columns = [
    { field: 'id', headerName: 'ID', sortable: false },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        getActions: () => [
          <GridActionsCellItem icon={<EditIcon />} label="Edit" />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
        ],
    },
    { field: 'Churn', headerName: 'Churn', sortable: false },
    { field: 'ChurnConfidence', headerName: 'Confidenc', sortable: false },
    { field: 'customerID', headerName: 'Customer ID', sortable: false },
    { field: 'gender', headerName: 'Gender', sortable: false },
    { field: 'SeniorCitizen', headerName: 'Senior Citizen', sortable: false },
    { field: 'Partner', headerName: 'Partner', sortable: false },
    { field: 'Dependents', headerName: 'Dependents', sortable: false },
    { field: 'tenure', headerName: 'Tenure', sortable: false },
    { field: 'PhoneService', headerName: 'Phone Service', sortable: false },
    { field: 'MultipleLines', headerName: 'Multiple Lines', sortable: false },
    { field: 'InternetService', headerName: 'Internet Service', sortable: false },
    { field: 'OnlineSecurity', headerName: 'Online Security', sortable: false },
    { field: 'OnlineBackup', headerName: 'Online Backup', sortable: false },
    { field: 'DeviceProtection', headerName: 'Device Protection', sortable: false },
    { field: 'TechSupport', headerName: 'Tech Support', sortable: false },
    { field: 'StreamingTV', headerName: 'Streaming TV', sortable: false },
    { field: 'StreamingMovies', headerName: 'Streaming Movies', sortable: false },
    { field: 'Contract', headerName: 'Contract', sortable: false },
    { field: 'PaperlessBilling', headerName: 'Paperless Billing', sortable: false },
    { field: 'PaymentMethod', headerName: 'Payment Method', sortable: false },
    { field: 'MonthlyCharges', headerName: 'Monthly Charges', sortable: false },
    { field: 'TotalCharges', headerName: 'TotalCharges', sortable: false },
];

const row = {
    id: '1',
    customerID: "7590-VHVEG",
    gender: "Female",
    seniorCitizen: 0,
    Partner: "Yes",
    Dependents: "No",
    tenure: "1",
    PhoneService: "No",
    MultipleLines: "No phone service",
    InternetService: "DSL",
    OnlineSecurity: "No",
    OnlineBackup: "No",
    DeviceProtection: "No",
    TechSupport: "No",
    StreamingTV: "No",
    StreamingMovies: "No",
    Contract: "Month-to-month",
    PaperlessBilling: "Yes",
    PaymentMethod: "Electronic check",
    MonthlyCharges: 29.85,
    TotalCharges: "29.85",
};

const rowObj = {
    id: '',
    customerID: '',
    gender: '',
    seniorCitizen: '',
    Partner: '',
    Dependents: '',
    tenure: '',
    PhoneService: '',
    MultipleLines: '',
    InternetService: '',
    OnlineSecurity: '',
    OnlineBackup: '',
    DeviceProtection: '',
    TechSupport: '',
    StreamingTV: '',
    StreamingMovies: '',
    Contract: '',
    PaperlessBilling: '',
    PaymentMethod: '',
    MonthlyCharges: '',
    TotalCharges: '',
};

export default columns;
export {rowObj, row};