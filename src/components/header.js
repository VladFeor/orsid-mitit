import logoDepartment from '../img/Department of _COMPUTER INFORMATION TECHNOLOGIES.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import MyModal from './modal';
import DepartmentItem from './departmentItem';

function Panel(props) {
    const [listTeaches, setListTeachers] = useState([])

    const getTeacherHandler = (orcidAPI) => {
        props.getItemsForContent(orcidAPI, listTeaches)
    }

    const updateTeacherList = (sectionDepartment) => {
        const apiUrl = 'https://us-central1-orcid-194b3.cloudfunctions.net/api/getAllTeachers';
        axios.get(apiUrl)
            .then(response => {
                const jsonString = JSON.stringify(response.data);
                localStorage.setItem("teachers", jsonString);


                props.setDataDepartments(response.data)
                setListTeachers(...listTeaches, response.data)
                response.data.forEach(item => { props.getAllParamsTeacher(item.orcid) })
                // props.changeDepartmentData(response.data, sectionDepartment)
            })
            .catch(error => {
                const teachers = localStorage.getItem("teachers");
                const retrievedTeachers = JSON.parse(`${teachers}`);
                if (Array.isArray(listTeaches)) {
                    setListTeachers(...listTeaches, retrievedTeachers)
                }
                props.setDataDepartments(retrievedTeachers)
                // props.changeDepartmentData(retrievedTeachers, sectionDepartment)
                console.error('Произошла ошибка при запросе к API: Дані не оновлено ' + error);
            });
    }
    useEffect(() => {
        updateTeacherList()
    }, []);
    return (
        <div>
            <div className="header">
                <div className="depart__content">
                    {props.departments.map(department => {
                        return <DepartmentItem
                            department={department}
                            getTeacherHandler={getTeacherHandler}
                        />
                    })}
                </div>
                <div className='panel__control'>
                    <div className="account__content">
                        <div className="account">
                            <div className="account__photo">
                                <img src={logoDepartment} alt="" />
                            </div>
                            <MyModal
                                key={'addDepartment'}
                                addNewDepartment={props.addNewDepartment}
                                nameModal='Додати кафедру'
                                updateTeacherList={updateTeacherList}
                                departments={props.departments}
                            />
                        </div>
                    </div>
                    <div className="account__content">
                        <div className="account">
                            <div className="account__photo">
                                <img src={logoDepartment} alt="" />
                            </div>
                            <MyModal
                                key={'addDepartment'}
                                nameModal='Додати викладача'
                                updateTeacherList={updateTeacherList}
                                departments={props.departments}
                            />
                        </div>
                    </div>
                </div>


            </div>
            <div className='avatar'>
                <div className='container'>
                    <div className="person">

                        <div className="person__photo"><img src={logoDepartment} alt="" />
                        </div>
                        {props.teacher
                            ?
                            <div>
                                <div className="person__name">{props.teacher.position}</div>
                                <div className="person__name">{props.teacher.rank} {props.teacher.fullName}</div>
                            </div>
                            :
                            <div className="person__name">Оберить викладача</div>
                        }
                    </div>
                </div>
            </div>


        </div>
    );
}

export default Panel;
