import {TagIcon} from '@sanity/icons'
import pluralize from 'pluralize-esm'
import ShopifyIcon from '../../components/icons/Shopify'
import ProductHiddenInput from '../../components/inputs/ProductHidden'
import ShopifyDocumentStatus from '../../components/media/ShopifyDocumentStatus'
import {defineField, defineType} from 'sanity'
import {getPriceRange} from '../../utils/getPriceRange'

const GROUPS = [
  {
    name: 'editorial',
    title: 'Editorial',
    default: true,
  },
  {
    name: 'shopifySync',
    title: 'Shopify sync',
    icon: ShopifyIcon,
  },
  {
    name: 'seo',
    title: 'SEO',
  },
]

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: TagIcon,
  groups: GROUPS,
  fields: [
    defineField({
      name: 'hidden',
      type: 'string',
      components: {
        field: ProductHiddenInput,
      },
      group: GROUPS.map((group) => group.name),
      hidden: ({parent}) => {
        const isActive = parent?.store?.status === 'active'
        const isDeleted = parent?.store?.isDeleted
        return !parent?.store || (isActive && !isDeleted)
      },
    }),
    // // Title (proxy)
    // defineField({
    //   name: 'titleProxy',
    //   title: 'Title',
    //   type: 'proxyString',
    //   options: {field: 'store.title'},
    // }),
    // // Slug (proxy)
    // defineField({
    //   name: 'slugProxy',
    //   title: 'Slug',
    //   type: 'proxyString',
    //   options: {field: 'store.slug.current'},
    // }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'body',
      group: 'editorial',
    }),
    defineField({
      name: 'images',
      title: 'Imágenes adicionales',
      type: 'array',
      of: [{
        type: 'module.image'
      },],
      group: 'editorial',
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [{
        type: 'module.video'
      },],
      group: 'editorial',
    }),
    defineField({
      name: 'valoraciones',
      title: 'Valoraciones',
      type: 'array',
      of: [{
        type: 'module.valoracion'
      },],
      group: 'editorial',
    }),
    defineField({
      name: 'orderRank',
      title: 'Orden',
      type: 'string',
      group: 'editorial',
    }),
    defineField({
      name: 'store',
      title: 'Shopify',
      type: 'shopifyProduct',
      description: 'Product data from Shopify (read-only)',
      group: 'shopifySync',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo.shopify',
      group: 'seo',
    }),
  ],
  orderings: [
    {
      name: 'titleAsc',
      title: 'Title (A-Z)',
      by: [{field: 'store.title', direction: 'asc'}],
    },
    {
      name: 'titleDesc',
      title: 'Title (Z-A)',
      by: [{field: 'store.title', direction: 'desc'}],
    },
    {
      name: 'priceDesc',
      title: 'Price (Highest first)',
      by: [{field: 'store.priceRange.minVariantPrice', direction: 'desc'}],
    },
    {
      name: 'priceAsc',
      title: 'Price (Lowest first)',
      by: [{field: 'store.priceRange.minVariantPrice', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      isDeleted: 'store.isDeleted',
      options: 'store.options',
      previewImageUrl: 'store.previewImageUrl',
      priceRange: 'store.priceRange',
      status: 'store.status',
      title: 'store.title',
      variants: 'store.variants',
    },
    prepare(selection) {
      const {isDeleted, options, previewImageUrl, priceRange, status, title, variants} = selection

      const optionCount = options?.length
      const variantCount = variants?.length

      let description = [
        variantCount ? pluralize('variant', variantCount, true) : 'No variants',
        optionCount ? pluralize('option', optionCount, true) : 'No options',
      ]

      let subtitle = getPriceRange(priceRange)
      if (status !== 'active') {
        subtitle = '(Unavailable in Shopify)'
      }
      if (isDeleted) {
        subtitle = '(Deleted from Shopify)'
      }

      return {
        description: description.join(' / '),
        subtitle,
        title,
        media: (
          <ShopifyDocumentStatus
            isActive={status === 'active'}
            isDeleted={isDeleted}
            type="product"
            url={previewImageUrl}
            title={title}
          />
        ),
      }
    },
  },
})
