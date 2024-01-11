import { useEffect, useState } from "react";
import ItemWork from "./itemWork";
import Loading from "./loading";
import logoDepartment from '../img/Department of _COMPUTER INFORMATION TECHNOLOGIES.png';


function WorkContent(props) {
  return (
    <>
      <div className='avatar'>
        <div className='container'>
          <div className="person">
            <div className="person__photo"><img src={logoDepartment} alt="" />
            </div>
            {props.teacher
              ?
              <div>
                <div className="person__name">{props.teacher.position}</div>
                <div className="person__name">{props.teacher.rank} {props.teacher.full_name}</div>
              </div>
              :
              <div className="person__name">Оберить викладача</div>
            }
          </div>
        </div>
      </div>
      <div className="group">
        <div className="group__element">
          {
            (props.listWorks && props.listWorks.length != 0)
              ?
              <div className="group__element__name">Роботи</div>
              :
              <div className="group__element__name">Робіт поки немає</div>
          }
        </div>
        <div className="container">
          {props.isLoading ? (
            <Loading />
          ) : (
            <div>
              {(props.listWorks && Array.isArray(props.listWorks)) && props.listWorks.map((item, index) => {
                return <ItemWork key={index} item={JSON.parse(item)} />
              })}
            </div>
          )}
        </div>
      </div>
    </>

  );
}

export default WorkContent;
