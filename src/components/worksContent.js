import { useEffect, useState } from "react";
import ItemWork from "./itemWork";
import Loading from "./loading";


function WorkContent(props) {
  return (
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
          <Loading/>
        ) : (
          <div>
            {props.listWorks && props.listWorks.map(item => {
              return <ItemWork key={item.title} item={item} />
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkContent;
