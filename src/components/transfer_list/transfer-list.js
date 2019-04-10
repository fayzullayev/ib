import React, { Component } from 'react'
import Api from "../../services/api"
import Warning from "../warning"
import Waiting from "../waiting"
//import Data from "./list"
import "./transfer-list.css"
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

class TransferList extends Component {
    api = new Api();

    state = {
        warning : false,
        waiting : false,
        text : null,
        data : null,
        Data : []
    };

   componentDidMount() {

        const request = {
            request : "GET_BANK_TRANSFER_LIST",
            message_type :  72
        };

        this.api.SetAjax(request).then(data=>{
            console.log("transfeList -------------- ", JSON.stringify(data));
            if(data.result === "0"){
                if(data.client_requests.length === 0){
                    this.setState({
                        warning : true,
                        waiting : false,
                        text : "У вас нет список операции"
                    })
                }else{
                    this.setState({
                        warning : false,
                        waiting : false,
                        Data : data,
                    })
                }
            }else {
                this.setState({
                    warning : true,
                    waiting : false,
                    text : data.msg
                })
            }
        })
    }

    render () {
        const {warning,waiting,text,Data} = this.state;
        const {classes} = this.props;
        if(waiting){
            return <Waiting/>
        }
        if(warning){
            return <Warning url="/main" text={text}/>
        }
        const list = Data.length > 0 ? Data.client_requests.map(data=>{

            return (
                <TableRow key={data.created_date} >
                    <TableCell>{data.fio}</TableCell>
                    <TableCell>{data.card_number}</TableCell>
                    <TableCell>{data.country}</TableCell>
                    <TableCell className={classes.cell}><span>{data.created_date}</span></TableCell>
                    <TableCell>{data.remittance_type_name}</TableCell>
                    <TableCell>{data.state_name}</TableCell>
                    <TableCell>{data.message}</TableCell>
                </TableRow>
            )
        }) : null;
        return (
            <div className="transfer-list">
                <div className={`${classes.root} transfer-list-list1`}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Имя</TableCell>
                                    <TableCell>Номер карты</TableCell>
                                    <TableCell>Страна</TableCell>
                                    <TableCell>Дата создания</TableCell>
                                    <TableCell>Вид услуги</TableCell>
                                    <TableCell>Состояние</TableCell>
                                    <TableCell>Причина</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list}
                            </TableBody>
                        </Table>
                </div>
                <div className="transfer-list-list2">

                </div>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    cell : {
        color : "red !important",
    }
});

TransferList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransferList);