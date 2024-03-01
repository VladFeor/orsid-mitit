import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import MyModal from './modal';
import Confirmation from './modals/Confirmation';
import { useEffect } from 'react';
import deleteImage from '../img/bin.png'


const TeacherList = (props) => {
  const [openModal, setOpenModal] = useState();
  const [teacherOrcid, setTeacherOrcid] = useState();
  const [teacherList, setTeacherList] = useState()
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
  const deleteTeacher = async (orsidAPI) => {
    const instance = axios.create({
      baseURL: `https://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT_SERVER}`,
    });
    try {
      await instance.delete(`/users/${orsidAPI}`);
      props.updateTeacherList(props.teacherList[0].section)
      toast.success('Викладача видалено');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  const switchOpenModal = (isOpenModal) => {
    setOpenModal(isOpenModal)
  }
  const changeOrcidHandler = (event, orcidAPI) => {
    event.stopPropagation()
    setOpenModal(true)
    setTeacherOrcid(orcidAPI)
  }
  const confirmToDelete = (isReadyToDelete) => {
    setOpenModal(false)
    if (!isReadyToDelete) return
    deleteTeacher(teacherOrcid)
  };
  useEffect(() => {
    setTeacherList(props.teacherList)
  }, [props.teacherList]);
  return (
    <div className='teacher__list'>
      <div className='container'>
        {teacherList && <div className='header__teacher__list'>{checkedIsNumber(teacherList[0].section)}</div>}
        <div className='teacher__list__content'>
          {teacherList && sortByName(teacherList).map((item, index) => (
            <div
              className='teacher__item'
              onClick={() => props.getItemsForContent(item.orcid, teacherList)}
              index={index}
              key={index}
            >
              <div className='teacher__index'>{index + 1}.</div>
              <div className='teacher__details'>
                {/* <div className='teacher__position'>{item.position}</div> */}
                <div className='teacher__rank'>{item.rank ? item.rank : 'Працівник ЗСУ'}</div>
                <div className='teacher__name' style={{ minWidth: '200px' }}>{item.full_name}</div>
              </div>

              {props.accountUser.role === 'admin' && (
                <div className='delete__teacher'
                  onClick={(event) => changeOrcidHandler(event, item.orcid)}
                >
                  <img src={deleteImage} alt='error'/>
                </div>
              )}
            </div>
          ))}

          <MyModal
            key={'Confirm'}
            nameModal='Видалити'
            openModal={openModal}
            isNotVisible={true}
            onClick={() => setOpenModal(true)}
            switchOpenModal={switchOpenModal}
          >
            <Confirmation
              textConfirm="Ви впевнені, що хочете видалити елемент?"
              confirmExit={confirmToDelete}
            />
          </MyModal>
        </div>
      </div>
    </div>

  );
};

export default TeacherList;