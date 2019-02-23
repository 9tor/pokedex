import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactImageFallback from 'react-image-fallback';
import shallowCompare from 'react-addons-shallow-compare';
import { ProgressBar } from 'react-bootstrap'
import * as pokemonAction from '../actions/pokemonaction'
import ModalDialogAddCards from './utils/modalDialogAddCards';
import hpValue from './utils/calHp.js'
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

        this.removeMyPokemon = this.removeMyPokemon.bind(this)

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
    removeMyPokemon = async (e)=>{
        e.preventDefault();
        const id = e.currentTarget.id
        let { pokemonMyCard, pokemonCardAll } = this.props
        console.log({pokemonCardAll});
        const selectedCard = pokemonMyCard.find(x=>x.id==id)
        let newCardLits = pokemonCardAll
        console.log({selectedCard});

        // Add this card to pokemon list
        newCardLits.push(selectedCard)
        console.log({newCardLits});
        await this.props.addPokemonList(newCardLits)

        // remove card from my pokemon list
        pokemonMyCard = pokemonMyCard.filter(x=>{
          return x.id != id
        })
        await this.props.removeMyPokemon(pokemonMyCard)

    }
    showDialogAddCards = ()=>{
        this.setState({isOpen: true});
    }
    handleCloseAddCard = ()=>{
        this.setState({isOpen: false});
    }
    render() {
        const { pokemonMyCard } = this.props
        const cards = (!pokemonMyCard)? []: pokemonMyCard
        return (
            <div className="App">
                {
                    pokemonMyCard.map((card,index)=>{
                        const hp = hpValue(card.hp)
                        return (
                            <div key={card.id}>
                                <div className="col-md-6 col-sm-12">
                                    <ReactImageFallback src={card.imageUrl} fallbackImage="../images/blank.gif"/>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    {card.name}
                                    <div>
                                        <label className="col-sm-4 control-label">HP</label>
                                        <div className="col-sm-7">
                                            <ProgressBar variant="warning" now={hp}/>
                                        </div>
                                    </div>
                                    <button type="button" id={card.id} onClick={ this.removeMyPokemon }>X</button>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="btn">
                    <button type="button" onClick={ this.showDialogAddCards }>Add</button>
                </div>

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
