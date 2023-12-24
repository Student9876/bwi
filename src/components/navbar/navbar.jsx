import React from "react";

function Navbar(props) {



    return <>
        <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
            <div className="container-fluid">
                <button
                    data-mdb-collapse-init
                    className="navbar-toggler"
                    type="button"
                    data-mdb-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/dashboard">Dashboard</a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" href="/profile">Profile</a>
                        </li> */}
                        <li className="nav-item">
                            <a className="nav-link" href="/" onClick={props.handleLogout}>Logout</a>
                        </li>
                        <li className="nav-item">
                            <a href='/cart' className="nav-link">
                                <i className="fas fa-shopping-cart"></i>
                                <span className="badge rounded-pill badge-notification bg-danger">{props.items}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
}

export default Navbar;