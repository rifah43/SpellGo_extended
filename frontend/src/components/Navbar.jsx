import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const userRole = localStorage.getItem('role');
  const quizLink = userRole === 'user' ? '/dashboard/perform-quiz' : '/dashboard/quiz';
  let showProgressLink = false;
  if (userRole === 'user') {
    showProgressLink = true;
  }

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li
          className="nav-item"
          onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown}
        >
          <span>
            <FontAwesomeIcon icon={faBars} className="icon" /> {/* 3-line icon */}
          </span>
          {dropdownOpen && (
            <ul className="dropdown">
              <li className="dropdown-item">
                <Link to="/dashboard/progress">Home</Link>
              </li>
              <hr />
              {/* <li className="dropdown-item">
                <Link to="/dashboard/customThemeAdder">Theme</Link>
              </li>
              <hr /> */}
              <li className="dropdown-item">
                <Link to="/dashboard/progress">Dashboard</Link>
              </li>
              <hr />
              <li className="dropdown-item">
                <Link to="/dashboard/profile-edit">Profile</Link>
              </li>
              <hr />
              {showProgressLink && (
                <>
                <li className="dropdown-item">
                <Link to={quizLink}>Quiz</Link>
                </li>
                <hr />
                <li className="dropdown-item">
                <Link to="/dashboard/game">Game</Link>
                </li>
                <hr />
                  <li className="dropdown-item">
                    <Link to="/dashboard/progress">Progress</Link>
                  </li>
                  <hr />
                  <li className="dropdown-item">
                    <Link to="/dashboard/chatbot">Chatbot</Link>
                  </li>
                </>
              )}
              {!showProgressLink && (
                <>
                  <li className="dropdown-item">
                <Link to={quizLink}>Add Question</Link>
                  </li>
                  <hr />
                  <li className="dropdown-item">
                    <Link to="/dashboard/add-level">Add Level</Link>
                  </li>
                </>
              )}
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;