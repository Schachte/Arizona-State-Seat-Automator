import React from 'react';
const Dashboard = (props) => (
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
              {props.classes.map((c) => (
                <tr key={c.get('class_name')}>
                  <td>{c.get('class_name')}</td>
                  <td>{c.get('class_number')}</td>
                  <td className="center">{c.get('professor')}</td>
                  <td className="center">{c.get('available_seats')}/{c.get('total_seats')}</td>
                  <td>{c.get('available_seats') > 0 ? 'Available' : 'Unavailable'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <br /><br />
    </div>
  </div>
);

export default Dashboard;
