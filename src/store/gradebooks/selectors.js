const gradebooksSelector = (state) => {
    return state.gradebooks.data;
};

const singleGradebookSelector = (state) => {
    return state.gradebooks.single_gradebook;
};

const currentTotalGradebookCountSelector = (state) => {
    return state.gradebooks.current_and_total_gradebook_count;
};

const gradebooksErrorsSelector = (state) => {
    return state.gradebooks.errors;
};

export { gradebooksSelector, currentTotalGradebookCountSelector, singleGradebookSelector, gradebooksErrorsSelector }; 