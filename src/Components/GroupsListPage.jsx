import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import {ReactComponent as SearchIcon} from "../assets/search.svg";
import {ReactComponent as CrossIcon} from "../assets/cross.svg";
import GroupButton from "./GroupButton";


const GroupsListPage = () => {
    const [inputValue, setInputValue] = useState('');

    const iconStyle = {
        cursor: "pointer",
        animationName: "smooth-expanding-14px",
        animationDuration: "0.1s"
    }

    function clearInput() {
        setInputValue('');
    }

    return (
        <div>
            <Header/>
            <div className="groups-container">
                <div className="groups-choose-text">Группы</div>
                <div className="search-bar">
                    <SearchIcon style={{
                        height: "18px", width: "18px", margin: "0 16px 0 12px", transform: "scaleX(-1)"
                    }}/>
                    <input className="search-bar-input" type="search" placeholder="Введите название группы"
                           value={inputValue}
                           onChange={(e) => setInputValue(e.target.value)}
                           id="group-search"/>
                    {inputValue && inputValue.length > 0 ?
                        <CrossIcon style={iconStyle} onClick={clearInput}/> : null}
                </div>
                <div className="grade-container">
                    <div className="grade-text">1 курс</div>
                    <div className="grade-divider"></div>
                </div>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <GroupButton group="ИВТ1-Б21" link="/group=1"/>
                    <GroupButton group="ИВТ1-Б21" link="/group=1"/>
                    <GroupButton group="ИВТ1-Б21" link="/group=1"/>
                </div>

                <div className="grade-container">
                    <div className="grade-text">2 курс</div>
                    <div className="grade-divider"></div>
                </div>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <GroupButton group="ИВТ1-Б21" link="/group=1"/>
                    <GroupButton group="ИВТ1-Б21" link="/group=1"/>
                    <GroupButton group="ИВТ1-Б21" link="/group=1"/>
                </div>

                <div className="grade-container">
                    <div className="grade-text">3 курс</div>
                    <div className="grade-divider"></div>
                </div>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <GroupButton group="ИВТ1-Б21" link="/group=1"/>
                    <GroupButton group="ИВТ1-Б21" link="/group=1"/>
                    <GroupButton group="ИВТ1-Б21" link="/group=1"/>
                </div>

                <div className="grade-container">
                    <div className="grade-text">4 курс</div>
                    <div className="grade-divider"></div>
                </div>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <GroupButton group="ИВТ1-Б21" link="/group=1"/>
                    <GroupButton group="ИВТ1-Б21" link="/group=1"/>
                    <GroupButton group="ИВТ1-Б21" link="/group=1"/>
                </div>

                <div className="grade-container">
                    <div className="grade-text">5 курс</div>
                    <div className="grade-divider"></div>
                </div>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <GroupButton group="ИВТ1-Б21" link="/group=1"/>
                    <GroupButton group="ИВТ1-Б21" link="/group=1"/>
                    <GroupButton group="ИВТ1-Б21" link="/group=1"/>
                </div>

                <div className="grade-container">
                    <div className="grade-text">6 курс</div>
                    <div className="grade-divider"></div>
                </div>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <GroupButton group="ИВТ1-Б21" link="/group=1"/>
                    <GroupButton group="ИВТ1-Б21" link="/group=1"/>
                    <GroupButton group="ИВТ1-Б21" link="/group=1"/>
                </div>

                <div className="group-add-text">Вашей группы нет в списке? Напишите <a style={{ whiteSpace: 'nowrap' }} href="https://t.me/kiespetchq"> мне</a>.</div>
            </div>
            <Footer/>
        </div>)
}

export default GroupsListPage;
