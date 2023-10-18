import React from 'react';
import './index.css'; 

function Footer() {
  const apiVersion = "1.0"; 

  return (
    <div className="footer">
      <span className="api-version">API Version: {apiVersion}</span>
    </div>
  );
}

export default Footer;