import {defineField} from 'sanity'

export default defineField({
  name: 'body',
  title: 'Body',
  type: 'array',
  of: [
    {
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'H5', value: 'h5'},
        {title: 'H6', value: 'h6'},
        {title: 'Quote', value: 'blockquote'}
      ],
      marks: {
        decorators: [
          {
            title: 'Italic',
            value: 'em',
          },
          {
            title: 'Strong',
            value: 'strong',
          },
        ],
        annotations: [
          // product
          {
            name: 'annotationProduct',
            type: 'annotationProduct',
          },
          // Email
          {
            name: 'annotationLinkEmail',
            type: 'annotationLinkEmail',
          },
          // Internal link
          // {
          //   name: 'annotationLinkInternal',
          //   type: 'annotationLinkInternal',
          // },
          // URL
          {
            name: 'annotationLinkExternal',
            type: 'annotationLinkExternal'
          },
        ],
      },
      // Paragraphs
      type: 'block',

    },
    // Custom blocks
    {
      type: 'module.accordion',
    },
    {
      type: 'module.callout',
    },
    {
      type: 'module.grid',
    },
    {
      type: 'module.images',
    },
    {
      type: 'module.instagram',
    },
    {
      type: 'module.products',
    },
    {
      name: "htmlEmbed",
      type: "object",
      title: "HTML Embed",
      fields: [
        {
          name: "html",
          type: "text",
          title: "HTML Code"
        }
      ]
    }
  ],
})
