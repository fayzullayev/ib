import React from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import card from "./assets/card8.png";
import './cards-list.css'
import * as accounting from "accounting";


const style = {
    menuItem: {
        height: "50px",
        paddingTop: '20px',
        margin: '10px',
        borderRadius: '4px'
    }
};

class CardsList extends React.Component {
    state = {
        current: "",
        labelWidth: 0
    };

    componentDidMount() {
        const { cardNumber } = this.props;
        if (cardNumber === '' || cardNumber === undefined) {
            const idx = this.props.data.findIndex((item) => item.is_default === "Y");
            if (idx >= 0) {
                const currentCard = this.props.data[idx].card_number;
                this.setState({ current: currentCard });
            } else {
                const currentCard = this.props.data[0].card_number;
                this.setState({ current: currentCard });
            }
        } else this.setState({ current: cardNumber })
    }

    componentDidUpdate(prevProps, prevState) {
        const { cardNumber } = this.props;
        if (this.props.data !== prevProps.data) {
            if (cardNumber === '' || cardNumber === undefined) {
                const idx = this.props.data.findIndex((item) => item.is_default === "Y");
                if (idx >= 0) {
                    const currentCard = this.props.data[idx].card_number;
                    this.setState({ current: currentCard });
                } else {
                    const currentCard = this.props.data[0].card_number;
                    this.setState({ current: currentCard });
                }
            } else this.setState({ current: cardNumber })
        }
    }


    handleChange = (event) => {
        this.setState({ current: event.target.value });
        this.props.cardHandler(event.target.value);
    };

    render() {
        const { data } = this.props;
        const cardItems = data.map((item) => {
            return (
                <MenuItem style={style.menuItem} key={item.card_number} ref={item.currency_char} value={item.card_number} >
                    <div>
                        <div className="cards-cards">
                            <img src={card} className='cards-cards-image' style={{ display: "block" }} />
                            <div className="cards-cards-info">
                                <p className="cards-cards-name">{item.card_name}</p>
                                <p className="cards-cards-value">{accounting.formatMoney(item.balance,"","2"," ",".") +" "+ item.currency_char}</p>
                            </div>
                        </div>
                    </div>
                </MenuItem>
            )
        });

        return (
            <form autoComplete="off" style={{ marginTop: "10px" }}>
                <FormControl variant="outlined" style={{ width: '100%' }}>
                    <Select
                        value={this.state.current}
                        onChange={this.handleChange}
                        input={
                            <OutlinedInput
                                labelWidth={this.state.labelWidth}
                                name="age"
                                id="outlined-age-simple"
                                className='outlined-inputss'
                            />
                        }
                    >
                        {cardItems}
                    </Select>
                </FormControl>
            </form>
        );
    }
}

export default CardsList;
