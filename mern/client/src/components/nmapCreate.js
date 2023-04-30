import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateNmap() {
  const [form, setForm] = useState({
    ip_address: "",
    scan_type: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newScan = { ...form };

    await fetch(`/nmap/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newScan),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setForm({ ip_address: "", scan_type: "" });
        navigate("/");
      })
      .catch((error) => {
        window.alert(error);
        return;
      });
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Nmap Scan</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="ip_address">IP Address</label>
          <input
            type="text"
            className="form-control"
            id="ip_address"
            value={form.ip_address}
            onChange={(e) => updateForm({ ip_address: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="scan_type">Scan Type</label>
          <input
            type="text"
            className="form-control"
            id="scan_type"
            value={form.scan_type}
            onChange={(e) => updateForm({ scan_type: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Scan"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
