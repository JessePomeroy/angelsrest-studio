import { defineType } from 'sanity'

export const order = defineType({
  name: 'order',
  type: 'document',
  title: 'Order',
  fields: [
    {
      name: 'orderNumber',
      type: 'string',
      title: 'Order Number',
      description: 'Auto-generated order ID (e.g., ORD-001)'
    },
    {
      name: 'stripeSessionId',
      type: 'string',
      title: 'Stripe Session ID'
    },
    {
      name: 'customerEmail',
      type: 'string',
      title: 'Customer Email'
    },
    {
      name: 'customerName',
      type: 'string',
      title: 'Customer Name'
    },
    {
      name: 'shippingAddress',
      type: 'object',
      title: 'Shipping Address',
      fields: [
        { name: 'line1', type: 'string', title: 'Address Line 1' },
        { name: 'line2', type: 'string', title: 'Address Line 2' },
        { name: 'city', type: 'string', title: 'City' },
        { name: 'state', type: 'string', title: 'State/Province' },
        { name: 'postalCode', type: 'string', title: 'Postal Code' },
        { name: 'country', type: 'string', title: 'Country' }
      ]
    },
    {
      name: 'items',
      type: 'array',
      title: 'Order Items',
      of: [{
        type: 'object',
        fields: [
          { name: 'productName', type: 'string', title: 'Product Name' },
          { name: 'productSlug', type: 'string', title: 'Product Slug' },
          { name: 'quantity', type: 'number', title: 'Quantity' },
          { name: 'price', type: 'number', title: 'Price (cents)' },
          { name: 'image', type: 'image', title: 'Product Image', options: { hotspot: true } }
        ]
      }]
    },
    {
      name: 'subtotal',
      type: 'number',
      title: 'Subtotal (cents)'
    },
    {
      name: 'total',
      type: 'number',
      title: 'Total (cents)'
    },
    {
      name: 'currency',
      type: 'string',
      title: 'Currency',
      initialValue: 'usd'
    },
    {
      name: 'status',
      type: 'string',
      title: 'Fulfillment Status',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Printing', value: 'printing' },
          { title: 'Ready to Ship', value: 'ready' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Refunded', value: 'refunded' }
        ]
      },
      initialValue: 'new'
    },
    {
      name: 'notes',
      type: 'text',
      title: 'Internal Notes',
      description: 'Notes for fulfillment (paper type, custom requests, etc.)'
    },
    {
      name: 'createdAt',
      type: 'datetime',
      title: 'Order Date'
    },
    {
      name: 'updatedAt',
      type: 'datetime',
      title: 'Last Updated'
    }
  ],
  preview: {
    select: {
      title: 'orderNumber',
      subtitle: 'customerEmail',
      media: 'items.0.image'
    }
  }
})
