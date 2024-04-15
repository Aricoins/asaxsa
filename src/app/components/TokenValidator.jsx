"use client"
//import { useEffect, useState } from 'react';
//import jose from 'node-jose'; // Importa la biblioteca node-jose

const TokenValidator = ({ token }) => {
  // const [isValid, setIsValid] = useState(false);
  // const [decodedToken, setDecodedToken] = useState(null);

  // useEffect(() => {
  //   const decryptToken = async () => {
  //     try {
  //       const secret = jose.base64url.decode('zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI');
  //       const { payload, protectedHeader } = await jose.jwtDecrypt(token, secret, {
  //         issuer: 'urn:example:issuer',
  //         audience: 'urn:example:audience',
  //       });

  //       setIsValid(true);
  //       setDecodedToken({ payload, protectedHeader });
  //     } catch (error) {
  //       setIsValid(false);
  //       setDecodedToken(null);
  //       console.error('Error decrypting the token:', error);
  //     }
  //   };

  //   if (token) {
  //     decryptToken();
  //   }
  // }, [token]);


  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2>JWT Token</h2>
      {token ? (
        <div>
          <p style={{ color: "green", fontWeight: "500" }}>The token is valid.</p>
          {/* <p>Protected Header: {JSON.stringify(decodedToken.protectedHeader)}</p> */}
          {/* <p>Payload: {JSON.stringify(decodedToken.payload)}</p> */}
        </div>
      ) : (
        <p style={{ color: "red", fontWeight: "500" }}>The token is invalid.</p>
      )}
    </div>
  );
};

export default TokenValidator;
