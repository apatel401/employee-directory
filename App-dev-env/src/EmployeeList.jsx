/* eslint-disable react/prop-types */

import { userPlaceholder } from "./MainContainer";

const EmployeeList = ({ employees, viewMode, setSelectedEmployee }) => {


  return viewMode === "card" ? employees.map((employee) => (
            <div className="employee-card" key={employee.id} onClick={() => setSelectedEmployee(employee)}>
              <div className="profile-pic">
              <img src={employee.image ? employee.image : userPlaceholder} alt={employee.name} />
              </div>
              <h3>{employee.name}</h3>
              {/* <p>{employee.phone}</p> */}
              <p>{employee.company}</p>
              {/* <td>{employee.professionalAreas}</td>
              <td>{employee.personalInterests}</td> */}
            </div>
          ))
      : (
        <div className="table-container">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Role</th>
                <th>Company</th>
                {/* <th>Professional Areas</th>
                <th>Personal Interests</th> */}
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee.id}  onClick={() => setSelectedEmployee(employee)}>
                    <td>
                      <img  src={employee.image ? employee.image : userPlaceholder}  alt={employee.name} />
                    </td>
                    <td>{employee.name}</td>
                    <td>{employee.role}</td>
                    <td>{employee.company}</td>
                    {/* <td>{employee.professionalAreas}</td>
                    <td>{employee.personalInterests}</td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );
};

export default EmployeeList;
