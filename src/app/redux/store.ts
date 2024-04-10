import { Store, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AuthActionTypes, AuthState } from './authTypes';
import rootReducer from './authReducers';

// Configuración de persistencia
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['/', '/welcome', '/todos'], // Agrega todas las rutas que deseas incluir en la whitelist
};

// Asegúrate de que el tipo del estado inicial coincida con el tipo AuthState
const persistedReducer = persistReducer<AuthState, AuthActionTypes>(persistConfig, rootReducer);

// Crea la tienda Redux con el reductor persistido
const store: Store = createStore(persistedReducer);

// Crea el persistor para persistir el estado de la tienda
const persistor = persistStore(store);

export { store, persistor };
