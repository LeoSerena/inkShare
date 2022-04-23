'use strict';

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);

let tableContainer = <TablesContainer/>


let container = <div>
    {tableContainer}
</div>

root.render(container)