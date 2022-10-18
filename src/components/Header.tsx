import React from "react";
import { Logo } from "../assets/logo";
import LoginPopover from "./login/loginPopover";

const Header = () => {
  return (
    <header className="header">
      <section className="header__logo">
        <Logo />
      </section>
      <LoginPopover />
    </header>
  );
};

export default Header;
