import { useEffect, useState } from 'react';
import axios from 'axios';
import accountImage from '../../img/user.png'
import MyModal from '../modal';
import LoginModal from '../modals/Login';
import RegistrationModal from '../modals/Registration';
import Confirmation from '../modals/Confirmation';

const Header = (props) => {
    const [listTeaches, setListTeachers] = useState([])
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
    const handlerChangeAccountUser = (orcidAPI, role) => {
        setOpenModal(false)
        props.changeAccountUser(orcidAPI, role)
    }
    const updateTeacherList = async () => {
        const instance = axios.create({
            baseURL: `https://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT_SERVER}`,
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
        <div className='header__panel'>
            <div className='account' >
                <div className='element__account' onClick={() => setIsOpenMenuAccount(!isOpenMenuAccount)}>
                    <img className='image__photo' src={accountImage} alt='' />
                    <div className='account__name'>{props.accountUser.name === '' ? 'Account' : props.accountUser.name}</div>
                    <div className='account__name fz14'>{props.accountUser.name != '' && `OrcidID: ${props.accountUser.orcid}`}</div>
                </div>
                <div className={'account__menu'}>
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
                            <MyModal
                                key={'Condirm'}
                                nameModal='Вийти'
                                openModal={openModal}
                                switchOpenModal={switchOpenModal}
                            >
                                <Confirmation
                                    textConfirm="Ви впевнені що хочете вийти з акаунту?"
                                    confirmExit={confirmExit}
                                />
                            </MyModal>
                        </>

                    }

                </div>
            </div>
        </div>

    );
};

export default Header;