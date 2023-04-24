import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const Httpx = (props) => (
  <tr>
    <td>{props.httpx.input}</td>
    <td>{props.httpx.host}</td>
    <td>{props.httpx.location}</td>
    <td>{props.httpx.scheme}</td>
    <td>{props.httpx.webserver}</td>
    {props.httpx.ports.map((port, index) => (
      <td key={index}>{port.number} - {port.protocol} - {port.state} - {port.service}</td>
    ))}
    <td>{props.httpx.final_url}</td>
    
    <td>
      <a className="btn btn-link" href={props.httpx.url} target="_blank" rel="noopener noreferrer">View</a>
    </td>
  </tr>
);

export default function HttpxList() {
  const { db_name } = useParams();
  const [httpxList, setHttpxList] = useState([]);

  useEffect(() => {
    async function getHttpxList() {
      const response = await fetch(`/${db_name}/httpx`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const httpxList = await response.json();
      setHttpxList(httpxList);
    }

    getHttpxList();
  }, [db_name]);

  function httpxListTable() {
    return httpxList.map((httpx) => {
      return (
        <div key={httpx._id}>
          <h4>{httpx._id}</h4>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Domain</th>
                <th>Host</th>
                <th>Location</th>
                <th>Scheme</th>
                <th>Webserver</th>
                <th>Ports</th>
                <th>Final URL</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <Httpx
                httpx={httpx}
                key={httpx._id}
              />
            </tbody>
          </table>
        </div>
      );
    });
  }

  return (
    <div>
      <h3>HTTPX List</h3>
      {httpxListTable()}
    </div>
  );
}
