import './App.css';
import Home from './components/Home';
import {Switch,Route} from 'react-router-dom'
import Edit from './components/Edit';
import Tasks from './components/Tasks';
import Single from './components/Single';

function App() {
  return (
    <div className="App">
     <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/alltasks" exact component={Tasks} />
      <Route path="/edit/:id" component={Edit} />
      <Route path="/search-result/one/:id" component={Single} />
     </Switch>
    </div>
  );
}

export default App;
