import React from "react";
import "../index.css";
import { ReactComponent as IconMenu } from "../assets/evenWeek.svg";
import { ReactComponent as DotDivider } from "../assets/blackDot.svg";
import HeaderDay from "./DayHeader";

const Monday = () => {
  const dotStyle = {
    flexGrow: "1",
    height: "100%",
    paddingLeft: "15px",
    paddingRight: "15px",
  };
  const signStyle = {
    flexGrow: "1",
    paddingRight: "15px",
    width: "24px",
    height: "24px",
  };
  return (
    <div className="day-full">
      <HeaderDay name="Понедельник" classCount="4" />
      <section className="day-block-top">
        <div className="main-content">
          <div className="info-row">
            <div className="class-time">9:00 - 10:30</div>
            <DotDivider style={dotStyle} />
            <div className="class-type">Практика</div>
            <DotDivider style={dotStyle} />
            <IconMenu style={signStyle} />
          </div>
          <div className="info-row">
            <div className="class-name">
              Социальные взаимодействия и общественные отношения
            </div>
          </div>
          <div className="info-row">
            <div className="class-teacher">Кафедра физического воспитания</div>
          </div>
        </div>
        <aside className="location-info">
          <div className="location-type">Очно</div>
          <div className="irl-location">2-609</div>
        </aside>
      </section>
      <section className="day-block">
        <div className="main-content">
          <div className="info-row">
            <div className="class-time">10:45 - 12:20</div>
            <DotDivider style={dotStyle} />
            <div className="class-type">Практика</div>
            <DotDivider style={dotStyle} />
            <IconMenu style={signStyle} />
          </div>
          <div className="info-row">
            <div className="class-name">Системное программирование</div>
          </div>
          <div className="info-row">
            <div className="class-teacher">Калинин Д.А.</div>
          </div>
        </div>
        <aside className="location-info">
          <div className="location-type">Очно</div>
          <div className="irl-location">2-609</div>
        </aside>
      </section>
      <section className="day-block">
        <div className="main-content">
          <div className="info-row">
            <div className="class-time">12:30 - 14:05</div>
            <DotDivider style={dotStyle} />
            <div className="class-type">Лаб. работа</div>
            <DotDivider style={dotStyle} />
            <IconMenu style={signStyle} />
          </div>
          <div className="info-row">
            <div className="class-name">Операционные системы</div>
          </div>
          <div className="info-row">
            <div className="class-teacher">Колесников Е.В.</div>
          </div>
        </div>
        <aside className="location-info">
          <div className="location-type">Очно</div>
          <div className="irl-location">2-609</div>
        </aside>
      </section>
      <section className="day-block">
        <div className="main-content">
          <div className="info-row">
            <div className="class-time">15:00 - 16:35</div>
            <DotDivider style={dotStyle} />
            <div className="class-type">Лаб. работа</div>
            <DotDivider style={dotStyle} />
            <IconMenu style={signStyle} />
          </div>
          <div className="info-row">
            <div className="class-name">
            Операционные системы
            </div>
          </div>
          <div className="info-row">
            <div className="class-teacher">Колесников Е.В.</div>
          </div>
        </div>
        <aside className="location-info">
          <div className="location-type">Очно</div>
          <div className="irl-location">2-609</div>
        </aside>
      </section>
    </div>
  );
};

export default Monday;
