import React from 'react';

const TeacherList = (props) => {
  const checkedIsNumber = (value) => {
    const parsedNumber = parseFloat(value);
    if (!isNaN(parsedNumber)) {
      return `Кафедра ${value}`
    }
    return value
  };
  const sortByName = (teacherList) => {
    return teacherList.slice().sort((a, b) => {
      return a.full_name.localeCompare(b.full_name);
    });
  };
  const deleteTeacher = () =>{
    
  }
  return (
    <div className='teacher__list'>
      <div className='container'>
        <div className='header__teacher__list'>{checkedIsNumber(props.teacherList[0].section)}</div>
        <div className='teacher__list__content'>
          {props.teacherList && sortByName(props.teacherList).map((item, index) => {
            return <div className='teacher__item'
              onClick={() => props.getItemsForContent(item.orcid, props.teacherList)}
              index={index}
              key={index}
            >
              <div className='teacher__index'>{index + 1}.</div>
              <div className='teacher__details'>
                {/* <div className='teacher__position'>{item.position}</div> */}
                <div className='teacher__rank'>{item.rank ? item.rank : 'Працівник ЗСУ'}</div>
                <div className='teacher__name' style={{ minWidth: '200px' }}>{item.full_name}</div>
              </div>

              {props.accountUser.role == 'admin'
                &&
                <button
                  className='delete__teacher'

                >
                  -
                </button>
              }
            </div>


          })}
        </div>
      </div>
    </div>

  );
};

export default TeacherList;