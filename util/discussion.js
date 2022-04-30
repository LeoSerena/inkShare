
class MiddleRightDiscussionPanel extends React.Component {
    constructor(props){
        super(props)

        this.state = {}
    }
}

class DiscussionContainer extends React.Component {
    constructor(props){
        super(props)

        this.state = {}
    }

    render(){
        return (
            <div>
                <LeftDiscussionPanel/>
                <MiddleRightDiscussionPanel/>
            </div>
        )
    }
}
