import * as actionTypes from "../actions/actionTypes";

const initialState = {
    tasks: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ADD_TASK:
            {
                const newState = { ...state }

                const id = `${Math.random()}_${new Date().getTime()}`
                const newTask = { id: id, value: "", hr: "", min: "", urgent: false, important: false, finished: false, timeSpentHr: "", timeSpentMin: ""};
                if (state.tasks !== undefined) {
                    newState.tasks = [...state.tasks, newTask]
                } else {
                    newState.tasks = [newTask]
                }

                return (newState);
            }

        case actionTypes.REMOVE_TASK:
            {
                const newState = { ...state }
                const newTasks = state.tasks.filter(task => {
                    return (task.id !== action.id)
                })
                newState.tasks = newTasks;
                return (newState)
            }

        case actionTypes.TASK_UPDATE_INPUT:
            {
                if (action.value !== "value" && (action.newValue.length > 2 || +action.newValue < 0 || (action.value === "min" && +action.newValue > 59))) {
                    return (state)
                }
                const newState = { ...state }
                const newTasks = [...state.tasks]
                for (let i = 0; i < newTasks.length; i++) {
                    if (newTasks[i].id === action.id) {
                        newTasks[i][action.value] = action.newValue;
                    }
                }
                newState.tasks = newTasks;
                return (newState)
            }

        case actionTypes.TASK_UPDATE_URGENCY:
            {
                const newState = { ...state }
                const newTasks = [...state.tasks]
                for (let i = 0; i < newTasks.length; i++) {
                    if (newTasks[i].id === action.id) {
                        newTasks[i][action.value] = !newTasks[i][action.value];
                    }
                }
                newState.tasks = newTasks

                return (newState);
            }

        case actionTypes.SET_STATE_TASKS:
            {
                const newState = { ...state }
                newState.tasks = action.tasks

                return (newState);
            }

        case actionTypes.TASK_UPDATE_TIME_SPENT:
            {
                if ((action.value.length > 2 || +action.value < 0 || (action.config === "timeSpentMin" && +action.value > 59))) {
                    return (state)
                }
                const newState = { ...state }
                const newTasks = [...state.tasks];
                for (let i = 0; i < newTasks.length; i++) {
                    if (newTasks[i].id === action.id) {
                        newTasks[i][action.config] = action.value;
                    }
                }
                newState.tasks = newTasks
                return (newState);
            }

        default: return state
    }

}

export default reducer;
