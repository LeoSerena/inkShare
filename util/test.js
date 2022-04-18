'use strict';

class Input extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <label>
                {this.props.inputNameDisplay}: 
                <input type = 'text' name = {this.props.name} value = {this.props.value} onChange = {this.props.handleChange}/>
            </label>
        )
    }
}

class LoginForm extends React.Component {
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


    handleChange(event) {
        this.setState({[event.target.name] : event.target.value})
    }

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
                        success : () => window.location.href = '/homepage',
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
                    <Input name = {key} inputNameDisplay = {key} value = {this.state[key]} handleChange = {this.handleChange}/>
                ))}
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

class Row extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        if(this.props.isheader){
            return <tr>{this.props.list.map(e => 
                <th onClick={(() => this.props.sortFunc(e))}>{e}</th>
            )}</tr>
        } else{
            return <tr>{this.props.list.map(elem => <td>{elem}</td>)}</tr>
        }

    }
}

class Table extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            list : [],
            headers : []
        }

        this.handleSortClick = this.handleSortClick.bind(this)
    }

    componentDidMount(){
        $.ajax({
            type : 'GET',
            url : '/private/getBooks',
            success : (data) => {
                if(data['length'] == 0){
                    this.setState({
                        list : [],
                        headers : []
                    })
                }else{
                    let headers = Object.keys(data[0])
                    headers.shift()
            
                    this.setState({
                        list : data,
                        headers : headers
                    })
                }
            }
        })
    }
    componentWillUnmount(){}

    // Here we KNOW the "this" that will be called will be the Table and not the Row when executed on the header
    // that is in the Row because we BINDED it with the "this.handleSortClick = this.handleSortClick.bind(this)" line
    // It is thus safe to pass the function below
    handleSortClick(byValue){ 
        this.setState({ list : this.state.list.sort((x,y) => x[byValue] > y[byValue] ? 1 : -1) }) 
    }

    render(){
        return (<table>
            <Row list={this.state.headers} isheader={true} sortFunc={this.handleSortClick}/>
            {this.state.list.map(
                row => <Row list={this.state.headers.map(h => row[h])} isheader={false} key = {Row.id}/>
            )}
        </table>)
    }
}

class Clock extends React.Component {

    constructor(props){
        super(props)
        this.state = {date : new Date()}
    }

    componentDidMount(){
        this.timer = setInterval( () => this.tick(), 1000)
    }

    componentWillUnmount(){
        clearInterval(this.timer)
    }

    tick() {
        this.setState({
            date : new Date()
        })
    }

    render(){
        return (<div>It is {this.state.date.toLocaleTimeString()}</div>)
    }
}


const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);

let clock = <Clock/>

let table = <Table/>

let loginForm = <LoginForm/>

let container = <div>
    {clock}
    {table}
    {loginForm}
</div>




root.render(container)