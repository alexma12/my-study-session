import React from "react";
import {ReactComponents as LocationIcon} from "../../imgs/svg/location.svg"

const LocationSticky = (props) => {

    return(
    <div className = "LocationSticky">
        <div>
        Location:
        <input type = "text" className = "LocationSticky__input"  placeholder = "Enter Study Location"/>
        </div>
    </div>);
}

export default LocationSticky