import React, { useEffect, useState } from "react";
const Httpx = (props) => (
  <tr>
    <td>{props.httpx.input}</td>
    <td>{props.httpx.host}</td>
    <td>{props.httpx.location}</td>
    <td>{props.httpx.scheme}</td>
    <td>{props.httpx.webserver}</td>
    <td>{props.httpx.status_code}</td>
    <td>{props.httpx.final_url}</td>
    
    <td>
      <a className="btn btn-link" href={props.httpx.url} target="_blank" rel="noopener noreferrer">View</a>
    </td>
  </tr>
);

export default function HttpxList() {
  const [httpxList, setHttpxList] = useState([]);

  useEffect(() => {
    async function getHttpxList() {
      const response = await fetch(`/:dbname/httpx`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const httpxList = await response.json();
      setHttpxList(httpxList);
    }

    getHttpxList();

    return;
  }, [httpxList.length]);

  function httpxListTable() {
    return httpxList.map((httpx) => {
      return (
        <Httpx
          httpx={httpx}
          key={httpx._id}
        />
      );
    });
  }

  return (
    <div>
      <h3>HTTPX List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Domain</th>
            <th>Host</th>
            <th>Location</th>
            <th>Scheme</th>
            <th>Webserver</th>
            <th>StatusCode</th>
            <th>Action</th>
            <th>FinalURL</th>
          </tr>
        </thead>
        <tbody>{httpxListTable()}</tbody>
      </table>
    </div>
  );
}
