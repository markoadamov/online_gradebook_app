const teachersSelector = (state) => {
    return state.teachers.data;
};

const singleTeacherSelector = (state) => {
    return state.teachers.single_teacher;
};

export { teachersSelector, singleTeacherSelector }; 