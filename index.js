const express = require("express")
const server = express()
const router = express.Router()
const fs = require('fs')

server.use(express.json({extended: true}))

const readFile = () => {
    const content = fs.readFileSync('./data/herois.json', 'utf-8')
    return JSON.parse(content)
}

const writeFile = (content) => {
    const updateFile = JSON.stringify(content)
    fs.writeFileSync('./data/herois.json', updateFile, 'utf-8')
}

router.get('/', (req, res) => {
    const content = readFile()
    res.send(content)
})

router.post('/', (req, res) => {
    const { 
        nome, 
        idade, 
        identidadeSecreta, 
        poderes 
    } = req.body
    
    const currentContent = readFile()
    const id = Math.floor(Math.random() * 100)
    currentContent.push({ id, nome, idade, identidadeSecreta, poderes })
    writeFile(currentContent)
    res.send({ id, nome, idade, identidadeSecreta, poderes })
})

router.put('/:id', (req, res) => {
    const {id} = req.params

    const { 
        nome, 
        idade, 
        identidadeSecreta, 
        poderes 
    } = req.body

    const currentContent = readFile()
    const selectedItem = currentContent.findIndex((item) => item.id === id)

    const { 
        id: cId, 
        nome: cNome,
        idade: cIdade, 
        identidadeSecreta: cIdentidadeSecreta, 
        poderes: cPoderes 
    } = currentContent[selectedItem]

    const newObject = {
        id: cId,
        nome: nome ? nome: cNome,
        idade: idade ? idade: cIdade,
        identidadeSecreta: identidadeSecreta ? identidadeSecreta: cIdentidadeSecreta,
        poderes: poderes ? poderes: cPoderes,
    }

    currentContent[selectedItem] = newObject
    writeFile(currentContent)

    res.send(newObject)
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    const currentContent = readFile()
    const selectedItem = currentContent.findIndex((item) => item.id === id)
    currentContent.splice(selectedItem, 1)
    writeFile(currentContent)
    res.send(true)
})

server.use(router)

server.listen(3000, () => {
    console.log('Servidor rodando')
})