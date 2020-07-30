import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    title: 'Course 1',
    description:
      'Personality Development',
    imageUrl: '/images/products/course1.webp',
    totalDownloads: '500',
  },
  {
    id: uuid(),
    title: 'Course 2',
    description:
      'Personality Development + Heath Development',
    imageUrl: '/images/products/product_2.png',
    totalDownloads: '1500',
    createdAt: '31/03/2019'
  },
  {
    id: uuid(),
    title: 'Course 3',
    description:
      'Personality Development + Health Development + Mental Health',
    imageUrl: '/images/products/product_3.jpg',
    totalDownloads: '3000',
    createdAt: '03/04/2019'
  }
];
