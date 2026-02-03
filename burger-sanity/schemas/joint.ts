export default {
  name: 'joint',
  title: 'Joint',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
        {
          name: 'attribution',
          type: 'string',
          title: 'Attribution',
        },
      ],
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      },
    },
    {
      name: 'review',
      title: 'Review',
      type: 'text',
      rows: 20,
    },
    {
      name: 'pros',
      title: 'Pros',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'cons',
      title: 'Cons',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'hashtags',
      title: 'Hashtags',
      type: 'text',
      rows: 3,
    },
    {
      name: 'adress',
      title: 'Adress',
      type: 'string',
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'food',
      title: 'Food',
      type: 'number',
    },
    {
      name: 'atmosphere',
      title: 'Atmosphere',
      type: 'string',
    },
    {
      name: 'itFactor',
      title: 'ItFactor',
      type: 'number',
    },
    {
      name: 'average',
      title: 'Average',
      type: 'number',
    },
    {
      name: 'gourmetOrJoint',
      title: 'GourmetOrJoint',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
    },
    {
      name: 'latLng',
      title: 'LatLng',
      type: 'geopoint',
    },
  ],
}
