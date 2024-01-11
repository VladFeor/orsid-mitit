import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Loading from './loading';


Modal.setAppElement('#root');

function MyModal(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [nameTeacher, setNameTeacher] = useState('');
    const [orcidTeacher, setOrcidTeacher] = useState('');
    const [rankTeacher, setRankTeacher] = useState('Працівник ЗСУ');
    const [positionTeacher, setPositionTeacher] = useState('');
    const [typeSection, setTypeSection] = useState('Кафедра');


    const [departmentTeacher, setDepartmentTeacher] = useState();
    const [section, setSection] = useState('');
    const ranks = [
        "Працівник ЗСУ",
        "Лейтенант",
        "Старший лейтенант",
        "Капітан",
        "Майор",
        "Підполковник",
        "Полковник",
        "Генерал-майор",
        "Генерал-лейтенант",
    ]

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleTeacherNameChange = (event) => {
        setNameTeacher(event.target.value);
    };
    const handleSectionChange = (event) => {
        const parsedNumber = parseFloat(event.target.value);
        if (!isNaN(parsedNumber)) {
            setSection(parsedNumber)
        } else {
            setSection(event.target.value)
        }
    };
    const handleTypeSectionChange = (event) => {
        setTypeSection(event.target.value);
    };
    const handleRankTeacherChange = (event) => {
        setRankTeacher(event.target.value);
    };
    const handlePositionTeacherChange = (event) => {
        setPositionTeacher(event.target.value);
    };
    const handleTeacherOrcidChange = (event) => {
        setOrcidTeacher(event.target.value);
    };
    const handleTeacherDepartmentChange = (event) => {
        const parsedNumber = parseFloat(event.target.value);
        if (!isNaN(parsedNumber)) {
            setDepartmentTeacher(parsedNumber)
        } else {
            setDepartmentTeacher(event.target.value)
        }
    };
    const addNewDepartmentHandler = () => {
        if (departmentTeacher) {
            props.addNewDepartment(departmentTeacher)
        }
    }
    const handleTestAddQuery = () => {
        const teacher = {
            full_name: nameTeacher,
            orcid: orcidTeacher,
            position: positionTeacher,
            section: section,
            rank: rankTeacher,
        }
        const arrTeacher = [
            {
                full_name: "Храбан Т.Є.",
                orcid: "0000-0001-5169-5170",
                position: "Завідуюча кафедри",
                rank: "",
                section: "5"
            },
            {
                full_name: "Довганець В.І.",
                orcid: "0000-0002-8340-9789",
                position: "Заступник зав. каф.",
                rank: "",
                section: "5"
            },
            {
                full_name: "Юхименко В.О.",
                orcid: "0000-0002-7039-4741",
                position: "Доцент",
                rank: "",
                section: "5"
            },
            {
                full_name: "Жукович І.І.",
                orcid: "0000-0002-5026-259X",
                position: "Доцент",
                rank: "",
                section: "5"
            },
            {
                full_name: "Коваленко О.М.",
                orcid: "0000-0001-8174-1780",
                position: "Доцент",
                rank: "",
                section: "5"
            },
            {
                full_name: "Кодола Р.М.",
                orcid: "0000-0002-5647-784X",
                position: "Доцент",
                rank: "",
                section: "5"
            },
            {
                full_name: "Гордієнко О.С.",
                orcid: "0009-0004-6229-5374",
                position: "Старший викладач",
                rank: "",
                section: "5"
            },
            {
                full_name: "Задорожна О.В.",
                orcid: "0009-0007-0127-2250",
                position: "Старший викладач",
                rank: "",
                section: "5"
            },
            {
                full_name: "Дідурик А.І.",
                orcid: "0009-0002-8227-4488",
                position: "Старший викладач",
                rank: "",
                section: "5"
            },
            {
                full_name: "Бужикова Т.О.",
                orcid: "0000-0002-8117-965X",
                position: "Викладач",
                rank: "",
                section: "5"
            },
            {
                full_name: "Галка Ю.М.",
                orcid: "0000-0002-3329-8638",
                position: "Викладач",
                rank: "",
                section: "5"
            },
            {
                full_name: "Кочупалова Т.В.",
                orcid: "0009-0003-6954-0523",
                position: "Викладач",
                rank: "",
                section: "5"
            },
            {
                full_name: "Смирнова О.І.",
                orcid: "0000-0003-2560-0726",
                position: "Викладач",
                rank: "",
                section: "5"
            },
            {
                full_name: "Кравченко О.Г.",
                orcid: "0009-0009-7635-655X",
                position: "Викладач",
                rank: "",
                section: "5"
            },
            {
                full_name: "Гусаренко В.А.",
                orcid: "0009-0001-9602-6103",
                position: "Викладач",
                rank: "",
                section: "5"
            }

        ]
        const instance = axios.create({
            baseURL: 'https://localhost:3300',
        });
        try {
            instance.post('/users', teacher);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            throw error;
        }
    }
    return (
        <div>
            <button className='submit-button' onClick={openModal}>{props.nameModal}</button>
            {props.nameModal === 'Додати викладача'
                &&
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className="custom-modal-content"
                    overlayClassName="custom-modal-overlay"
                >
                    <div className="modal-header">
                        <h1>Введіть дані</h1>
                        <button className="close-button" onClick={closeModal}>
                            &#10006;
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="input-container">
                            <label htmlFor="input1" id='rank' className="input-label">
                                Звання:
                            </label>
                            <select className="custom-input"
                                onChange={handleRankTeacherChange}
                            >
                                {ranks.map(item => {
                                    return <option
                                        key={item}
                                    >{item}</option>
                                })}
                            </select>
                        </div>
                        <div className="input-container">
                            <label htmlFor="input1" className="input-label">
                                Прізвище Імя:
                            </label>
                            <input
                                type="text"
                                id="input1"
                                value={nameTeacher}
                                onChange={handleTeacherNameChange}
                                className="custom-input"
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="input1" className="input-label">
                                Посада:
                            </label>
                            <input
                                type="text"
                                id="input1"
                                value={positionTeacher}
                                onChange={handlePositionTeacherChange}
                                className="custom-input"
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="input2" className="input-label">
                                Orcid link:
                            </label>
                            <input
                                type="text"
                                id="input2"
                                value={orcidTeacher}
                                onChange={handleTeacherOrcidChange}
                                className="custom-input"
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="input2" className="input-label">
                                Оберіть секцію:
                            </label>
                            <select className="custom-input"
                                onChange={handleSectionChange}
                            >
                                {props.departments.map(item => {
                                    return <option
                                        key={item.sectionDepartment}
                                    >{item.sectionDepartment}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="submit-button" onClick={handleTestAddQuery}>
                            Додати викладача
                        </button>
                    </div>
                </Modal>
            }
            {props.nameModal === 'Додати кафедру'
                &&
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className="custom-modal-content"
                    overlayClassName="custom-modal-overlay"
                >
                    <div className="modal-header">
                        <h1>Введіть дані</h1>
                        <button className="close-button" onClick={closeModal}>
                            &#10006;
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="input-container">
                            <label htmlFor="input1" className="input-label">
                                Оберіть вид секції:
                            </label>
                            <select className="custom-input"
                                onChange={handleTypeSectionChange}
                            >
                                <option>Кафедра</option>
                                <option>Інше</option>
                            </select>
                        </div>

                        {typeSection === 'Кафедра'
                            ?
                            <div className="input-container">
                                <label htmlFor="input1" className="input-label">
                                    Номер кафедри:
                                </label>
                                <input
                                    type="number"
                                    id="input1"
                                    onChange={handleTeacherDepartmentChange}
                                    className="custom-input"
                                />
                            </div>
                            :
                            <div className="input-container">
                                <label htmlFor="input1" className="input-label">
                                    Назва секції:
                                </label>
                                <input
                                    type="text"
                                    id="input1"
                                    onChange={handleTeacherDepartmentChange}
                                    className="custom-input"
                                />
                            </div>
                        }

                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="submit-button" onClick={addNewDepartmentHandler}>
                            Додати кафедру
                        </button>
                    </div>
                </Modal>
            }
            {/* {props.nameModal === 'Підгрузити дані'
                &&
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className="custom-modal-content"
                    overlayClassName="custom-modal-overlay"
                >
                    <button className="close-button" onClick={closeModal}>
                        &#10006;
                    </button>
                    <div className="modal-header">

                        <h1>{props.statusLoading}</h1>

                    </div>
                    <div className="modal-header">
                        <Loading />
                    </div>
                </Modal>
            } */}

        </div>
    );
}

export default MyModal;
