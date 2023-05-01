import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CreateHttpx() {
  const [input, setInput] = useState('');
  const [host, setHost] = useState('');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [scheme, setScheme] = useState('');
  const [contentType, setContentType] = useState('');
  const [method, setMethod] = useState('');
  const [webserver, setWebserver] = useState('');
  const [statusCode, setStatusCode] = useState('');
  const [contentLength, setContentLength] = useState('');
  const [finalUrl, setFinalUrl] = useState('');
  const [tech, setTech] = useState('');

  const { db_name } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newHttpx = {
      input,
      host,
      location,
      title,
      scheme,
      content_type: contentType,
      method,
      webserver,
      status_code: statusCode,
      content_length: contentLength,
      final_url: finalUrl,
      tech: tech.split(','),
    };

    try {
      await axios.post(`/${db_name}/httpx`, newHttpx);
      navigate(-1); // Go back to the previous page
    } catch (err) {
      console.error(err);
      window.alert(`Error creating new HTTPX: ${err.message}`);
    }
  };

  return (
    <div>
      <h3>Create new HTTPX</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="input">Input</label>
          <input
            type="text"
            className="form-control"
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="host">Host</label>
          <input
            type="text"
            className="form-control"
            id="host"
            value={host}
            onChange={(e) => setHost(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="scheme">Scheme</label>
          <input
            type="text"
            className="form-control"
            id="scheme"
            value={scheme}
            onChange={(e) => setScheme(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contentType">Content Type</label>
          <input
            type="text"
            className="form-control"
            id="contentType"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
        />
        </div>
        <div className="form-group">
          <label htmlFor="method">Method</label>
          <input
            type="text"
            className="form-control"
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
        />
        </div>
        <div className="form-group">
          <label htmlFor="webserver">Webserver</label>
          <input
            type="text"
            className="form-control"
            id="webserver"
            value={webserver}
            onChange={(e) => setWebserver(e.target.value)}
        />
        </div>
        <div className="form-group">
          <label htmlFor="statusCode">Status Code</label>
          <input
            type="text"
            className="form-control"
            id="statusCode"
            value={statusCode}
            onChange={(e) => setStatusCode(e.target.value)}
        />
        </div>
        <div className="form-group">
          <label htmlFor="contentLength">Content Length</label>
          <input
            type="text"
            className="form-control"
            id="contentLength"
            value={contentLength}
            onChange={(e) => setContentLength(e.target.value)}
        />
        </div>
        <div className="form-group">
          <label htmlFor="finalUrl">Final URL</label>
          <input
            type="text"
            className="form-control"
            id="finalUrl"
            value={finalUrl}
            onChange={(e) => setFinalUrl(e.target.value)}
       />
       </div>
       <div className="form-group">
         <label htmlFor="tech">Tech</label>
         <input
           type="text"
           className="form-control"
           id="tech"
           value={tech}
           onChange={(e) => setTech(e.target.value)}
      />
      </div>
      <button type="submit" className="btn btn-primary">
          Create
      </button>
  </form>
</div>
);
};

export default CreateHttpx;
