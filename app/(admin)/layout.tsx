import '../globals.css'
import "../../styles/main.scss";
import ShopProvider from '../../context/shopContext'
import React, { Suspense } from 'react'; // adjust the path accordingly

export const metadata = {
  title: '',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div className="loader">Loading...</div>}>
            <ShopProvider>{children}</ShopProvider>
        </Suspense>
      </body>
    </html>
  )
}

