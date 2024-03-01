import './App.css';
import Panel from './components/panel';
import WorkContent from './components/worksContent';
import { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './img/Department of _COMPUTER INFORMATION TECHNOLOGIES.png';
import { setDataDepartmentsController } from './controller/appController';
import TeacherList from './components/teacherList';
import Header from './components/header/Header';
import { toast } from 'react-toastify';



function App() {
  const [listWorks, setListWorks] = useState([])
  const [teacher, setTeacher] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState([])
  const [teacherList, setTeacherList] = useState()
  const [sectionDepartment, setSectionDepartment] = useState()
  const [isTeacherList, setIsTeacherList] = useState(false)
  const [accountUser, setAccountUser] = useState({
    orcid: '',
    name: '',
    rank: '',
    role: 'user',
  })
  const changeAccountUser = async (userData = null, role) => {
    if (userData == null) {
      setAccountUser({
        orcid: '',
        name: '',
        rank: '',
        role: 'user',
      })
      return
    }
    const teacher = findTeacherByOrcidInAllDepartments(departments, userData);
    if (teacher == null) toast.error('Даного користувача не знайдено')

    const instance = axios.create({
      baseURL: `https://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT_SERVER}`,
    });
    if (!teacher) return
    try {
      const response = await instance.get(`/getAccountRole/${userData}`);
      setAccountUser({
        orcid: userData,
        name: teacher.full_name,
        rank: teacher.rank,
        role: response.data,
      })
    } catch (error) {
      console.log(error);
    }
  }
  function findTeacherByOrcidInDepartment(department, orcid) {
    return department.teacherList.find(teacher => teacher.orcid === orcid);
  }

  function findTeacherByOrcidInAllDepartments(departments, orcid) {
    for (const department of departments) {
      const foundTeacher = findTeacherByOrcidInDepartment(department, orcid);
      if (foundTeacher) {
        return foundTeacher;
      }
    }

    return null;
  }
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
  const setDataDepartments = async (listTeaches,sectionDepartment) => {
    await setDepartments(setDataDepartmentsController(listTeaches, []));
  }
  useEffect(() => {
    searchDepartment(sectionDepartment);
}, [departments]); 
  const searchDepartment = (sectionDepartment) => {
    const foundDepartment = departments.find(department => department.sectionDepartment === sectionDepartment);
    if (foundDepartment) {
      setTeacherList(foundDepartment.teacherList.filter(item => item.orcid != accountUser.orcid))
      toggleIsOpenTeacherList()
    }
  }
  const getItemsForContent = async (orsidAPI, listTeaches, showUpdate = true) => {
    if (showUpdate) {
      setIsTeacherList(false)
      const findTeacher = listTeaches.find(el => el.orcid === orsidAPI)
      setIsLoading(true);
      setTeacher(findTeacher)
    }
    const instance = axios.create({
      baseURL: `https://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT_SERVER}`,
    });
    try {
      const response = await instance.get(`/getDataByOrcid/${orsidAPI}`);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      if (showUpdate) {
        setListWorks(response.data.data)
        return response
      }
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      console.error('Ошибка при получении данных:', error);
      throw error;
    }
  }
  const updateTeacherList = async (sectionDepartment) => {
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
          teach.rank !== null &&
          teach.section !== null &&
          teach.updatedAt !== null
        );
      })
      setDataDepartments(listTeachesCorrect,sectionDepartment)
      setSectionDepartment(sectionDepartment)
      if (sectionDepartment && !!departments.findIndex(item => item.section == sectionDepartment)) {
        searchDepartment(sectionDepartment)
      }
      else{
        searchDepartment(departments[0].sectionDepartment)
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }
  useEffect(() => {
    updateTeacherList()
  }, []);
  return (
    <div className="App">
      <img className='fix' src={logo} />
      <Header
        changeAccountUser={changeAccountUser}
        searchDepartment={searchDepartment}
        getItemsForContent={getItemsForContent}
        departments={departments}
        addNewDepartment={addNewDepartment}
        teacher={teacher}
        setDataDepartments={setDataDepartments}
        accountUser={accountUser} />
      <Panel
        changeAccountUser={changeAccountUser}
        searchDepartment={searchDepartment}
        getItemsForContent={getItemsForContent}
        departments={departments}
        addNewDepartment={addNewDepartment}
        teacher={teacher}
        setDataDepartments={setDataDepartments}
        accountUser={accountUser}
        updateTeacherList={updateTeacherList}
        teacherList={teacherList}
      />
      {isTeacherList
        ?
        <TeacherList
          updateTeacherList={updateTeacherList}
          toggleIsOpenTeacherList={toggleIsOpenTeacherList}
          teacherList={teacherList}
          getItemsForContent={getItemsForContent}
          accountUser={accountUser}
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
