import React from "react";
import HighlightButton from "../HighlightButton/HighlightButton";
import Spinner from "../Spinner/Spinner";


const startSessionModal = (props) => {

    let modal = null;
    if (!props.loading) {
        modal =
            <div className="StartSessionModal__text">
                <span className="StartSessionModal__exit" onClick={props.onExit}> X </span>
                <div className="StartSessionModal__heading">
                    Your current session began on
                </div>

                <div className="StartSessionModal__heading">
                    {props.time}
                </div>
                <HighlightButton style={{
                    gridColumn: "2/3",
                    marginTop: "2rem",

                }} clicked={props.noUpdate} enabled={true}> Keep start time </HighlightButton>
                <HighlightButton style={{
                    gridColumn: "3/-1",
                    marginTop: "2rem",
                    marginRight: ".5rem"
                }} clicked={props.withUpdate} enabled={true}> Refresh start time </HighlightButton>
            </div>
    } else {
        modal = <div className="StartSessionModal__text">
                    <div className ="StartSessionModal__loading"> 
                        Generating Tasks...
                        <Spinner style ={{  marginTop: "4rem",
                                            width: "8rem",
                                            height: "8rem"
                                            }}/> 
                    </div> 
                </div>
    }

    return (
        <div className="StartSessionModal">
            <div className="StartSessionModal__content">
                <div className="StartSessionModal__lines">
                    {modal}
                </div>
            </div>
        </div>
    )
}

export default startSessionModal;