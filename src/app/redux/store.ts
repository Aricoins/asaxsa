import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import  rootReducer  from './reducer'; // Asegúrate de importar el rootReducer correcto
import { thunk } from 'redux-thunk';

interface AuthState {
  user: any;
  token: string;
}
// Configuración de persistencia

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authReducer'], // Lista blanca de los reductores que se van a persistir
};

// Asegúrate de que el tipo del estado inicial coincide con el tipo AuthState
const persistedReducer = persistReducer<AuthState>(persistConfig, rootReducer as any);

// Crea la tienda Redux con el reductor persistido
const store = createStore(persistedReducer, applyMiddleware(thunk));

// Crea el persistor para persistir el estado de la tienda
const persistor = persistStore(store);

export { store, persistor };
