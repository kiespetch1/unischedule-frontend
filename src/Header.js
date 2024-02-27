import React from "react";
import "./index.css";
import OddWeekButton from "./OddWeekButton";
import EvenWeekButton from "./EvenWeekButton";
import FirstGroupButton from "./FirstSubgroupButton"
import SecondGroupButton from "./SecondSubgroupButton"
import LoginButton from "./LoginButton"

const Header = () => {
  return (
    <header className="headerFlex">
      <h1 className="logoText">Расписание группы</h1>
      <h1 className="groupText">ИВТ1-Б21</h1>
      <div className="divider1"></div>
      <div className="header-rect"></div>
      <h2 className="filterText">Фильтровать по:</h2>
      <OddWeekButton label="Четная неделя"/>
      <EvenWeekButton label="Нечетная неделя"/>
      <FirstGroupButton label="1 подгруппа"/>
      <SecondGroupButton label="2 подгруппа"/>
      <LoginButton label="Войти"/>
    </header>
  );
};

export default Header;
