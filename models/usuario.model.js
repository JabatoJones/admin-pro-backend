
const { model, Schema } = require("mongoose");

const UsuarioSchecma = Schema({
    nombre: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required : true,
        unique: true
    },
    password: {
        type: String,
        required : true
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required : true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default : false
    },
    
});

//Modifica visualmente la respuesta del JSON, no afecta a lo que se guarda en la BBDD
UsuarioSchecma.method('toJSON',function() {
    const {__v, _id,password, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model ("Usuario", UsuarioSchecma);