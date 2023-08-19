const Carta = require("../models/carta");


const createCarta= async(req,res)=>{
    const { user, front, back } = req.body;
    const { folder_id } = req.params;


    try {
        const nuevaCarta = new Carta({ folder_id, user_id: user._id, front, back });
        await nuevaCarta.save();

        res.status(201).json(nuevaCarta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la carta' });
    }
}

const getCartaPorId=async(req,res)=>{
    const { id } = req.params;

    try {
        const carta = await Carta.findById(id);

        if (!carta) {
            return res.status(404).json({ message: 'Carta no encontrada' });
        }

        res.json(carta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la carta' });
    }
}

const getCartaPorFolder=async(req,res)=>{
    const { id } = req.params;

    try {
        const cartas = await Carta.find({folder_id:id});

        if (!cartas) {
            return res.status(404).json({ message: 'Cartas no encontradas' });
        }

        res.json(cartas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la carta' });
    }
}

const updateCarta=async(req,res)=>{
    const { front, back } = req.body;
    const { id } = req.params;

    try {
        const carta = await Carta.findByIdAndUpdate(id, { front, back });

        if (!carta) {
            return res.status(404).json({ message: 'Carta no encontrada' });
        }

        res.json(carta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la carta' });
    }
}


const updateInterval= async()=>{

    const { id } = req.params;

    try{
        const carta = await Carta.findById(id);
        if (!carta) {
            return res.status(404).json({ message: 'Carta no encontrada' });
        }

        res.json(carta);
    }catch(e){
        console.log(e);
        res.status(500).json({msg: "Error al actualizar el intervalo"})
    }
}

const deleteCarta=async(req,res)=>{
    const { id } = req.params;

    try {
        const carta = await Carta.findByIdAndDelete(id);

        if (!carta) {
            return res.status(404).json({ message: 'Carta no encontrada' });
        }

        res.json({ message: 'Carta eliminada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la carta' });
    }
}

module.exports={
    createCarta,
    getCartaPorId,
    updateCarta,
    deleteCarta,
    getCartaPorFolder,
    updateInterval
}