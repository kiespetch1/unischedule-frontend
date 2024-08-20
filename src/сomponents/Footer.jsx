import React, {useEffect, useState} from "react";
import "../index.css"
import {ReactComponent as DotDivider} from "../assets/grayDot.svg";
import {useWindowWidth} from "../common";

const Footer = () => {
    const dotSmallStyle = {
        height: "2.5px",
        width: "2.5px",
    };

    const windowWidth = useWindowWidth();

    return (
        <div className="footer-container" id="footer">
            <div className="footer-divider"></div>
            <div className="footer-texts-container">
                <div className="footer-text-container">
                    <div className="footer-text">2024</div>
                    <DotDivider style={windowWidth <= 1200 ? dotSmallStyle : null}/>
                    <div className="footer-text">UniSchedule {windowWidth <= 1200 ? null : "- неофициальное расписание занятий" } </div>
                </div>
                <div className="footer-text-container">
                    <a href="https://yoomoney.ru/to/410017122242919" target="_blank" rel="noreferrer" className="footer-clickable-text">Поддержать проект</a>
                    <a href="https://t.me/kiespetchq" target="_blank" rel="noreferrer" className="footer-clickable-text">Контакты</a>
                </div>
            </div>
        </div>
    )
};

export default Footer;