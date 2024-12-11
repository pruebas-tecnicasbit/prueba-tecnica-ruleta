import Apuesta from "../models/Apuesta.js";
import Ruleta from "../models/Ruleta.js";

function validarColor(color) {
  const coloresValidos = ["negro", "rojo"];
  return coloresValidos.includes(color.toLowerCase());
}

function validarColorNumero(numero, color) {
  const colorEsperado = numero % 2 === 0 ? "rojo" : "negro";
  return color.toLowerCase() === colorEsperado;
}

function validarCantidad(cantidad) {
  return cantidad <= 10000;
}

async function createApuesta(req, res) {
  const { cantidad, numero, color, usuario, ruletaId } = req.body;

  if (numero < 0 || numero > 36) {
    return res
      .status(400)
      .json({ message: "El número debe estar entre 0 y 36" });
  }

  if (!validarCantidad(cantidad)) {
    return res
      .status(201)
      .json({ message: "El valor maximo para apostar es $10.000" });
  }

  if (!validarColor(color)) {
    return res
      .status(400)
      .json({ message: 'El color debe ser "negro" o "rojo"' });
  }

  if (!validarColorNumero(numero, color)) {
    return res.status(400).json({
      message: `El color no corresponde con el número: ${numero} debe ser ${
        numero % 2 === 0 ? "rojo" : "negro"
      }`,
    });
  }

  try {
    const ruleta = await Ruleta.findById(ruletaId);
    if (!ruleta || !ruleta.status) {
      return res
        .status(400)
        .json({ message: "Ruleta cerrada o no encontrada" });
    }

    const nuevaApuesta = new Apuesta({
      cantidad,
      numero,
      color,
      usuario,
      ruletaId: ruleta._id,
    });
    await nuevaApuesta.save();
    ruleta.apuesta.push(nuevaApuesta);
    await ruleta.save();

    res.status(201).json({ message: "Apuesta creada", apuesta: nuevaApuesta });
  } catch (error) {
    res
      .status(500)
      .json({ message: "No se pudo crear la apuesta", error: error.message });
  }
}

export default {
  createApuesta: createApuesta,
};
