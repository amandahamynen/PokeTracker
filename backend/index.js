import Pokedex from "pokedex-promise-v2"
import express from "express"
import cors from "cors"
import 'dotenv/config'

const PORT = process.env.PORT

const app = express()
const pokedex = new Pokedex()

app.use(cors())
app.use(express.json())


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/pokemon', async (request, response) => {
    try {
        const data = await pokedex.getPokemonsList()
        response.json(data.results)
    } catch (error) {
        console.error('Error fetching Pokémon list:', error)
        response.status(500).json({ error: 'Failed to fetch Pokémon list' })
    }
})

app.get('/api/pokemon/:name', async (request, response) => {
    try {
        const { name } = request.params
        const data = await pokedex.getPokemonByName(name)

        const pokemon = {
            name: data.name,
            types: data.types.map(t => t.type.name),
            sprites: data.sprites
        }

        response.json(pokemon)
    } catch (error) {
        console.error('Error fetching Pokémon:', error)
        response.status(404).json({ error: 'Pokémon not found' })
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})