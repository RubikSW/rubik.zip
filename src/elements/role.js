import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom

function RoleIcon({ title, ico, url }) {
  if (url) {
    return (
      <NavLink to={url} className="RoleIcon" activeClassName="active">
        <div className="Rolefa">
          <FontAwesomeIcon icon={ico} />
        </div>
        <span>{title}</span>
      </NavLink>
    );
  } else {
    return (
      <div className="RoleIcon">
        <div className="Rolefa">
          <FontAwesomeIcon icon={ico} />
        </div>
        <span>{title}</span>
      </div>
    );
  }
}

export default RoleIcon;