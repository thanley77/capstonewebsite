import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNmap = () => {
  const [formData, setFormData] = useState({
    domain: "",
    scan: {},
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddPort = () => {
    setFormData((prevState) => ({
      ...prevState,
      scan: {
        ...prevState.scan,
        [Date.now()]: {
          State: "",
          Protocol: "",
          Service: "",
        },
      },
    }));
  };

  const handlePortChange = (event, portId, field) => {
    const value = event.target.value;
    setFormData((prevState) => ({
      ...prevState,
      scan: {
        ...prevState.scan,
        [portId]: {
          ...prevState.scan[portId],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/:db_name/nmap"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      navigate(`/nmap`);
    } else {
      window.alert(`An error occurred: ${response.statusText}`);
    }
  };

  return (
    <div>
      <h3>Add Nmap Entry</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="domain">Domain</label>
          <input
            type="text"
            className="form-control"
            id="domain"
            name="domain"
            value={formData.domain}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ports">Ports</label>
          <table className="table">
            <thead>
              <tr>
                <th>Port Number</th>
                <th>State</th>
                <th>Protocol</th>
                <th>Service</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(formData.scan).map((portId) => {
                const port = formData.scan[portId];
                return (
                  <tr key={portId}>
                    <td>{portId}</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="State"
                        value={port.State}
                        onChange={(e) => handlePortChange(e, portId, "State")}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="Protocol"
                        value={port.Protocol}
                        onChange={(e) =>
                          handlePortChange(e, portId, "Protocol")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="Service"
                        value={port.Service}
                        onChange={(e) =>
                          handlePortChange(e, portId, "Service")
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button type="button" onClick={handleAddPort}>
            Add Port
          </button>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddNmap;
