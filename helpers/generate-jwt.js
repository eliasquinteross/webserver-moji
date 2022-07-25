const jwt = require('jsonwebtoken');
const { model } = require('mongoose');

const generateJWT = (uid = '') => {

    return new Promise ((resolve, reject)=>{
        const payload = { uid };
        
        jwt.sign(payload, process.env.SECRETORPUBLICKEY, {
            expiresIn: '4h'
        } , (err,token)=>{
            if (err){
                console.log(err);
                reject('No se pudo crear la JWT');
            } else {
                resolve(token);
            }
        })
    });

}

module.exports = {
    generateJWT
}