import React, { useState } from "react";
import logo from "../assets/img/logo-plachilko.svg";
import menuOpener from "../assets/img/icons/menu.svg";
import menuCloser from "../assets/img/icons/window-close.svg";

const Menu = () => {
    const [top, setTop] = useState("-100%");

    const openMenu = () => setTop("0");
    const closeMenu = () => setTop("-100%");

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src={logo} />
                    </a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Groups
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Profile
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Signout
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div onClick={openMenu} className="hide-large">
                        <img src={menuOpener} className="img-fluid" />
                    </div>
                </div>
            </nav>

            <section id="mobileMenu" style={{ top }}>
                <div className="container mt-3">
                    <div className="row">
                        <div className="top-row d-flex justify-content-between align-items-center mb-5">
                            <img src={logo} className="img-fluid" />
                            <img src={menuCloser} className="img-fluid" width="32" id="mobileMenuCloser" onClick={closeMenu} />
                        </div>
                        <div className="mobile-menu__links d-flex flex-column text-center">
                            <a className="link mb-3" href="javascript:void(0)">
                                Home
                            </a>
                            <a className="link mb-3" href="javascript:void(0)">
                                Groups
                            </a>
                            <a className="link mb-3" href="javascript:void(0)">
                                Profile
                            </a>
                            <a className="link mb-3" href="javascript:void(0)">
                                Signout
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Menu;