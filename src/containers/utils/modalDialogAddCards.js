import React, { Component } from 'react'
import { Modal, Button, ProgressBar } from 'react-bootstrap'
import ReactImageFallback from 'react-image-fallback';
import hpValue from './calHp.js'

export default class ModalDialogAddCards extends Component {
    constructor(props) {
        super(props);

        this.onClickAddCard = this.onClickAddCard.bind(this)
        this.searchPokemon = this.searchPokemon.bind(this)
    }
    searchPokemon = async (event)=>{
        const { props } = this.props
        const value = event.target.value
        console.log({value});
        const params = {
            name: value
        }
        await props.getPokemon(params)
    }
    onClickAddCard = async (event)=>{
        event.preventDefault()
        const id = event.currentTarget.id
        const { props } = this.props
        let { pokemonMyCard, pokemonCardAll } = props

        // Add new card to my pokemon list
        const selectedCard = pokemonCardAll.find(x=>x.id==id)
        let newcard = pokemonMyCard
        newcard.push(selectedCard)
        await props.addMyPokemon(newcard)

        // remove new card from pokemon list
        pokemonCardAll = pokemonCardAll.filter(x=>{
          return x.id != id
        })
        await props.removePokemonList(pokemonCardAll)
    }

    render() {

        const { props, isOpen, isClose, onSubmit } = this.props
        const { pokemonCardAll } = props
        const cards = (!pokemonCardAll)? [] : pokemonCardAll;
        return(
            <div>
                <Modal show={isOpen} onHide={isClose} dialogClassName="modal-90w">
                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" onChange={this.searchPokemon}/>
                        {
                            cards.map((card,index)=>{
                                const hp = hpValue(card.hp)
                                return (
                                    <div key={card.id} id={card.id}>
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
                                            <Button id={card.id} variant="primary" onClick={this.onClickAddCard}>
                                                Add
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={isClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
