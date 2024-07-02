export const NoteReducer = (state = {}, action) => {
    switch (action.type) {
        case "createNoteRequest":
            return { loading: true };
        case "createNoteSuccessfully":
            return { loading: false };
        case "createNoteFail":
            return { loading: false, error: action.payload };
        case "editNoteRequest":
            return { loading: true }
        case "editNoteFail":
            return { loading: false }
        case "editNoteSuccessfully":
            return { loading: false }
        case "SET_SELECTED_NOTE":
            return { ...state, selectedNote: action.payload };
        case "clearSelectedNote":
            return { ...state, selectedNote: null };
        case "USER_LOGOUT":
            return {}
        default:
            return state
    }
}
