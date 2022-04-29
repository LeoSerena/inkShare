'use strict';

class RegisterForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username : '',
            password : '',
            passwordConfirm : '',
            email : ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {this.setState({[event.target.name] : event.target.value})}

    handleSubmit(event) {
        event.preventDefault()
        let data = this.state
        if (this.state.password != this.state.passwordConfirm){
            alert('The two given passwords are not the same')
        } else {
            $.ajax({
                type : 'POST',
                url : '/register',
                data : data,
                success : () => {
                    $.ajax({
                        type : 'POST',
                        url : '/login',
                        data : {
                            credentials : this.state.username,
                            password : this.state.password
                        },
                        success : () => {
                            window.location.href = '/homepage'
                        },
                        error : (err) => alert(err)
                    })
                },
                error : (err) => { alert(err.responseText) }
            })
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {Object.keys(this.state).map( key => (
                    <Input withLabel={true} name = {key} inputNameDisplay = {key} value = {this.state[key]} handleChange = {this.handleChange}/>
                ))}
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);


let page = <div>
    <RegisterForm/>
    </div>

root.render(page)