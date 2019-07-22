const environment = process.env.NODE_ENV || 'development'
const port = process.env.PORT || '3000'
const isDev = environment === 'development'

const siteURL = isDev ? `http://localhost:${port}` : 'http://ezivnuska.herokuapp.com'

const assetPath = 'assets'
const assetURL = `${siteURL}/${assetPath}`

const bucket = 'ezivnuska'
const bucketUrl = 'https://ezivnuska.s3-us-west-1.amazonaws.com'
const profileImagesPath = 'user-uploads/profile-images'
const userImagesPath = 'user-uploads/user-images'

export default {
  isDev,
  bucket,
  siteURL,
  assetPath,
  assetURL,
  profileImagesPath,
  bucketUrl,
  userImagesPath,
}