import Equipment from "../models/Equipment.js";

export const getEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findAll();
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addEquipment = async (req, res) => {
  const { name, serialNumber, location, status } = req.body;

  try {
    const exists = await Equipment.findOne({ where: { serialNumber } });
    if (exists) {
      return res.status(400).json({ message: "Serial Number already exists" });
    }

    const newMachine = await Equipment.create({
      name,
      serialNumber,
      location,
      status,
    });

    res.status(201).json(newMachine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateEquipmentStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const machine = await Equipment.findByPk(req.params.id);

    if (machine) {
      machine.status = status || machine.status;
      const updatedMachine = await machine.save();
      res.json(updatedMachine);
    } else {
      res.status(404).json({ message: "Equipment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
