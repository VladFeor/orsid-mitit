import './App.css';
import Header from './components/panel';
import WorkContent from './components/worksContent';
import { useState } from 'react';
import axios from 'axios';
import logo from './img/Department of _COMPUTER INFORMATION TECHNOLOGIES.png';
import { setDataDepartmentsController } from './controller/appController';
import TeacherList from './components/teacherList';


function App() {
  const [listWorks, setListWorks] = useState([])
  const [teacher, setTeacher] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState([])
  const [teacherList, setTeacherList] = useState()
  const [isTeacherList, setIsTeacherList] = useState(false)


  const addNewDepartment = (sectionDepartment) => {
    const updatedDepartments = [...departments, {
      sectionDepartment: sectionDepartment,
      teacherList: [],
    }]
    updatedDepartments.sort((a, b) => a.sectionDepartment - b.sectionDepartment);
    setDepartments(updatedDepartments)
  }
  const toggleIsOpenTeacherList = () => {
    setIsTeacherList(true)
  }
  const setDataDepartments = (listTeaches) => {
    setDepartments(setDataDepartmentsController(listTeaches, departments));
  }
  const searchDepartment = (sectionDepartment) => {
    const foundDepartment = departments.find(department => department.sectionDepartment === sectionDepartment);
    if (foundDepartment) {
      setTeacherList(foundDepartment.teacherList)
      toggleIsOpenTeacherList()
    }
  }
  const getItemsForContent = async (orsidAPI, listTeaches, showUpdate = true) => {
    if (showUpdate) {
      setIsTeacherList(false)
      const findTeacher = listTeaches.find(el => el.orcid === orsidAPI)
      console.log(findTeacher)
      setIsLoading(true);
      setTeacher(findTeacher)
    }

    const instance = axios.create({
      baseURL: 'https://localhost:3300',
    });
    try {
      const response = await instance.get(`/getDataByOrcid/${orsidAPI}`);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      if (showUpdate) {
        setListWorks(response.data.data)

      }
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      console.error('Ошибка при получении данных:', error);
      throw error;
    }
  }

  return (
    <div className="App">
      <img className='fix' src={logo} />
      <Header
        searchDepartment={searchDepartment}
        getItemsForContent={getItemsForContent}
        departments={departments}
        addNewDepartment={addNewDepartment}
        teacher={teacher}
        setDataDepartments={setDataDepartments}
      />
      {isTeacherList
        ?
        <TeacherList
          toggleIsOpenTeacherList={toggleIsOpenTeacherList}
          teacherList={teacherList}
          getItemsForContent={getItemsForContent}
        />
        :
        <WorkContent
          teacher={teacher}
          listWorks={listWorks}
          isLoading={isLoading}

        />
      }

    </div>
  );
}

export default App;
