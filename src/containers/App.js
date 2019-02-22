import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactImageFallback from 'react-image-fallback';
import shallowCompare from 'react-addons-shallow-compare';
import * as pokemonAction from '../actions/pokemonaction'
import ModalDialogAddCards from './utils/modalDialogAddCards';
import './App.css'
import './bootstrap.min.css'

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

        this.state = {
            isOpen: false
        }

    }
    componentDidMount() {
        this.props.getAllPokemon()
    }
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
    renderDialogAddCard = ()=>{
        return(
            <ModalDialogAddCards onSubmit={this.addedCard} isOpen={this.state.isOpen} isClose={this.handleCloseAddCard} props={this.props} />
        );
    }
    addedCard = async (id)=>{
        const { pokemonMyCard, pokemonCardAll } = this.props
        const selectedCard = pokemonCardAll.find(x=>x.id==id)
        let newcard = pokemonMyCard
        newcard.push(selectedCard)
        console.log({selectedCard});
        await this.props.addMyPokemon(newcard)
        console.log({newcard});
    }
    showDialogAddCards = ()=>{
        this.setState({isOpen: true});
    }
    handleCloseAddCard = ()=>{
        this.setState({isOpen: false});
    }
    render() {
        const { pokemonMyCard } = this.props
        console.log({pokemonMyCard});
        const cards = (!pokemonMyCard)? []: pokemonMyCard
        return (
            <div className="App">
                {
                    pokemonMyCard.map((card,index)=>{
                        return (
                            <div key={card.id}>
                                <ReactImageFallback src={card.imageUrl} fallbackImage="../images/blank.gif"/>
                            </div>
                        )
                    })
                }
                <button type="button" onClick={ this.showDialogAddCards }>Add</button>
                {this.renderDialogAddCard()}
            </div>
        )
    }

}

function mapStateToProps(state) {
    console.log({state});
    return {
        pokemonCardAll: state.pokemon.pokemonCardAll,
        pokemonMyCard: state.pokemon.pokemonMyCard,
    }
}

export default connect(mapStateToProps,pokemonAction)(App)
