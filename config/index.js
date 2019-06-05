const environment = process.env.NODE_ENV || 'development'
const port = process.env.PORT || '3000'
console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
console.log('environment:', environment)
const isDev = environment === 'development'
const assetPath = 'assets'
const profileImagesPath = 'user-uploads/profile-images'
const siteURL = isDev ? `http://localhost:${port}` : 'http://ezivnuska.herokuapp.com'
const assetURL = isDev ? `${siteURL}/${assetPath}` : assetPath
const profileImagesURL = `${assetURL}/${profileImagesPath}`

export default {
  siteURL,
  assetPath,
  assetURL,
  profileImagesPath,
  profileImagesURL,
}