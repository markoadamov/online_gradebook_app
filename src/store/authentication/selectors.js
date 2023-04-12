const activeUserSelector = (state) => {
    return state.authentication.active_user;
};

const errorsSelector = (state) => {
    return state.authentication.errors;
};

export { activeUserSelector, errorsSelector }; 