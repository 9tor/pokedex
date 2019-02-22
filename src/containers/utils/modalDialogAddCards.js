import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import ReactImageFallback from 'react-image-fallback';

export default class ModalDialogAddCards extends Component {
    constructor(props) {
        super(props);

        this.onClickAddCard = this.onClickAddCard.bind(this);
    }
    onClickAddCard = (event)=>{
        event.preventDefault();
        this.props.onSubmit(event.currentTarget.id);
    }

    render() {

        const { props, isOpen, isClose, onSubmit } = this.props
        const { pokemonCardAll } = props
        const cards = (!pokemonCardAll)? [] : pokemonCardAll;
        console.log({cards});
        return(
            <div>
                <Modal show={isOpen} onHide={isClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            cards.map((card,index)=>{
                                return (
                                    <div key={card.id} id={card.id}>
                                        <ReactImageFallback src={card.imageUrl} fallbackImage="../images/blank.gif"/>
                                        <Button id={card.id} variant="primary" onClick={this.onClickAddCard}>
                                          Add
                                        </Button>
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
