import jwt from 'jsonwebtoken'


const authMiddleware = (req, res, next) => {
  const authHeader  = req.header.autorization?.split(' ')[1];
  
  if (!authHeader) return res.status(403).send('Accès refusé. Token non fourni');

  try {
    const decoded = jwt.verify(authHeader, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Token non valide ==> caca le token')
  }
}