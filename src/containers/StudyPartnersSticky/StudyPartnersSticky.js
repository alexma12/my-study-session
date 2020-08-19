import React from "react";

import { ReactComponent as UserIcon } from "../../imgs/svg/avatar.svg";
import { ReactComponent as PlusIcon } from "../../imgs/svg/cross.svg"

const StudyPartnerSticky = (props) => {
    return (
        <div className="StudyPartnersSticky">
            <UserIcon className="StudyPartnersSticky__icon" />
            Study Partners:
            <input type="text" className="StudyPartnersSticky__input" placeholder="Add Partners" />
            <button className="StudyPartnersSticky__icon--button">
                <PlusIcon className="StudyPartnersSticky__icon--plus" />
            </button>
        </div>
    )
}

export default StudyPartnerSticky