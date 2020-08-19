import React from "react";
import {ReactComponent as LocationIcon} from "../../imgs/svg/location.svg"

const LocationSticky = (props) => {

    return(
    <div className = "LocationSticky">
        <div>
        <LocationIcon className = "LocationSticky__icon" />
        Location:
        <input type = "text" className = "LocationSticky__input"  placeholder = "Enter Study Location"/>
    
        </div>
    </div>);
}

export default LocationSticky