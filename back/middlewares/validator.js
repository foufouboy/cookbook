const { body } = require('express-validator');
const vulgarityWords = ["con", "merde", "putain", "salope", "connard", "enculé", "fdp", "fils de pute", "fils dep", "tamère", "tamere"]

module.exports.validatedUser = [
    body('email')
        .notEmpty()
        .trim()
        .isEmail().withMessage("Ce n'est pas un email valide !"),
    body('name')
        .notEmpty()
        .isLength({ min: 4, max: 50 }).withMessage('Le nom doit contenir au moins 4 caractères'),
    body('password')
        .isLength({ min: 8, max: 50 }).withMessage('Le mot de passe doit contenir au moins 8 caractères')
        .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir une majuscule')
        .matches(/[a-z]/).withMessage('Le mot de passe doit contenir une minuscule')
        .matches(/[0-9]/).withMessage('Le mot de passe doit contenir un chiffre')
        .matches(/[^A-Za-z0-9]/).withMessage('Le mot de passe doit contenir un caractère spécial')
]

module.exports.validatedRecipe = [
    body('title')
        .trim()
        .notEmpty().withMessage('La recette doit avoir un nom'),
    body('description')
        .trim()
        .notEmpty().withMessage('La recette doit avoir une description'),
    body('image')     
        .notEmpty().withMessage('La recette doit avoir une image')
]

module.exports.validatedComment = [
    body('comment')
        .trim()
        .notEmpty().withMessage('La commentaire ne doit pas être vide')
        .custom(value => {
            const words = value.toLowerCase().split(/\s+/)
            const foundWord = words.find(w => vulgarityWords.includes(w));
            
            if(foundWord){
                throw new Error (`Le mot ${foundWord} est interdit.`)
            }
            return true
        })
]