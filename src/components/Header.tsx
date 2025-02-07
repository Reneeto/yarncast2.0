import React from "react";
import logo from "../../assets/yarncast-logo.png";

export default function Header() {
  return (
    <div className="header" id="header">
      <img src={logo} alt="yarncast-logo" className="image-fade-in" />
      <p>
        A website that helps crafters visualize their temperature blanket
        projects
        <br /> and make it easy to get the data they need to get crafting.
      </p>
    </div>
  );
}
