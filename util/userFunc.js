'use strict';

class Friend extends React.Component {
    constructor(props){
        super(props)

        this.handleDecline = this.handleDecline.bind(this)
        this.handleAccept = this.handleAccept.bind(this)

        this.handleDeleteFriend = this.handleDeleteFriend.bind(this)
    }

    handleAccept(e){
        e.preventDefault()
        this.handleResponse('accept')
    }
    handleDecline(e){
        e.preventDefault()
        this.handleResponse('decline')
    }
    handleResponse(response){
        $.ajax({
            type : 'POST',
            url : 'respondFriend',
            data : {
                friend_id : this.props.friend_id,
                response : response
            },
            success : () => window.location.reload()
        })

    }

    handleDeleteFriend(e){
        e.preventDefault()
        $.ajax({
            type : 'POST',
            url : 'removeFriend',
            data : {friend_id : this.props.friend_id},
            success : () => window.location.reload()
        })
    }

    render(){
        return (
            <div>
                <p>{this.props.friend_username}</p>
                {this.props.type=='pending' && <div>
                    <button onClick={this.handleAccept}>accept</button>
                    <button onClick={this.handleDecline}>decline</button></div>}
                {this.props.type=='friend' && <button onClick={this.handleDeleteFriend}>DEL</button>}
            </div>
        )
    }

}

class UserComponent extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            user : {
                _id : '',
                username : 'username',
                email : 'email',
                friend_list : [],
                friend_request_sent : [],
                friend_request_pending : []
            },
            friend : ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleFriendRequestSubmit = this.handleFriendRequestSubmit.bind(this)
    }

    handleChange(e){ this.setState({[e.target.name] : e.target.value}) }

    handleFriendRequestSubmit(e){
        e.preventDefault()
        // Verify friend not alread in the friend list or requests list
        $.ajax({
            type : 'POST',
            url : 'addFriend',
            data : {friend_credential : this.state.friend},
            success : (data) => {
                // console.log(data)
                if(data=='success'){
                    alert('friend request sent')
                    window.location.reload()
                }else{
                    alert(data)
                }
            }
        })
    }

    handleLogOut(e){
        e.preventDefault()
        $.ajax({
            type : 'GET',
            url : 'logout',
            success : (data) => {
                if(data=='success'){
                    alert('sucessfuly logged out')
                    window.location.href = 'homepage'
                }
            },
            error : (err) => console.log(err)
        })
    }

    componentDidMount(){
        $.ajax({
            type : 'GET',
            url : 'getUser',
            success : (data) => {
                if(data){
                    this.setState({user : data})
                }
            }
        })
    }

    render(){
        return (<div>
            <p>{this.state.user.username}</p>
            <p>{this.state.user.email}</p>
            <div>
                friends:
                {this.state.user.friend_list.map(element => 
                <Friend user_id={this.state._id} friend_username={element.username} friend_id={element._id} type='friend' key={element._id}/>)}
            </div>
            REQUESTS
            <div>
                pending:
                {this.state.user.friend_request_pending.map(element => 
                <Friend user_id={this.state._id} friend_username={element.username} friend_id={element._id} type='pending' key={element._id}/>)}
            </div>
            <div>
                sent:
                {this.state.user.friend_request_sent.map(element => 
                <Friend user_id={this.state._id} friend_username={element.username} friend_id={element._id} type='request'/>)}
            </div>
            <form onSubmit={this.handleFriendRequestSubmit}>
                <Input withLabel={true} name='friend' inputNameDisplay = 'add friend:' value={this.state.value} handleChange={this.handleChange}/>
                <input type="submit" value="add" />
            </form>
            <div>
                <button onClick={this.handleLogOut}>log out</button>
            </div>
        </div>)
    }

}

class RightHeader extends React.Component {
    constructor(props){
        super(props)
        this.state = { logged : this.props.logged }
    }

    render(){
        return this.state.logged ? <UserComponent/> : <RegisterLogin/>
    }
}

class RegisterLogin extends React.Component {
    constructor(props){
        super(props)

        this.state = { toggle : false}

        this.handleLogin = this.handleLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleRegister(e){
        e.preventDefault()
        window.location.href = '/register'
    }

    handleLogin(e){
        e.preventDefault()
        this.setState({ toggle : true })
    }


    render() {
        const toggle = this.state.toggle
        return (toggle
                ?<LoginForm/>
                :<div>
                    <button onClick={this.handleLogin}>Login</button>
                     <button onClick={this.handleRegister}>Register</button>
                </div>
                 
        )
    }
}

class LoginForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            credentials : '',
            password : '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {this.setState({[event.target.name] : event.target.value})}

    handleSubmit(event) {
        event.preventDefault()
        let data = this.state
        $.ajax({
            type : 'POST',
            url : '/login',
            data : {
                credentials : this.state.credentials,
                password : this.state.password
            },
            success : () => window.location.reload(),
            error : (err) => alert(err)
        })
    }

    render(){
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

