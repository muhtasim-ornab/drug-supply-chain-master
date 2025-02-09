var crypto = require('crypto'),
    algorithm = process.env.algorithm,
    password = process.env.ENCRYPT_DECRYPT_PASS;

module.exports = {
    encryption: function encrypt(text){
        var cipher = crypto.createCipher(algorithm, password)
        var crypted = cipher.update(text, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    },
    decryption: function decrypt(text){
        var decipher = crypto.createDecipher(algorithm, password)
        var dec = decipher.update(text, 'hex', 'utf8')
        dec += decipher.final('utf8');
        return dec;
    }
} 







