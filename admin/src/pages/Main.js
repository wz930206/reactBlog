import React from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import AdminIndex from './AdminIndex';
function Main() {
    return (
        <div>
            <Router>
                <Route path="/" exact component={Login} />
                <Route path="/reg" exact component={Register} />
                <Route path="/index/" component={AdminIndex} />
            </Router>
        </div>
    )
}
export default Main