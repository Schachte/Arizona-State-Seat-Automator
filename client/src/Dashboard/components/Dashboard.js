import React from 'react';
const Dashboard = () => (
  <div className="row">
    <div className="content-box-large box-with-header">
      <div className="content-box-large">
        <div className="panel-heading">
          <div className="panel-title">Class Watch List</div>
        </div>
        <div className="panel-body">
          <table cellPadding="0" cellSpacing="0" className="table table-striped table-bordered" id="example">
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Class Number</th>
                <th>Professor</th>
                <th>Seats</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd">
                <td>Artificial Intelligence</td>
                <td>102392</td>
                <td>Heni Ben Amor</td>
                <td className="center">0/200</td>
                <td className="center" style={{ backgroundColor: '#e74c3c' }}>Unavailable</td>
              </tr>
              <tr className="even">
                <td>Statistical Machine Learning</td>
                <td>23425</td>
                <td>Jingrui He</td>
                <td className="center">5/200</td>
                <td className="center" style={{ backgroundColor: '#27ae60' }}>Available</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br /><br />
    </div>
  </div>
);

export default Dashboard;