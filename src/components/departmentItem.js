import { useState } from "react";
import arrow from '../img/right-arrow.png'



function DepartmentItem({ department, getTeacherHandler }) {

    const [isOpenItems, setIsOpenItems] = useState(false)

    const toggleIsOpenItems = () => {
        console.log('change')
        setIsOpenItems(!isOpenItems)
    }
    const checkedIsNumber = (value) => {
        const parsedNumber = parseFloat(value);
        if (!isNaN(parsedNumber)) {
            return `Кафедра ${value}`
        }
        return value
    };

    return (
        <div className="department" key={department.sectionDepartment}>
            <div className="department__btn"
                onClick={toggleIsOpenItems}
            >
                <div className="department__name">{checkedIsNumber(department.sectionDepartment)}</div>
                <img src={arrow} alt=""
                    style={isOpenItems ? { rotate: '90deg' } : {}}
                />
            </div>
            <div className={isOpenItems ? "list__department open" : "list__department"}>
                {(department.teacherList.length != 0) && department.teacherList.map(item => {
                    return <div className="teacher"
                        onClick={() => getTeacherHandler(item.orcid)}
                        key={item.orcid}
                    >
                        {item.rank}
                        <br />
                        {item.fullName}
                    </div>
                })}
            </div>
        </div>
    );
}

export default DepartmentItem;
