import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import VotingTable from "./components/VotingTable"

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <h1 className="text-center my-5">Delegate Voting </h1>
    <VotingTable />
  </React.StrictMode>,
  document.getElementById('root')
);


