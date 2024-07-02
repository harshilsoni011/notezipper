import axios from "axios";

export const createNoteAction = (id, title, content, category) => async (dispatch) => {
    try {
        dispatch({ type: "createNoteRequest" })

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        
        let url = `/create-note`
        if (id) {
            url += `/${id}`
        }

        axios.post(url, { title, content, category }, config).then((res) => {
            if (!res?.data?.data?.token) {
                dispatch({
                    type: "createNoteFail",
                    payload: res?.error
                })
            }

            dispatch({ type: "createNoteSuccessfully" })
        }).catch((error) => console.log(error, "err"));

    } catch (error) {
        dispatch({
            type: "createNoteFail",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
        console.log("error.response.data.message", error);
    }
}

export const deleteNoteAction = (id) => async (dispatch) => {
    try {

        dispatch({ type: "deleteNoteRequest" })

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        axios.post('/delete-note', { id }, config).then((res) => {
            if (!res?.data?.data?.token) {
                dispatch({
                    type: "deleteNoteFail",
                    payload: res?.error
                })
            }

            dispatch({ type: "deleteNoteSuccessfully" })
        }).catch((error) => console.log(error, "err"));

    } catch (error) {
        dispatch({
            type: "deleteNoteFail",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
        console.log("error.response.data.message", error);
    }
}