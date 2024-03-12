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
    <div className="dayFull">
      <HeaderDay name="Понедельник" classCount="4" />
      <section className="class1">
        <div className="mainContent">
          <div className="infoRow">
            <div className="classTime">9:00 - 10:30</div>
            <DotDivider style={dotStyle} />
            <div className="classType">Практика</div>
            <DotDivider style={dotStyle} />
            <IconMenu style={signStyle} />
          </div>
          <div className="infoRow">
            <div className="className">
              Социальные взаимодействия и общественные отношения
            </div>
          </div>
          <div className="infoRow">
            <div className="classTeacher">Кафедра физического воспитания</div>
          </div>
        </div>
        <aside className="locationInfo">
          <div className="locationType">Очно</div>
          <div className="irlLocation">2-609</div>
        </aside>
      </section>
      <section className="class2">
        <div className="mainContent">
          <div className="infoRow">
            <div className="classTime">10:45 - 12:20</div>
            <DotDivider style={dotStyle} />
            <div className="classType">Практика</div>
            <DotDivider style={dotStyle} />
            <IconMenu style={signStyle} />
          </div>
          <div className="infoRow">
            <div className="className">Системное программирование</div>
          </div>
          <div className="infoRow">
            <div className="classTeacher">Калинин Д.А.</div>
          </div>
        </div>
        <aside className="locationInfo">
          <div className="locationType">Очно</div>
          <div className="irlLocation">2-609</div>
        </aside>
      </section>
      <section className="class2">
        <div className="mainContent">
          <div className="infoRow">
            <div className="classTime">12:30 - 14:05</div>
            <DotDivider style={dotStyle} />
            <div className="classType">Лаб. работа</div>
            <DotDivider style={dotStyle} />
            <IconMenu style={signStyle} />
          </div>
          <div className="infoRow">
            <div className="className">Операционные системы</div>
          </div>
          <div className="infoRow">
            <div className="classTeacher">Колесников Е.В.</div>
          </div>
        </div>
        <aside className="locationInfo">
          <div className="locationType">Очно</div>
          <div className="irlLocation">2-609</div>
        </aside>
      </section>
      <section className="class2">
        <div className="mainContent">
          <div className="infoRow">
            <div className="classTime">15:00 - 16:35</div>
            <DotDivider style={dotStyle} />
            <div className="classType">Лаб. работа</div>
            <DotDivider style={dotStyle} />
            <IconMenu style={signStyle} />
          </div>
          <div className="infoRow">
            <div className="className">
            Операционные системы
            </div>
          </div>
          <div className="infoRow">
            <div className="classTeacher">Колесников Е.В.</div>
          </div>
        </div>
        <aside className="locationInfo">
          <div className="locationType">Очно</div>
          <div className="irlLocation">2-609</div>
        </aside>
      </section>
    </div>
  );
};

export default Monday;
