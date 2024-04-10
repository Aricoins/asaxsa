import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import  authReducer  from './authReducers'; // Asegúrate de importar el rootReducer correcto
import { AuthState} from './authTypes'; // Importa los tipos AuthState y AuthActionTypes

// Configuración de persistencia

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['suthReducer'], // Lista blanca de los reductores que se van a persistir
};

// Asegúrate de que el tipo del estado inicial coincide con el tipo AuthState
const persistedReducer = persistReducer<AuthState>(persistConfig, authReducer as any);

// Crea la tienda Redux con el reductor persistido
const store = createStore(persistedReducer);

// Crea el persistor para persistir el estado de la tienda
const persistor = persistStore(store);

export { store, persistor };
