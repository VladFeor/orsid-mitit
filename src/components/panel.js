import { useEffect, useState } from 'react';
import axios from 'axios';
import MyModal from './modal';
import DepartmentItem from './departmentItem';
import imageBook from '../img/open-book.png'

function Panel(props) {
    const [listTeaches, setListTeachers] = useState(props.teacherList)

    const getTeacherHandler = (orcidAPI) => {
        props.getItemsForContent(orcidAPI, listTeaches)
    }
    
    return (
        <div>
            <div className="header">
                    <div className='open__list'>
                        <img src={imageBook}/>
                    </div>
                <div className="depart__content" style={{ height: props.accountUser.role === 'admin' ? '90%' : '100%' }}>
                    {props.departments.map((department, index) => {
                        return <DepartmentItem
                            searchDepartment={props.searchDepartment}
                            key={index}
                            department={department}
                            getTeacherHandler={getTeacherHandler}
                        />
                    })}
                </div>
                <div className='panel__control' style={{ display: props.accountUser.role === 'admin' ? 'block' : 'none' }}>
                    <div className="account__content">
                        <div className="account">
                            {/* <div className="account__photo"> */}
                            {/* <img src={logoDepartment} alt="" /> */}
                            {/* </div> */}
                            <MyModal
                                key={'addDepartment'}
                                addNewDepartment={props.addNewDepartment}
                                nameModal='Додати кафедру'
                                updateTeacherList={props.updateTeacherList}
                                departments={props.departments}
                            />
                        </div>
                    </div>
                    <div className="account__content">
                        <div className="account">
                            {/* <div className="account__photo">
                                <img src={logoDepartment} alt="" />
                            </div> */}
                            <MyModal
                                key={'addDepartment'}
                                nameModal='Додати викладача'
                                updateTeacherList={props.updateTeacherList}
                                departments={props.departments}
                            >
                            </MyModal>
                        </div>
                    </div>
                </div>


            </div>



        </div>
    );
}

export default Panel;
