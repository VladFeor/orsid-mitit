
export const setDataDepartmentsController = (listTeaches, departments) => {
    const correctListTeaches = listTeaches.filter(teach => {
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
    });

    const countsDepartment = correctListTeaches.map(item => item.section)
    const updatedDepartments = countsDepartment.map(item => {
        if (typeof item === 'number' || (typeof item === 'string' && item != '')) {
            const existingDepartment = departments.find(department => department.sectionDepartment === item);
            if (!existingDepartment) {
                const teachersForDepartment = correctListTeaches.filter(teacher => teacher.section === item);
                return {
                    sectionDepartment: item,
                    teacherList: teachersForDepartment,
                };
            }
            return existingDepartment;
        }
    }).filter(item => item != undefined);

    const uniqueDepartments = Array.from(new Set(updatedDepartments.map(item => item.sectionDepartment)))
        .map(sectionDepartment => updatedDepartments.find(item => item.sectionDepartment === sectionDepartment))
        .sort(customSort);
    return uniqueDepartments;
}
const customSort = (a, b) => {
    const departmentA = parseInt(a.sectionDepartment, 10);
    const departmentB = parseInt(b.sectionDepartment, 10);
  
    // Check if both items are numbers
    if (!isNaN(departmentA) && !isNaN(departmentB)) {
      if (departmentA < departmentB) return -1;
      if (departmentA > departmentB) return 1;
      return 0;
    }
  
    // Sort alphabetically if one or both items are not numbers
    return a.sectionDepartment.localeCompare(b.sectionDepartment);
  };

export const canParseInt = (item) => {
    const parsedNumber = parseFloat(item);
    if (!isNaN(parsedNumber)) {
        return parsedNumber
    } else {
        return item
    }
}