import '../globals.css'
import "../../styles/main.scss";
import ShopProvider from '../../context/shopContext'
import Head from 'next/head';
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
      <Head>
        {/* Adobe Fonts (Typekit) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(d){var config={kitId:'njs1abr',scriptTimeout:3000,async:true},h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\\bwf-loading\\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)})(document);`,
          }}
        />
      </Head>
      <body>
        <Suspense fallback={<div className="loader">Loading...</div>}>
            <ShopProvider>{children}</ShopProvider>
        </Suspense>
      </body>
    </html>
  )
}

