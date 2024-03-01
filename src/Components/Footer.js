import React from "react";
import "../index.css"
import {ReactComponent as DotDivider} from "../assets/grayDot.svg";

const Footer = () => {
    return (
        <div className="footerContainer">
            <div className="footerDivider"></div>
            <div className="footerTexts">
                <div className="footerTextContainer">
                    <div className="footerText">2024</div>
                    <DotDivider/>
                    <div className="footerText">UniSchedule</div>
                </div>
                <div className="footerTextContainer">
                    <div className="footerText">Поддержать проект</div>
                    <div className="footerText">Контакты</div>
                </div>
            </div>
        </div>
    )
};

export default Footer;