import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hostname = (props) => (
  <tr>
    <td>{props.hostnames.name}</td>
    <td>{props.hostnames.position}</td>
    <td>{props.hostnames.level}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.hostnames._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteHostname(props.hostnames._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function HostnameList() {
  const [hostnames, setHostnames] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getHostnames() {
      const response = await fetch(`/hostnames/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const hostnames = await response.json();
      setHostnames(hostnames);
    }

    getHostnames();

    return; 
  }, [hostnames.length]);

  // This method will delete a record
  async function deleteHostnames(id) {
    await fetch(`/${id}`, {
      method: "DELETE"
    });

    const newHostnames = hostnames.filter((el) => el._id !== id);
    setHostnames(newHostnames);
  }

  // This method will map out the records on the table
  function hostnamesList() {
    return hostnames.map((hostnames) => {
      return (
        <Hostnames
          hostname={hostname}
          deleteHostname={() => deleteHostname(hostname._id)}
          key={hostname._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Hostname List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{hostnamesList()}</tbody>
      </table>
    </div>
  );
}
