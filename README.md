This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

DOCUMENTACIÓN PARA APLICACIÓN NEXT JS + SANITY + SHOPIFY

1. Copiar el repositorio de github

2. Ejecutamos comando
npm update
npm install

3. Luego iniciamos Sanity
sanity init

4. Damos nombre al proyecto de sanity

5. Creamos una aplicación en shopify e instalamos:
https://apps.shopify.com/sanity-connect?locale=es

Para crear la aplicación seguir: https://help.funnel.io/en/articles/2559209-how-to-create-api-credentials-for-shopify

6. Establecemos las variables de entorno según los datos que se nos facilitan las plataformas:

SHOPIFY_STOREFRONT_ACCESSTOKEN=''

SHOPIFY_STORE_DOMAIN=''

NEXT_PUBLIC_SANITY_PROJECT_ID=''

NEXT_PUBLIC_SANITY_DATASET=''

7. Revisamos enlace a grapql json en /lib/shopify si no funcionara.

8. Damos acceso a next a las imagenes de shopify y damos acceso a Sanity a las url's con las que trabajemos.


9. Getting Started:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
