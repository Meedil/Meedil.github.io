import { Link } from "react-router-dom";
import gigIcon from "../Images/Ghalaba Instagram - 256x256.png";
import "./Navbar.css";
import { homepage } from "./Router";

export default function Navbar() {
  return (
    <nav className="navbar fixed-top navbar-expand bg-light my-nav">
      <div className="container-fluid d-flex p-2">
        <Link
          className="navbar-brand d-flex align-items-center me-1 me-sm-2 me-md-3"
          to={homepage}
        >
          <img
            src={gigIcon}
            alt=""
            width="32"
            height="32"
            className="d-inline-block me-1"
          />
          <h4 className="my-0">Photo Galari</h4>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse align-items-center navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-lg-0">
            <li className="nav-item">
              <Link
                to={homepage + "/public"}
                className="nav-link textd-none shrink-text"
              >
                Public
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={homepage + "/local"}
                className="nav-link textd-none shrink-text"
              >
                Local
              </Link>
            </li>
          </ul>
          <Link
            to={homepage + "/add-post"}
            className="add-post-btn shrink-text rounded text-white py-1 px-2 px-md-3 textd-none me-3"
          >
            + Post
          </Link>
        </div>
      </div>
    </nav>
  );
}
