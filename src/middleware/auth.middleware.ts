import getIdByHeaderToken from '../helps/decodedToken'

const autorization = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    req.user = getIdByHeaderToken(res, req); // return user object
    next()

  } catch (e) {
    res.status(401).json({ message: 'No authorization' })
  }
}


export default autorization;