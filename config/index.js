console.log('config', process.env.PORT)
export default {
  siteURL: `http://localhost:${process.env.PORT ? process.env.PORT : '3000'}`,
  assetURL: `http://localhost:${process.env.PORT ? process.env.PORT : '3000'}/assets`,
  profileImagesURL: `http://localhost:${process.env.PORT ? process.env.PORT : '3000'}/assets/user-uploads/profile-images`,
  environment: 'development'
}