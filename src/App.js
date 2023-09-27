import './App.css';
import logo from './img/Department of _COMPUTER INFORMATION TECHNOLOGIES.png';
import Header from './components/header';
import WorkContent from './components/worksContent';
import { useState } from 'react';
import axios from 'axios';


function App() {
  const [listWorks, setListWorks] = useState([])
  const [teacher, setTeacher] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState([])



  const addNewDepartment = (sectionDepartment) => {
    const updatedDepartments = [...departments, {
      sectionDepartment: sectionDepartment,
      teacherList: [],
    }]
    updatedDepartments.sort((a, b) => a.sectionDepartment - b.sectionDepartment);
    setDepartments(updatedDepartments)
  }

  const setDataDepartments = (listTeaches) => {
    const countsDepartment = listTeaches.map(item => item.section)
    const updatedDepartments = countsDepartment.map(item => {
      if (typeof item === 'number' || (typeof item === 'string' && item != '')) {
        const existingDepartment = departments.find(department => department.sectionDepartment === item);
        if (!existingDepartment) {
          const teachersForDepartment = listTeaches.filter(teacher => teacher.section === item);
          return {
            sectionDepartment: item,
            teacherList: teachersForDepartment,
          };
        }
        return existingDepartment;
      }
    }).filter(item => item != undefined);

    const uniqueDepartments = Array.from(new Set(updatedDepartments.map(item => item.sectionDepartment)))
      .map(sectionDepartment => updatedDepartments.find(item => item.sectionDepartment === sectionDepartment)).sort((a, b) => {
        if (a.sectionDepartment < b.sectionDepartment) return -1;
        if (a.sectionDepartment > b.sectionDepartment) return 1;
        return 0;
      });
    setDepartments(uniqueDepartments);
  }
  console.log(listWorks )
  const getAllParamsTeacher = (orsidAPI) => {
    const apiUrl = `https://us-central1-orcid-194b3.cloudfunctions.net/api/getInfoByOrcid/${orsidAPI}`;

    axios.get(apiUrl)
      .then(response => {
        const jsonString = JSON.stringify(response.data.works.group);
        localStorage.setItem(orsidAPI, jsonString);
      })
      .catch(error => {
        console.error('Произошла ошибка при запросе к API:', error);
      });
  }

  const getItemsForContent = (orsidAPI, listTeaches) => {
    const findTeacher = listTeaches.find(el => el.orcid === orsidAPI)
    setIsLoading(true);
    setTeacher(findTeacher)
    const apiUrl = `https://us-central1-orcid-194b3.cloudfunctions.net/api/getInfoByOrcid/${orsidAPI}`;
    axios.get(apiUrl)
      .then(response => {
        setListWorks([])
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        setListWorks(response.data.works.group)
      })
      .catch(error => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        const teachersWorks = localStorage.getItem(orsidAPI);
        const retrievedTeachersWorks = JSON.parse(`${teachersWorks}`);
        setListWorks(retrievedTeachersWorks)
        console.error('Произошла ошибка при запросе к API:', error);
      });
  }
  return (
    <div className="App">
      <img className='fix' src={logo} />
      <Header
        getItemsForContent={getItemsForContent}
        departments={departments}
        addNewDepartment={addNewDepartment}
        getAllParamsTeacher={getAllParamsTeacher}
        teacher={teacher}
        setDataDepartments={setDataDepartments}
      />
      <WorkContent
        listWorks={listWorks}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
