

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import styles from  "./global.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";

// const ReduxProvider = dynamic(() => import("@/store/redux-provider"), {
//   ssr: false
// });


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple task managment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
    <html lang="en"  >
      <body className={styles.body}>
                  {children}
      </body>
=======
    <html lang="en" className='bg-black' >
      <body className={`${inter.className} bg-black`}
  >

    {children}

    </body>
>>>>>>> 87c1534af83fb9b49031ad509b1fd1092b3438ea
    </html>
  );
}
