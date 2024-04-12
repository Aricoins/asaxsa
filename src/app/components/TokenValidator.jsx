import React, { useState } from 'react';
import * as jwtDecode from 'jwt-decode';

const TokenValidator = ({ token }) => {
  const [isValid, setIsValid] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null);

  const validateToken = () => {
    try {
      // Decodificar el token
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
      // Marcar como válido si no hay errores en el proceso de decodificación
      setIsValid(true);
    } catch (error) {
      // Marcar como inválido si hay errores en el proceso de decodificación
      setIsValid(false);
      console.error('Error al decodificar el token:', error);
    }
  };

  // Validar el token cuando el componente se monta
  useState(() => {
    validateToken();
  }, []);

  return (
    <div>
      <h2>Token JWT</h2>
      {isValid ? (
        <div>
          <p>El token es válido.</p>
          <p>ID de usuario: {decodedToken._id}</p>
          <p>Nombre: {decodedToken.firstName} {decodedToken.lastName}</p>
          <p>Email: {decodedToken.email}</p>
          {/* Podemos mostrar más información del token aquí */}
        </div>
      ) : (
        <p>El token no es válido.</p>
      )}
    </div>
  );
};

export default TokenValidator;
