const studentsSelector = (state) => {
    return state.students.data;
};

const studentsErrorsSelector = (state) => {
    return state.students.errors;
};

export { studentsSelector, studentsErrorsSelector }; 