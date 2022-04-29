'use strict';

class RecentDiscussions extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return <div></div>
    }
}

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);

let page = <div>
    <Header/>
    <RightHeader logged={domContainer.getAttribute('logged')}/>
    {/* <LeftNavigation/>
    <Search/>
    <RecentDiscussions/> */}
    </div>

root.render(page)