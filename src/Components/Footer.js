import React from "react";
import "../index.css"
import {ReactComponent as DotDivider} from "../assets/grayDot.svg";

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-divider"></div>
            <div className="footer-texts-container">
                <div className="footer-text-container">
                    <div className="footer-text">2024</div>
                    <DotDivider/>
                    <div className="footer-text">UniSchedule - неофициальное расписание занятий</div>
                </div>
                <div className="footer-text-container">
                    <a href="https://yoomoney.ru/to/410017122242919" target="_blank" rel="noreferrer" className="footer-text">Поддержать проект</a>
                    <a href="https://t.me/kiespetchq" target="_blank" rel="noreferrer" className="footer-text">Контакты</a>
                </div>
            </div>
        </div>
    )
};

export default Footer;