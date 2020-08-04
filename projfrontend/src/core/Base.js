import React from "react";
import Menu from "./Menu";

const Base = ({
    title ="My Title",
    description= "My Description",
    className = "bg-white text-dark p-4",
    children

}) => {
  return (
    <div>
      <Menu/>
      <div className="container-fluid">
        <div className="jumbotron bg-white text-dark text-center">
            <h2 className="display-4">{title}</h2>
            <p className="lead">{description}</p>
        </div>
        <div className={className}>
            {children}
        </div>
      </div>
    </div>
  );
};

export default Base;
