import React from "react";
import { ReactComponent as LocationIcon } from "../../imgs/svg/location.svg";
import { connect } from "react-redux";
import * as actions from "../../store/actions"


const LocationSticky = (props) => {

    return (
        <div className="LocationSticky">
            <div>
                <LocationIcon className="LocationSticky__icon" />
        Location:
        <textarea
                    onChange={(event) => props.onInputChanged(event.target.value)}
                    value={props.inputValue}
                    className="LocationSticky__input"
                    placeholder="Enter Study Location"
                    rows = "2"
                />
            </div>
        </div>);
}
const mapStateToProps = state => {
    return ({
        inputValue: state.ui.locationValue
    });
}

const mapDispatchToProps = dispatch => {
    return ({
        onInputChanged: (value) => dispatch(actions.locationInputChanged(value))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationSticky)