const environment = process.env.NODE_ENV || 'development'
const port = process.env.PORT || '3000'
console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
console.log('environment:', environment)
const isDev = environment === 'development'
const assetPath = isDev ? '/assets' : '/public/assets'
const profileImagesPath = '/user-uploads/profile-images'
const siteURL = isDev ? `http://localhost:${port}` : 'http://ezivnuska.herokuapp.com'
const assetURL = `${siteURL}${assetPath}`
const profileImagesURL = `${assetURL}${profileImagesPath}`

export default {
  siteURL,
  assetURL,
  profileImagesURL,
}