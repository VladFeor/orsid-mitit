import logoDepartment from '../img/Department of _COMPUTER INFORMATION TECHNOLOGIES.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import MyModal from './modal';
import DepartmentItem from './departmentItem';

function Panel(props) {
    const [listTeaches, setListTeachers] = useState([])
    const [loadingData, setLoadingData] = useState('Триває загрузка')
    const getTeacherHandler = (orcidAPI) => {
        props.getItemsForContent(orcidAPI, listTeaches)
    }

    const updateTeacherList = async (sectionDepartment) => {
        const instance = axios.create({
            baseURL: 'https://localhost:3300',
        });
        try {
            const response = await instance.get('/users');
            const listTeachesCorrect = response.data.filter(teach => {
                return (
                    teach.createdAt !== null &&
                    teach.full_name !== null &&
                    teach.id !== null &&
                    teach.orcid !== null &&
                    teach.position !== null &&
                    teach.rank !== null &&
                    teach.section !== null &&
                    teach.updatedAt !== null
                );
            })
            props.setDataDepartments(listTeachesCorrect)
            setListTeachers(listTeachesCorrect)
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            // throw error;
        }
    }
    // const getAllInfoTeachers = () =>{
    //     listTeaches.forEach(item =>{
    //         props.getItemsForContent(item.orcid,listTeaches,false)
    //     })
    //     setLoadingData('Всі дані оновлено')
    // }
    useEffect(() => {
        updateTeacherList()
    }, []);
    return (
        <div>
            <div className="header">
                <div className="depart__content">
                    {props.departments.map((department, index) => {
                        return <DepartmentItem
                            searchDepartment={props.searchDepartment}
                            key={index}
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
                    {/* <div className="account__content">
                        <div className="account">
                            <div className="account__photo">
                                <img src={logoDepartment} alt="" />
                            </div>
                            <MyModal
                                key={'addDepartment'}
                                nameModal='Підгрузити дані'
                                statusLoading={loadingData}
                                updateTeacherList={getAllInfoTeachers}
                            />
                        </div>
                    </div> */}
                </div>


            </div>



        </div>
    );
}

export default Panel;
