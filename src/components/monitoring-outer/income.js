import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Divider from "@material-ui/core/Divider";
import * as accounting from "accounting";
import Dialog from "@material-ui/core/Dialog";
import theme from "../../theme/theme";
import AABIcon from "../../assets/logo.png";
import Grid from "@material-ui/core/Grid";
import './monitoring.css';
import DialogContent from "@material-ui/core/DialogContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Translations from "../../translations/translations";
import Cancel from '@material-ui/icons/Cancel';
import Print from '@material-ui/icons/Print';


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 2,
        overflowX: 'auto',
    },
    table: {
        minWidth: 0,
    },
    cursorPointer: {
        cursor: "pointer",

    },
    firstColumn: {
        fontSize: "14px",
        color: "#4a4a4a",
        fontWeight: 500
    },
    secondColumn: {
        fontSize: "14px",
        fontWeight: 600
    },
    thirdColumn: {
        fontSize: "14px",
        fontWeight: 600,
        color: "#7ed321"
    },
    merchantName: {
        color: "#ffc004",
        fontSize: "16px",
        fontWeight: 700,
    },
    checkPayment: {
        fontSize: "18px",
        color: "#353a41"
    }
});

class Income extends Component {
    state = {
        dialogOpen: false,
        dataForDialog: null,
        checkData: null
    };
    handler = (rowData) => {
        this.setState({
            ...this.state,
            dataForDialog: rowData,
            dialogOpen: true

        })
    };
    handleClose = () => {
        this.setState({
            ...this.state,
            dialogOpen: false
        })
    };
    handlePrint = () => {
        window.print();
    };

    render() {
        console.log("Income js ============>");
        let iterator = 0;
        const {classes, incomeData, historyType, lastPage, currentLanguage} = this.props;
        let lan = Translations.Monitoring.IncomeOutcome;
        let drawIncome;
        console.log("incomeData", incomeData);
        if (historyType === "uz") {
            drawIncome = incomeData.map(row => {
                return <TableRow onClick={() => this.handler(row)} title={lan.showCheck[currentLanguage]}
                                 key={iterator++}
                                 className={classes.cursorPointer}>
                    <TableCell className={`${classes.firstColumn}  font-size-10`}>{row.merchantName}</TableCell>
                    <TableCell align="right"
                               className={`${classes.secondColumn} font-size-8`}>{String(row.udate).substr(6, 2) + "."
                    + String(row.udate).substr(4, 2) + "."
                    + String(row.udate).substr(0, 4)}</TableCell>
                    <TableCell
                        className={`${classes.thirdColumn}  font-size-8`}>+{accounting.formatMoney((row.reqamt) / 100)} {lan.UZS[currentLanguage]}</TableCell>
                </TableRow>
            })

        } else {
            drawIncome = incomeData.map(row => {
                return <TableRow key={iterator++}>
                    <TableCell className={classes.firstColumn}>{row.abvr_name}</TableCell>
                    <TableCell align="right" className={classes.secondColumn}>{row.oper_date}</TableCell>
                    <TableCell
                        className={classes.thirdColumn}>+{accounting.formatMoney(row.amount)} {row.accnt_ccy}</TableCell>
                </TableRow>
            })
        }

        let drawDialog;
        if (this.state.dialogOpen) {
            drawDialog = <Dialog
                open={this.state.dialogOpen}
                aria-labelledby="alert-dialog-title"
                onClose={this.handleClose}
            >
                <DialogContent>
                    <Grid container justify="center" alignContent="center" alignItems="center"
                          style={{
                              marginTop: theme.spacing.unit
                          }}>
                        <Avatar alt="  Asia Alliance Bank" src={AABIcon} className={classes.avatar}/>
                        <Typography component="h3" variant="h6" style={{marginLeft: "5px"}} color="primary"
                                    className="bank-name ">
                            Asia Alliance Bank
                        </Typography>
                    </Grid>

                    <Grid container justify="center">
                        <Typography
                            className={`${classes.checkPayment} check-payment`}>
                            {lan.checkPayment[currentLanguage]} {/*Чек платежа*/}
                        </Typography>
                    </Grid>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    className={`${classes.secondColumn} ${classes.merchantName} font-size-8 merchant-name`}>{this.state.dataForDialog.merchantName}</TableCell>
                                <TableCell
                                    className={`${classes.thirdColumn} ${classes.secondColumn} font-size-8`}>+{accounting.formatMoney(this.state.dataForDialog.reqamt / 100)} {lan.UZS[currentLanguage]}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell className={`${classes.secondColumn} font-size-8`}>
                                    {lan.branchOperation[currentLanguage]} {/*Пункт обслуживание */}
                                </TableCell>
                                <TableCell className={`${classes.secondColumn} font-size-8`}
                                           align="right">{this.state.dataForDialog.merchant}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={`${classes.secondColumn} font-size-8`}>
                                    {lan.terminal[currentLanguage]} {/*Терминал */}
                                </TableCell>
                                <TableCell className={`${classes.secondColumn} font-size-8`}
                                           align="right">{this.state.dataForDialog.terminal}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={`${classes.secondColumn} font-size-8`}>
                                    {lan.transactionNo[currentLanguage]} {/*Номер транзакции */}
                                </TableCell>
                                <TableCell className={`${classes.secondColumn} font-size-8`}
                                           align="right">{this.state.dataForDialog.utrnno}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={`${classes.secondColumn} font-size-8`}>
                                    {lan.createTime[currentLanguage]} {/*Время создная */}
                                </TableCell>
                                <TableCell className={`${classes.secondColumn} font-size-8`} align="right">
                                    {String(this.state.dataForDialog.udate).substr(6, 2) + "."
                                    + String(this.state.dataForDialog.udate).substr(4, 2) + "."
                                    + String(this.state.dataForDialog.udate).substr(0, 4)}

                                    {"   " + ((String(this.state.dataForDialog.utime).length === 5 ?
                                        ("0" + this.state.dataForDialog.utime) : "" +
                                        this.state.dataForDialog.utime).substr(0, 2) + ":" +
                                        (String(this.state.dataForDialog.utime).length === 5 ?
                                            ("0" + this.state.dataForDialog.utime) : "" +
                                            this.state.dataForDialog.utime).substr(2, 2) + ":" +
                                        (String(this.state.dataForDialog.utime).length === 5 ?
                                            ("0" + this.state.dataForDialog.utime) : "" +
                                            this.state.dataForDialog.utime).substr(4, 2))}

                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={`${classes.secondColumn} font-size-8`}>
                                    {lan.payTime[currentLanguage]} {/*Время оплаты */}
                                </TableCell>
                                <TableCell className={`${classes.secondColumn} font-size-8`}
                                           align="right">{String(this.state.dataForDialog.udate).substr(6, 2) + "."
                                + String(this.state.dataForDialog.udate).substr(4, 2) + "."
                                + String(this.state.dataForDialog.udate).substr(0, 4)}
                                    {"   " + ((String(this.state.dataForDialog.utime).length === 5 ?
                                        ("0" + this.state.dataForDialog.utime) : "" +
                                        this.state.dataForDialog.utime).substr(0, 2) + ":" +
                                        (String(this.state.dataForDialog.utime).length === 5 ?
                                            ("0" + this.state.dataForDialog.utime) : "" +
                                            this.state.dataForDialog.utime).substr(2, 2) + ":" +
                                        (String(this.state.dataForDialog.utime).length === 5 ?
                                            ("0" + this.state.dataForDialog.utime) : "" +
                                            this.state.dataForDialog.utime).substr(4, 2))}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={`${classes.secondColumn} font-size-8`}>
                                    {lan.card[currentLanguage]} {/*Карта*/}
                                </TableCell>
                                <TableCell align="right"
                                           className={`${classes.secondColumn} font-size-8`}>{this.state.dataForDialog.hpan}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={`${classes.secondColumn} font-size-8`}>
                                    {lan.amount[currentLanguage]} {/*Сумма платежа */}
                                </TableCell>
                                <TableCell className={`${classes.thirdColumn} font-size-8`}
                                           align="right">+{accounting.formatMoney(this.state.dataForDialog.reqamt / 100)} {lan.UZS[currentLanguage]}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Grid container justify="space-around" style={{marginTop: "8px"}} id='printButtonParent'>
                        <Grid item direction="column" justify="center" className="check_icon"
                              onClick={this.handlePrint}>
                            <div style={{display: 'flex', justifyContent: "center"}}>
                                <Print style={{width: "32px", height: "32px", color: "#3C3F41"}}
                                       className="check_icon2"/>
                            </div>
                            <Typography className="check_icon3">
                                {lan.print[currentLanguage]}{/*Print*/}
                            </Typography>
                        </Grid>
                        <Grid item className="check_icon" onClick={this.handleClose}>
                            <div style={{display: 'flex', justifyContent: "center"}}>
                                <Cancel style={{width: "32px", height: "32px", color: "#3C3F41"}}
                                        className="check_icon2"/>
                            </div>
                            <Typography className="check_icon3">
                                {lan.close[currentLanguage]}{/*Close*/}
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

        }

        return (
            <div className={classes.root}>
                <Divider style={{width: "100%"}}/>
                <div style={(historyType === "uz" && !lastPage) ? {height: '58vh'} : {height: '68vh'}}>
                    <Table className={classes.table}>
                        <TableBody>
                            {drawIncome}
                        </TableBody>
                    </Table>
                </div>
                {drawDialog}
            </div>
        )
    }
}

Income.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Income)