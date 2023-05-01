import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HttpxList from './HttpxList';
import CreateHttpx from './CreateHttpx';

function HttpxPage() {
  const { db_name } = useParams();
  const [httpxList, setHttpxList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHttpxList() {
      try {
        const response = await fetch(`/${db_name}/httpx`);
        if (response.ok) {
          const data = await response.json();
          setHttpxList(data);
        } else {
          throw new Error('Unable to fetch HTTPX list');
        }
      } catch (err) {
        console.error(err);
        window.alert(`Error fetching HTTPX list: ${err.message}`);
      }
    }

    fetchHttpxList();
  }, [db_name]);

  const addHttpx = (newHttpx) => {
    setHttpxList((prevHttpxList) => [...prevHttpxList, newHttpx]);
    navigate(-1);
  };

  return (
    <div>
      <h1>HTTPX Page</h1>
      <CreateHttpx db_name={db_name} addHttpx={addHttpx} />
      <HttpxList httpxList={httpxList} />
    </div>
  );
}

export default HttpxPage;
