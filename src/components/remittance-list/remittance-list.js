import React from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './remittance-list.css';


const style = {
    menuItem: {
        height: "40px",
        margin: '10px',
    }
};

class RemittanceList extends React.Component {
    state = {
        current: "",
        labelWidth: 0
    };

    componentDidMount() {
        const currentCard = this.props.data[0].remittance_type_id;
        this.setState({ current: currentCard });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.data !== prevProps.data) {
                const currentCard = this.props.data[0].remittance_type_id;
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
          const src=require('./assets/'+item.remittance_image_name+'.jpg');

            return (
                <MenuItem style={style.menuItem} key={item.remittance_type_id} ref={item.remittance_type_id} value={item.remittance_type_id} >
                    <div>
                        <div className="remittance-cards">
                            <img src={src} className='remittance-cards-image' style={{ display: "block" }} />
                            <div className="remittance-cards-info">
                                <p className="remittance-cards-name">{item.remittance_type_name}</p>
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

export default RemittanceList;
