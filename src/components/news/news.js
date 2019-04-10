import React, { Component, Fragment } from 'react'
import Api from '../../services/api'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Waiting from '../waiting'
import Error from '../error'
import { withWindowDemensions } from '../helper-style'
import './news.css'
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import GoBack from "../bank_operation/go-back.png";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const ExpansionPanel = withStyles({
  root: {
    border: 'none',
    boxShadow: 'none',
    '&:before': {
      display: 'none'
    }
  },
  expanded: {
    margin: 'auto'
  }
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    margin: 0,
    padding: 0
  },
  content: {
    margin: '24px',
    display: 'block',
    '&$expanded': {
      margin: '24px 24px 0 24px',
      '& ins': {
        textDecoration: 'underline'
      }
    }
  },
  expanded: {
    '&$expandIcon': {
      marginTop: '12px'
    }
  },
  expandIcon: {}
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: '10px 24px 24px 24px',
    textIndent: '20px',
    textAlign: 'justify',
    textJustify: 'inter-word'
  }
}))(MuiExpansionPanelDetails);

const styles = theme => ({
  rightBorder: {
    borderRight: '1px solid #e3e3e3',
    [theme.breakpoints.down('sm')]: {
      border: 'none'
    }
  },
  goBack: {
    textTransform: "capitalize",
    marginBottom: "10px",
  },
  separator: {
    borderTop: '1px solid #e3e3e3',
    width: '90%',
    marginLeft: '5%'
  }
});

class News extends Component {

  api = new Api()

  state = {
    newsData: [],
    expanded: 'panel0',
    waiting: true,
	error: ''
  }

  componentDidMount() {
    const r = {
      request: 'GET_NEWS_LIST',
      message_type: 24
    }

    this.api.SetAjax(r).then(data => {
      if (data.result === '0' && data.msg === '') {
        this.setState({
          newsData: data.news,
          waiting: false
        })
      } else {
		this.setState({
			waiting: false,
			error: data.msg
		})
	  }
    }).catch(error => {
		this.setState({
			waiting: false,
			error
		})
	})
  }

  handleChange = panel => (event, expanded) => this.setState({
    expanded: expanded ? panel : false
  });
  handleBack = () => {
    this.props.history.goBack();
  };

  dateFormat = date => {
    let day = date.substr(0, 2)
    let month = date.substr(3, 2)
    let year = date.substr(6, 4)
    switch (month) {
      case '01': month = 'Янв'; break
      case '02': month = 'Фев'; break
      case '03': month = 'Мар'; break
      case '04': month = 'Апр'; break
      case '05': month = 'Май'; break
      case '06': month = 'Июн'; break
      case '07': month = 'Июл'; break
      case '08': month = 'Авг'; break
      case '09': month = 'Сен'; break
      case '10': month = 'Окт'; break
      case '11': month = 'Ноя'; break
      case '12': month = 'Дек'; break
    }
    return `${day} ${month} ${year}`
  }

  render() {
    const { newsData, expanded, waiting, error } = this.state
    const { isDesktop, classes } = this.props
    let visibleNewsCount = newsData.reduce((count, el) => {
      if (el.is_display === 'Y') return count + 1
      else return count
    }, 0)
    visibleNewsCount = Math.ceil(visibleNewsCount / 2)

    const shallowCopy = [...newsData]
    //shallowCopy.reverse()
    const secondColumn = []
    const firstColumn = shallowCopy.map((currElement, index) => {
      if (currElement.is_display !== 'Y') return false
      const el = <Fragment key={index}>
        <ExpansionPanel expanded={expanded === `panel${index}`} onChange={this.handleChange(`panel${index}`)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className="news-item">
              <div className="news-item-header">
                <ins className="news-item-header-label">{currElement.title}</ins>
                <span className="news-item-header-date">{this.dateFormat(currElement.date)}</span>
              </div>
              
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>{currElement.content}</div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {!isDesktop && index === (shallowCopy.length - 1) ? null :
          <div className={classes.separator}></div>}
      </Fragment>
      if (index >= visibleNewsCount) {
        secondColumn.push(el)
        return false
      } else return el
    })

    if (waiting) return <Waiting />

	if (error != '') return <Error text={error} />

    return (
        <div>
          <Button className={`${classes.goBack}`} onClick={this.handleBack}>
            <ListItemIcon style={{marginRight: 0}}><img src={GoBack} alt="goBack"/></ListItemIcon>
            <ListItemText
                primary={
                  <Typography variant="inherit">
                    Назад
                  </Typography>
                }/>
          </Button>
        <div className="news-container">
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.rightBorder}>
          {firstColumn}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          {secondColumn}
        </Grid>
      </Grid>
    </div>
        </div>)
  }
}

export default withStyles(styles)(withWindowDemensions(News))