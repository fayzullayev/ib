import React, {Component} from 'react';
import Api from './api';
import Typography from "@material-ui/core/Typography";

class SetTimer extends Component {
    api = new Api();

    constructor(props) {
        super(props);
        this.state = {
            timerMinutes: null,
            timerSeconds: null,
            r: false
        }
    }

    componentDidMount() {
        this.updateTimer();
        this.timer = setInterval(() => {
            if (this.state.timerMinutes === 0 && this.state.timerSeconds === 0) {
                this.setState({
                    r: true
                })
            } else if (this.state.timerSeconds === 0) {
                this.setState({
                    ...this.state,
                    timerMinutes: this.state.timerMinutes - 1,
                    timerSeconds: 59
                })
            } else {
                this.setState({
                    ...this.state,
                    timerSeconds: this.state.timerSeconds - 1
                })
            }
        }, 1000)
    }

    updateTimer = () => {
        const minute = this.props.minutes;
        const second = this.props.seconds;
        this.setState({
            timerMinutes: minute,
            timerSeconds: second,
        })
    };

    render() {
        const {path} = this.props;
        const {refresh,inner} = this.props;
        const {timerMinutes, timerSeconds} = this.state;

        if (this.state.r) {
            clearInterval(this.timer);
            if ({refresh}) {
                let reqKillSession = {
                    request: "sign_out"
                };
                this.api.SetAjax(reqKillSession).then(data => {
                    window.location.href = "/ib_web/ib";
                });
            }
        }

        const element = inner ?  <span style={{display: "inline-block", marginLeft: 45}}>
                <span style={{
                    color: "white",
                    padding: "1px",
                    borderRadius: "8px"
                }}>
                    {timerMinutes < 10 ? "0" + timerMinutes : timerMinutes} : {timerSeconds < 10 ? "0" + timerSeconds : timerSeconds}
                </span>
            </span> :   <div>
            <Typography variant="subtitle2" style = {{
                color:"#25265E",
                padding:"1px",
                borderRadius:"8px"
            }}>
                {timerMinutes < 10 ? "0" + timerMinutes : timerMinutes} : {timerSeconds < 10 ? "0" + timerSeconds : timerSeconds}
            </Typography>
        </div>;
        return (
            <React.Fragment>
                {
                    element
                }
            </React.Fragment>
        )
    }
}

export default SetTimer