
const { model, Schema } = require("mongoose");

const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Usuario"
    }
}, { collection: "hospitales" });

//Modifica visualmente la respuesta del JSON, no afecta a lo que se guarda en la BBDD
HospitalSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model("Hospital", HospitalSchema);