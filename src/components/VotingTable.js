import React from "react";

const VotingTable = () => {
  return (
    <>
      <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Candidate Name</th>
      <th scope="col">Votes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Joe Biden</td>
      <td>0</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Donald Trump</td>
      <td>0</td>
    </tr>
  </tbody>
      </table>
      
      <div className="d-inline-flex">
      <select class="form-select" aria-label="Default select example">
  <option selected>Select Delegate</option>
  <option value="1">Joe Biden</option>
  <option value="2">Donald Trump</option>
</select>
      <input type="button" className="btn btn-primary" value="Vote"/>
      </div>
      
    </>
  )
}

export default VotingTable;