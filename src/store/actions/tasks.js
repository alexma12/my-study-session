import * as actionTypes from "./actionTypes"

export const addTask = () => {
    return {
        type: actionTypes.ADD_TASK
    }
}

export const removeTask = (id) => {
    return {
        type: actionTypes.REMOVE_TASK,
        id: id
    }
}

export const updateUrgency = (id, value) => {
    return {
        type: actionTypes.TASK_UPDATE_URGENCY,
        id: id,
        value: value
    }
}

export const updateInput = (id, newValue, value) => {
    return {
        type: actionTypes.TASK_UPDATE_INPUT,
        id: id,
        newValue: newValue,
        value: value
    }
}
/*


    const onUrgencyChanged = (id, value) => {
        const newTaskInputs = [...taskInputs]
        for (let i = 0; i < newTaskInputs.length; i++) {
            if (newTaskInputs[i].id === id) {
                newTaskInputs[i][value] = !newTaskInputs[i][value];
            }
        }
        setTaskInputs(newTaskInputs);
    }

    const onTaskInputChanged = (id, newValue, value) => {
        if (value !== "value" && (newValue.length > 2 || +newValue < 0 || (value === "min" && +newValue > 59))) {
            return
        }
        const newTaskInputs = [...taskInputs]
        for (let i = 0; i < newTaskInputs.length; i++) {
            if (newTaskInputs[i].id === id) {
                newTaskInputs[i][value] = newValue;
            }
        }
        setTaskInputs(newTaskInputs);
    }


    const onDeleteTaskHandler = (id) => {
        const newTaskInputs = taskInputs.filter(task => {
            return (task.id !== id)
        })

        setTaskInputs(newTaskInputs);
    }
*/