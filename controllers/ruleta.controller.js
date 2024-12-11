import Ruleta from "../models/Ruleta.js";

async function createRuleta(req, res) {
  try {
    const nuevaRuleta = new Ruleta();
    await nuevaRuleta.save();
    res.status(201).json({
      id: nuevaRuleta._id,
      status: nuevaRuleta.status,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateRuleta(req, res) {
  try {
    console.log(req.params);
    const ruleta = await Ruleta.findById(req.params.id);
    if (!ruleta) {
      return res.status(404).json({ message: "No se encontro ruleta" });
    }
    console.log(ruleta);
    ruleta.status = true;
    ruleta.save();
    return res
      .status(200)
      .json({ message: "Se ha iniciado la ruleta", ruleta });
  } catch (error) {
    return res.status(500).json({
      message: "No se pudo conectar al Servidor",
    });
  }
}

async function listRuletas(req, res) {
  try {
    const ruletas = await Ruleta.find().select("id status");
    res
      .status(200)
      .json(
        ruletas.map((r) => ({
          id: r._id,
          estado: r.status ? "abierta" : "cerrada",
        }))
      );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  createRuleta: createRuleta,
  updateRuleta: updateRuleta,
  listRuletas: listRuletas,
};
