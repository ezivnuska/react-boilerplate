const environment = process.env.NODE_ENV || 'development'
const port = process.env.PORT || '3000'
const isDev = environment === 'development'

const siteURL = isDev ? `http://localhost:${port}` : 'http://ezivnuska.herokuapp.com'

const assetPath = 'assets'
const assetURL = `${siteURL}/${assetPath}`

const profileImagesPath = 'user-uploads/profile-images'
const profileImagesURL = 'https://ezivnuska.s3-us-west-1.amazonaws.com'

export default {
  isDev,
  siteURL,
  assetPath,
  assetURL,
  profileImagesPath,
  profileImagesURL,
}