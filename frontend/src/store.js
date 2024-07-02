import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { userloginReducer } from './reducers/userReducers';
import { NoteReducer } from './reducers/notesReducers';
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const persistConfig = {
    key: 'counter',
    storage,
};

const reducer = combineReducers({
    userLogin: userloginReducer,
    noteReducer: NoteReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
