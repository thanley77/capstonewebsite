import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const Httpx = (props) => (
  <tr>
    <td>{props.httpx.input}</td>
    <td>{props.httpx.host}</td>
    <td>{props.httpx.location}</td>
    <td>{props.httpx.title}</td>
    <td>{props.httpx.scheme}</td>
    <td>{props.httpx.method}</td>
    <td>{props.httpx.webserver}</td>
    <td>
      <a className="btn btn-link" href={props.httpx.url} target="_blank" rel="noopener noreferrer">URL</a>
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
            <th>Title</th>
            <th>Scheme</th>
            <th>Method</th>
            <th>Webserver</th>
          </tr>
        </thead>
        <tbody>{httpxListTable()}</tbody>
      </table>
    </div>
  );
}
