import React from "react";
import { connect } from "react-redux";

import StudyPartnerName from "./StudyPartnerName";
import { ReactComponent as UserIcon } from "../../../imgs/svg/avatar.svg";
import { ReactComponent as PlusIcon } from "../../../imgs/svg/cross.svg"

import * as actions from "../../../store/actions";


const StudyPartnerSticky = (props) => {

    const addStudyPartnerHandler = (event = null) => {
        if(event !== null){
            event.preventDefault()
        }
        const inputName = props.inputValue.trim();
        if(inputName !== ""){
            const id = `${inputName}_${new Date().getTime()}`
            props.onAddStudyPartner(inputName, id);
            props.onInputChanged("");
        }
    }

    let studypartners = <div className = "StudyPartnersSticky__none"> none </div> 

    if(props.studyPartners && props.studyPartners.length > 0){
        studypartners = props.studyPartners.map((studyPartner => {
            return (
                <StudyPartnerName key = {studyPartner.id} name = {studyPartner.name} clicked = {() => props.onRemoveStudyPartner(studyPartner.id)} />
            )
        }))
    }

    return (
        <div className="StudyPartnersSticky">
            <UserIcon className="StudyPartnersSticky__icon" />
            Study Partners:
            <form onSubmit = {addStudyPartnerHandler} className = "StudyPartnersSticky__form">
            <input  type="text" 
                    value = {props.inputValue}  
                    onChange = {(event) => props.onInputChanged(event.target.value)} 
                    className="StudyPartnersSticky__input" 
                    placeholder="Add Partners"
                   />

            </form>
            <button onClick = {addStudyPartnerHandler} className="StudyPartnersSticky__icon--button">
                <PlusIcon className="StudyPartnersSticky__icon--plus" />
            </button>

            <div className = "StudyPartnerName--box">
                {studypartners}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return ({
        inputValue: state.ui.studyPartnersValue,
        studyPartners: state.studyPartners.studyPartners
    });
}

const mapDispatchToProps = dispatch => {
    return ({
        onInputChanged: (value) => dispatch(actions.studyPartnersInputChanged(value)),
        onAddStudyPartner: (name, id) => dispatch(actions.addStudyPartner(name, id)),
        onRemoveStudyPartner: (id) => dispatch(actions.removeStudyPartner(id))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyPartnerSticky);