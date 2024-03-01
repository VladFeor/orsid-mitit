import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';


Modal.setAppElement('#root');

function MyModal(props) {
    const [modalIsOpen, setModalIsOpen] = useState(props.openModal);
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
        if (props.switchOpenModal) {
            props.switchOpenModal(true)
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        if (props.switchOpenModal) {
            props.switchOpenModal(false)
        }
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
    const handleAddTeacher = async () => {
        const teacher = {
            full_name: nameTeacher,
            orcid: orcidTeacher,
            position: positionTeacher,
            section: section,
            rank: rankTeacher,
        };

        const instance = axios.create({
            baseURL: `https://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT_SERVER}`,
        });
        try {
            await instance.post('/users', teacher);
            toast.success('Додано нового викладача')
            props.updateTeacherList()
            closeModal()
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    useEffect(() => {
        setModalIsOpen(props.openModal)
    }, [props.openModal]);
    return (
        <div className='submit-button-modal'>
            <button
                className='submit-button'
                onClick={openModal}
                style={props.isNotVisible && { display: 'none' }}
            >
                {props.nameModal}
            </button>

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
                        <button type="submit" className="submit-button" onClick={handleAddTeacher}>
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
            {props.nameModal !== 'Додати викладача' && props.nameModal !== 'Додати кафедру'
                &&
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className="custom-modal-content"
                    overlayClassName="custom-modal-overlay"
                >
                    <div className="modal-header">
                        <h1 className='main__title__modal'>{props.mainTitle}</h1>
                        <button className="close-button" onClick={closeModal}>
                            &#10006;
                        </button>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>

                </Modal>
            }

        </div>
    );
}

export default MyModal;
