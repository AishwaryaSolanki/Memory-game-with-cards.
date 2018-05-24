import React, { Component } from 'react';
import './App.css';
import Card from './Card.js';
import Navbar from './navBar';
import shuffle from 'shuffle-array';

//3 states my card can currently be
const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
};

//directly exporting the class
export default class MemoryGame extends Component {
  constructor(props) {
    super(props);
    
        // The cards that we will use for our state.
    let cards = [
      {id: 0, cardState: CardState.HIDING, backgroundColor: 'red'},
      {id: 1, cardState: CardState.HIDING, backgroundColor: 'red'},
      {id: 2, cardState: CardState.HIDING, backgroundColor: 'navy'},
      {id: 3, cardState: CardState.HIDING, backgroundColor: 'navy'},
      {id: 4, cardState: CardState.HIDING, backgroundColor: 'green'},
      {id: 5, cardState: CardState.HIDING, backgroundColor: 'green'},
      {id: 6, cardState: CardState.HIDING, backgroundColor: 'yellow'},
      {id: 7, cardState: CardState.HIDING, backgroundColor: 'yellow'},
      {id: 8, cardState: CardState.HIDING, backgroundColor: 'black'},
      {id: 9, cardState: CardState.HIDING, backgroundColor: 'black'},
      {id: 10, cardState: CardState.HIDING, backgroundColor: 'purple'},
      {id: 11, cardState: CardState.HIDING, backgroundColor: 'purple'},
      {id: 12, cardState: CardState.HIDING, backgroundColor: 'pink'},
      {id: 13, cardState: CardState.HIDING, backgroundColor: 'pink'},
      {id: 14, cardState: CardState.HIDING, backgroundColor: 'lightskyblue'},
      {id: 15, cardState: CardState.HIDING, backgroundColor: 'lightskyblue'}
    ];
    //shuffle up the above-array dependency
    cards = shuffle(cards);
    this.state = {cards, noClick: false};
    
    this.handleClick = this.handleClick.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
}

  
  handleNewGame(id){
     let cards = this.state.cards.map(c => ({
       ...c,
       cardState: CardState.HIDING
     }));
     cards = shuffle(cards);
     this.setState({cards});
  }
  
  handleClick(id){
    // this.setState(prevState => {
    //   let cards = prevState.cards.map(c => (
    //     c.id === id ? {
    //       ...c,
    //       cardState: c.cardState === CardState.HIDING ? CardState.MATCHING:
    //                                 CardState.HIDING } : c
    //     ));
    //     return {cards};
    // });
    const mapCardState = (cards, id, newCard) => {
       return cards.map(c => {
         if(id.includes(c.id)){
           return{
             ...c,
             cardState: newCard
           };
         }
         return c;
       });
    };
    
    const foundCard = this.state.cards.find(c => c.id === id);
    if(this.state.noClick || foundCard.cardState !== CardState.HIDING){
      return;
    }
    let noClick = false;
    let cards = mapCardState(this.state.cards, [id], CardState.SHOWING);
    //filter
    const showingCards = cards.filter((c) => c.cardState === CardState.SHOWING);
    const ids = showingCards.map(c => c.id);
    if(showingCards.length ===2 &&
    showingCards[0].backgroundColor === showingCards[1].backgroundColor){
      cards = mapCardState(cards, ids, CardState.MATCHING);
    }
    else if(showingCards.length ===2){
      let hidingCards = mapCardState(cards, ids, CardState.HIDING);
      noClick = true;
      this.setState({cards, noClick}, () => {
        //settimeout for showing cards
        setTimeout(() => {
          this.setState({cards: hidingCards, noClick: false});
        }, 1300);
      });
      return;
    }
    //one unmatched; two cards matching
    this.setState({cards, noClick});
  }
  
  render() {
    //rendering and mapping over cards
    const cards = this.state.cards.map((card) => (
      <Card
        key={card.id}
        //only show the card if it's not hiding
        showing={card.cardState !== CardState.HIDING}
        backgroundColor={card.backgroundColor}
        onClick={() => this.handleClick(card.id)}
      />
    ));

    return (
      <div>
        <Navbar onNewGame={this.handleNewGame}/>
        {cards}
      </div>
    );
  }
}

