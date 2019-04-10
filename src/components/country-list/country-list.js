import React from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput/index';
import MenuItem from '@material-ui/core/MenuItem/index';
import FormControl from '@material-ui/core/FormControl/index';
import Select from '@material-ui/core/Select/index';
import './country-list.css';


const style = {
    menuItems: {
    }
};

class CountryList extends React.Component {
    state = {
        current: "",
        labelWidth: 0
    };

    componentDidMount() {
        const currentCard = this.props.data[0].country_code;
        this.setState({ current: currentCard });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.data !== prevProps.data) {
                const currentCard = this.props.data[0].country_code;
                this.setState({ current: currentCard });
        }
    }


    handleChange = (event) => {
        this.setState({ current: event.target.value });
        this.props.handler(event.target.value);
    };

    render() {
        const { data } = this.props;
        const cardItems = data.map((item) => {

            return (
                <MenuItem style={style.menuItems} key={item.country_code} ref={item.country_code} value={item.country_code} >
                    <div>
                        <div className="country-cards">
                            <div className="country-cards-info">
                                <p className="country-cards-name">{item.country_name}</p>
                            </div>
                        </div>
                    </div>
                </MenuItem>
            )
        });

        return (
            <form autoComplete="off" style={{ marginTop: "10px"}}>
                <FormControl variant="outlined" style={{ width: '100%' }}>
                    <Select
                        value={this.state.current}
                        onChange={this.handleChange}
                        input={
                            <OutlinedInput
                                labelWidth={this.state.labelWidth}
                                name="age"
                                id="outlined-age-simple"
                                className='outlined-inputssss'
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

export default CountryList;
