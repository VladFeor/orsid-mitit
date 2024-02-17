import { useEffect, useState } from 'react';
import axios from 'axios';
import accountImage from '../img/user.png'
import MyModal from './modal';
import DepartmentItem from './departmentItem';
import LoginModal from './modals/Login';
import RegistrationModal from './modals/Registration';
import Confirmation from './modals/Confirmation';

function Panel(props) {
    const [listTeaches, setListTeachers] = useState([])
    const [loadingData, setLoadingData] = useState('Триває загрузка')
    const [isOpenMenuAccount, setIsOpenMenuAccount] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const getTeacherHandler = (orcidAPI) => {
        props.getItemsForContent(orcidAPI, listTeaches)
    }
    const switchOpenModal = (isOpenModal) => {
        setOpenModal(isOpenModal)
    }
    const confirmExit = (isReadytoExit) => {
        if (isReadytoExit) {
            props.changeAccountUser(null)
        }
        setOpenModal(false)
    }
    const handlerChangeAccountUser = (orcidAPI,role) => {
        props.changeAccountUser(orcidAPI,role)
        setOpenModal(false)
    }
    const updateTeacherList = async (sectionDepartment) => {
        const instance = axios.create({
            baseURL: `https://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT_SERVER}`,
            // baseURL: `https://localhost:3300`,

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
        }
    }
    useEffect(() => {
        updateTeacherList()
    }, []);
    return (
        <div>
            <div className="header">
                <div className='account' >
                    <div className='element__account' onClick={() => setIsOpenMenuAccount(!isOpenMenuAccount)}>
                        <img src={accountImage} />
                        <div className='account__name'>{props.accountUser.name === '' ? 'Account' : props.accountUser.name}</div>
                        <div className='account__name fz14'>{props.accountUser.name != '' && `OrcidID: ${props.accountUser.orcid}`}</div>
                        <div className='account__name fz14'>{props.accountUser.name != '' && `Role: ${props.accountUser.role}`}</div>
                    </div>
                    <div className={isOpenMenuAccount ? 'account__menu open' : 'account__menu'}>
                        {props.accountUser.name === '' ?
                            <>
                                <MyModal
                                    key={'Login'}
                                    nameModal='Увійти'
                                    updateTeacherList={updateTeacherList}
                                    mainTitle='Увійти в обліковий запис'
                                    openModal={openModal}
                                    onClick={() => setOpenModal(true)}
                                >
                                    <LoginModal handlerChangeAccountUser={handlerChangeAccountUser} />
                                </MyModal>
                                <MyModal
                                    key={'SingIn'}
                                    nameModal='Зареєструватись'
                                    updateTeacherList={updateTeacherList}
                                    mainTitle='Реєстрація'
                                    openModal={openModal}
                                    onClick={() => setOpenModal(true)}
                                >
                                    <RegistrationModal
                                        handlerChangeAccountUser={handlerChangeAccountUser}
                                    />
                                </MyModal>
                            </>

                            :
                            <>
                                <button
                                    className='submit-button'
                                    onClick={() => getTeacherHandler(props.accountUser.orcid)}
                                >
                                    Профіль
                                </button>
                                {/* <button
                                    className='submit-button'
                                    onClick={() => handlerChangeAccountUser(null)}
                                >
                                    Exit
                                </button> */}
                                <MyModal
                                    key={'addDepartment'}
                                    addNewDepartment={props.addNewDepartment}
                                    nameModal='Вийти'
                                    updateTeacherList={updateTeacherList}
                                    departments={props.departments}
                                    openModal={openModal}
                                    switchOpenModal={switchOpenModal}
                                >
                                    <Confirmation
                                        confirmExit={confirmExit}
                                    />
                                </MyModal>
                            </>

                        }

                    </div>
                </div>
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
                <div className='panel__control' style={ { display: props.accountUser.role == 'admin' ? 'block'  : 'none'}}>
                    <div className="account__content">
                        <div className="account">
                            {/* <div className="account__photo"> */}
                            {/* <img src={logoDepartment} alt="" /> */}
                            {/* </div> */}
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
                            {/* <div className="account__photo">
                                <img src={logoDepartment} alt="" />
                            </div> */}
                            <MyModal
                                key={'addDepartment'}
                                nameModal='Додати викладача'
                                updateTeacherList={updateTeacherList}
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
