import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    title: 'Dropbox',
    description:
      'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
    imageUrl: '/images/products/product_1.png',
    totalDownloads: '594',
    updatedAt: '27/03/2019'
  },
  {
    id: uuid(),
    title: 'Medium Corporation',
    description:
      'Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.',
    imageUrl: '/images/products/product_2.png',
    totalDownloads: '625',
    createdAt: '31/03/2019'
  },
  {
    id: uuid(),
    title: 'Slack',
    description:
      'Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.',
    imageUrl: '/images/products/product_3.png',
    totalDownloads: '857',
    createdAt: '03/04/2019'
  }
];
