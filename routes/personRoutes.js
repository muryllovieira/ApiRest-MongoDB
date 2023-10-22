const router = require('express').Router();

const Person = require('../models/Person');

//CREATE - POST
router.post('/', async (req, res) => {

    // req.body
    const {name, salary, approved} = req.body

    const person = {
        name, 
        salary,
        approved
    }

    if (!name) {
        res.status(422).json({error: 'O nome é obrigatorio'})
    }

    try {
      //criando dados  
      await Person.create(person)  

      res.status(201).json({message: 'Person created'})

    } catch (error) {
        res.status(500).json({error: error})
    }

})

// READ - GET
router.get('/', async (req, res) => {

    try {
        const people = await Person.find()

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({error: error})
    }

})

// READ - GET BY ID
router.get('/:id', async (req, res) =>{

    //extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {
        
        const person = await Person.findOne({ _id: id})

        if (!person) {
            res.status(422).json({message: 'Usuario não encontrado'})
        } else {
            res.status(200).json(person)
        }

    } catch (error) {
        res.status(500).json({error: error})
    }

})

//UPDATE - ATUALIZACAO DE DADOS (PUT, PATCH)
router.put('/:id', async (req, res) => {
    
    const id = req.params.id

    const {name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved
    }

    try {

        const updatePerson = await Person.updateOne({_id: id}, person)

        if(updatePerson.matchedCount === 0) {
            res.status(422).json({message: 'O usuario não foi atualizado'})
        } else {
            res.status(200).json(person)
        }
        
    } catch (error) {
        res.status(500).json({error: error})
    }

})

//DELETE - DELETAR PESSOA
router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const person = await Person.findOne({ _id: id})

        if (!person) {
            res.status(422).json({message: 'Usuario não encontrado'})
        } else 
        
        try {
            await Person.deleteOne({_id: id})
            res.status(200).json({message: 'Usuario deletado com sucesso'})
        } catch (error) {
            res.status(500).json({error: error})
        }
})

module.exports = router