import {
    get,
    handle_http_errors,
    postData,
    showResponse,
} from "../../utils/fetchUtils";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { throttle } from "lodash/function";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const LoginModal = ({
    open,
    password,
    username,
    handleClose,
    setPassword,
    setUsername,
    login,
}) => (
    <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Moderator login</DialogTitle>
        <form
            onSubmit={(e) => {
                e.preventDefault();
                login();
            }}
        >
            <DialogContent>
                <Grid container spacing={1}>
                    <Grid item>
                        <TextField
                            autoFocus
                            size="small"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            label="Username"
                            variant="standard"
                        />

                        <TextField
                            size="small"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            inputProps={{ type: "password" }}
                            variant="standard"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    cancel
                </Button>
                <Button type="submit" color="primary">
                    login
                </Button>
            </DialogActions>
        </form>
    </Dialog>
);

class LoginBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            open: false,
            isLoggedIn: false,
            interval: null,
        };

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.isLoggedIn = this.isLoggedIn.bind(this);
    }

    componentDidMount() {
        const f = throttle(this.isLoggedIn, 1000 * 55);
        this.isLoggedIn();
        this.setState({
            interval: setInterval(f, 1000 * 60),
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    isLoggedIn() {
        return get("is_logged_in")
            .then((response) => response.json())
            .then((res) => this.setState({ isLoggedIn: res.result.authenticated }))
            .catch(handle_http_errors);
    }

    login() {
        return postData(`${process.env.REACT_APP_API_URL}login`, {
            username: this.state.username,
            password: this.state.password,
        })
            .then((res) => showResponse(res, `login ${this.state.username}`, true))
            .then((data) => {
                if (data.failed === false) {
                    this.setState({ isLoggedIn: true, open: false, password: "" });
                }
            })
            .catch(handle_http_errors);
    }

    logout() {
        return get("logout")
            .then(this.setState({ isLoggedIn: false }))
            .catch(handle_http_errors);
    }

    render() {
        const { open, username, password, isLoggedIn } = this.state;

        return (
            <React.Fragment>
                <Button
                    variant="button"
                    color="inherit"
                    component={RouterLink}
                    onClick={() =>
                        isLoggedIn === true ? this.logout() : this.setState({ open: true })
                    }
                >
                    {isLoggedIn === true ? "Logout" : "Login"}
                </Button>
                <LoginModal
                    open={open}
                    handleClose={() => this.setState({ open: false })}
                    login={this.login}
                    password={password}
                    setPassword={(password) => this.setState({ password: password })}
                    username={username}
                    setUsername={(username) => this.setState({ username: username })}
                />
            </React.Fragment>
        );
    }
}

export default LoginBox;