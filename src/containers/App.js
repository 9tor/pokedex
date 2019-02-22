import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as pokemonAction from '../actions/pokemonaction'
import './App.css'

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b"
}

class App extends Component {
    constructor(props) {
        super(props)

    }
    componentDidMount() {
        this.props.getMyPokemon()
    }
    render() {
        const { cards } = this.props.PokemonList
        console.log({cards});
        return (
            <div className="App">

            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        PokemonList: state.pokemon,
    }
}

// export default App
export default connect(mapStateToProps,pokemonAction)(App)
