import * as actionTypes from '../actions/Actions';

let initialState = {
    all: {},
    uzCards: [],
    valCards: [],
};


const cardsInfo = (state = initialState, action) => {
    if (action.type === actionTypes.cardInformation) {
        {
            let information = action.info;
            console.log("Action info -------", action.info);
            let uzCards = [];
            let valCards = [];
            if (information.allCards) {
                for (let i = 0; i < information.allCards.card_list.length; i++) {
                    let cards = information.allCards.card_list[i];
                    if (cards.card_type === "SV" || cards.card_type==='GL') {
                        cards["active"] = true;
                        uzCards.push(cards);
                    } else {
                        cards["active"] = false;
                        valCards.push(cards);
                    }
                }
            }
            if (valCards.length > 0) {
                valCards[0].active = true;
            }
            console.log("uz cards -------------->",  uzCards);
            console.log("foregn cards -------------->",  valCards);

            return ({
                ...state,
                ...action.info,
                uzCards,
                valCards
            })
        }
    }
    return state;
};
export default cardsInfo



