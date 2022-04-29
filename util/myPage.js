'use strict';

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);

let page = <div>
    <UserComponent/>
    <TablesContainer/>
    </div>

root.render(page)
