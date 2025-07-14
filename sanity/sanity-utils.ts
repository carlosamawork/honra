import {createClient, groq} from 'next-sanity'
import {apiVersion, dataset, projectId} from './env'

export const client = createClient({
    projectId: projectId,
    dataset: dataset,
    useCdn: true,
    apiVersion: apiVersion,
})

export async function getHeader() {
    return client.fetch(
        groq`*[_type == "settings"][0]{
      menu,
      footer {
        linksSocial[]{
          title,
          "icon": icon.asset->url,
          newWindow,
          url,
          _key
        },
      }
    }`
    )
}

export async function getFooter() {
    return client.fetch(
        groq`*[_type == "settings"][0]{
      footer{
        links,
        linksSocial[]{
          title,
          "icon": icon.asset->url,
          newWindow,
          url,
          _key
        },
        linksTerms,
        socialModule[]{
          title,
          "icon": icon.asset->url,
          newWindow,
          url,
          _key
        }
        
      },
    }`
    )
}

