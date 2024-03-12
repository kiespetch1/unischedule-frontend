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
                    <div className="footerText">UniSchedule - неофициальное расписание занятий</div>
                </div>
                <div className="footerTextContainer">
                    <a href="https://yoomoney.ru/to/410017122242919" target="_blank" rel="noreferrer" className="footerText">Поддержать проект</a>
                    <a href="https://t.me/kiespetchq" target="_blank" rel="noreferrer" className="footerText">Контакты</a>
                </div>
            </div>
        </div>
    )
};

export default Footer;