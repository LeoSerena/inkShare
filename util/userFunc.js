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

    componentDidMount(){
        $.ajax({
            type : 'GET',
            url : 'getUser',
            success : (data) => {
                console.log(data)
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
        </div>)
    }

}