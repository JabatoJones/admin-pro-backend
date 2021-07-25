
const { model, Schema } = require("mongoose");

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required:true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: "Hospital",
        required: true
    }
},);

//Modifica visualmente la respuesta del JSON, no afecta a lo que se guarda en la BBDD
MedicoSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model("Medico", MedicoSchema);