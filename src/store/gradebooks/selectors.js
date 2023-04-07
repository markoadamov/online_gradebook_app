const gradebooksSelector = (state) => {
    return state.gradebooks.data;
};

const currentTotalGradebookCountSelector = (state) => {
    return state.gradebooks.current_and_total_gradebook_count;
};

export { gradebooksSelector, currentTotalGradebookCountSelector }; 