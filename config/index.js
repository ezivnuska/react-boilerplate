const environment = process.env.NODE_ENV || 'development'
const port = process.env.PORT || '3000'
const isDev = environment === 'development'

console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
console.log('environment:', environment)

const siteURL = isDev ? `http://localhost:${port}` : '/'

const assetPath = 'assets'
const assetURL = isDev ? `${siteURL}/${assetPath}` : `/${assetPath}`

const profileImagesPath = 'user-uploads/profile-images'
const profileImagesURL = `${assetURL}/${profileImagesPath}`

export default {
  isDev,
  siteURL,
  assetPath,
  assetURL,
  profileImagesPath,
  profileImagesURL,
}