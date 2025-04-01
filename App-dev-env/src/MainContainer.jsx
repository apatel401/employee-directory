import { useEffect, useState, useMemo } from "react";
import EmployeeList from "./EmployeeList";
import BulletPointList from "./BulletPointList";

export const userPlaceholder =
  "https://inhabit-taqqut.com/wp-content/uploads/employee-images/user-placeolder.png";

const MainContainer = () => {
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState("");
  // const [selectedDepartment, setSelectedDepartment] = useState("Department");
  const [selectedCompany, setSelectedCompany] = useState("Company");
  const [selectedEmployee, setSelectedEmployee] = useState(null); // To track selected employee for modal
  const [viewMode, setViewMode] = useState("card"); // 'card' or 'list'
  const SPREADSHEET_ID = "1OROV9Nm9XJjlXbxbEyOVES47gyc9CN4p18FbXmSI_uM";
  const RANGE = "all-employees";
  const API_KEY = "AIzaSyB_PZvCeMLoTITwAFvEcrb2wt_kyloHgP4";
  useEffect(() => {
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.values) {
          data.values.shift();
          // console.log(data.values);
          const formattedData = data.values.map((row) => ({
            name: row[0],
            email: row[1],
            role: row[2],
            roleDescription: row[3],
            phone: row[4],
            company: row[5],
            image: row[6],
            professionalAreas: row[7],
            personalInterests: row[8],
          }));
          setEmployees(formattedData);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // // Extract unique departments for dropdown options
  // const departmentOptions = [
  //   "Department",
  //   ...new Set(employees.map((employee) => employee.department)),
  // ];

  const companyOptions = useMemo(
    () => [
      "Company",
      ...new Set(employees.map((employee) => employee.company)),
    ],
    [employees]
  );

  // Memoized filtered employees to avoid recalculations on every render
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch = Object.values(employee).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(query.toLowerCase())
      );

      const matchesCompany =
        selectedCompany === "Company" || employee.company === selectedCompany;

      return matchesSearch && matchesCompany;
    });
  }, [employees, query, selectedCompany]);

  // Function to clear all filters
  const clearFilters = () => {
    setQuery("");
    // setSelectedDepartment("Department");
    setSelectedCompany("Company");
  };

  return (
    <div className="main-content">
      <div className="filter-options">
        <input
          className="search-input"
          value={query}
          placeholder="Search Employees"
          onChange={(e) => handleChange(e)}
          type="text"
        />
        <div className="dropdown">
          {/* Company Dropdown */}
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="filter-dropdown">
            {companyOptions.map((company, index) => (
              <option key={index} value={company}>
                {company}
              </option>
            ))}
          </select>
          {/* Department Dropdown */}
          {/* <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="filter-dropdown">
              {departmentOptions.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select> */}
          {/* Clear Filters Button */}
          <button onClick={clearFilters} className="clear-filters">
            Clear Filters
          </button>
        </div>
        <div className="view-toggle">
          <button
            className={viewMode === "card" ? "active" : ""}
            onClick={() => setViewMode("card")}>
            <span className="dashicons dashicons-grid-view"></span>
          </button>
          <button
            className={viewMode === "list" ? "active" : ""}
            onClick={() => setViewMode("list")}>
            <span className="dashicons dashicons-menu"></span>
          </button>
        </div>
      </div>

      <div className="employee-cards">
        {filteredEmployees.length > 0 ? (
          <EmployeeList
            employees={filteredEmployees}
            viewMode={viewMode}
            setSelectedEmployee={setSelectedEmployee}
          />
        ) : (
          <div>No user Found.</div>
        )}
      </div>
      {/* Employee Details Modal */}
      {selectedEmployee && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedEmployee(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header">
              <img
                src={
                  !selectedEmployee.image
                    ? userPlaceholder
                    : selectedEmployee.image
                }
                alt={selectedEmployee.name}
                className="modal-image"
              />
              <div className="modal-header-info">
                <h2>{selectedEmployee.name}</h2>
                <p>
                  <strong>Company:</strong> {selectedEmployee.company}
                </p>
                <p>
                  <strong>Role:</strong> {selectedEmployee.role}
                </p>
                <p>
                  <strong>Email:</strong> {selectedEmployee.email}
                </p>
                <p>
                  <strong>Phone Number:</strong> {selectedEmployee.phone}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <div>
                <strong>Description:</strong>{" "}
                <BulletPointList text={selectedEmployee.roleDescription} />
              </div>
              <div className="div-sib" style={{display: "flex"}}>
                <div style={{width: "50%"}}>
                  <strong>Professional Areas:</strong>{" "}
                  <BulletPointList text={selectedEmployee.professionalAreas} />
                </div>
                <div>
                  <strong>Personal Interests:</strong>{" "}
                  <BulletPointList text={selectedEmployee.personalInterests} />
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              className="modal-close"
              onClick={() => setSelectedEmployee(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContainer;
