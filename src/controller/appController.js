export const setDataDepartmentsController = (listTeaches) => {
    const correctListTeaches = listTeaches.filter(teach => (
        teach.createdAt !== null &&
        teach.full_name !== null &&
        teach.id !== null &&
        teach.orcid !== null &&
        teach.position !== null &&
        teach.rank !== null &&
        teach.section !== null &&
        teach.updatedAt !== null
    ));

    const updatedDepartments = correctListTeaches.reduce((acc, teacher) => {
        const item = teacher.section;
        if (typeof item === 'number' || (typeof item === 'string' && item !== '')) {
            const teachersForDepartment = correctListTeaches.filter(t => t.section === item);
            const existingDepartmentIndex = acc.findIndex(department => department.sectionDepartment === item);
            
            if (existingDepartmentIndex === -1) {
                acc.push({
                    sectionDepartment: item,
                    teacherList: teachersForDepartment,
                });
            } else {
                acc[existingDepartmentIndex].teacherList = teachersForDepartment;
            }
        }
        return acc;
    }, []);

    const uniqueDepartments = updatedDepartments
        .sort(customSort);
    return uniqueDepartments;
};

const customSort = (a, b) => {
    const departmentA = parseInt(a.sectionDepartment, 10);
    const departmentB = parseInt(b.sectionDepartment, 10);

    if (!isNaN(departmentA) && !isNaN(departmentB)) {
        if (departmentA < departmentB) return -1;
        if (departmentA > departmentB) return 1;
        return 0;
    }

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