import React from "react";
import "./sidebar.css";
export default function SideBar() {
  return (
    <div>
      <div class="navbar">
        <a href="#home">Home</a>
        <div class="subnav">
          <button class="subnavbtn">
            About <i class="fa fa-caret-down"></i>
          </button>
          <div class="subnav-content">
            <a href="#company">Company</a>
            <a href="#team">Team</a>
            <a href="#careers">Careers</a>
          </div>
        </div>
        <div class="subnav">
          <button class="subnavbtn">
            Services <i class="fa fa-caret-down"></i>
          </button>
          <div class="subnav-content">
            <a href="#bring">Bring</a>
            <a href="#deliver">Deliver</a>
            <a href="#package">Package</a>
            <a href="#express">Express</a>
          </div>
        </div>
        <div class="subnav">
          <button class="subnavbtn">
            Partners <i class="fa fa-caret-down"></i>
          </button>
          <div class="subnav-content">
            <a href="#link1">Link 1</a>
            <a href="#link2">Link 2</a>
            <a href="#link3">Link 3</a>
            <a href="#link4">Link 4</a>
          </div>
        </div>
        <a href="#contact">Contact</a>
      </div>

      <div style="padding:0 16px">
        <h3>Subnav/dropdown menu inside a Navigation Bar</h3>
        <p>
          Hover over the "about", "services" or "partners" link to see the sub
          navigation menu.
        </p>
      </div>
    </div>
  );
}
