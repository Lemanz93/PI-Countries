import { Home, Landing, Detail, Form } from "./views"

import { BrowserRouter, Route, } from "react-router-dom"


function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <Route exact path='/' component={Landing}/>
      <Route path = '/home' component={Home}/>
      <Route path = '/detail/:id' component={Detail}/>
      <Route path = '/form' component={Form}/>
        
    </div>
    </BrowserRouter>
  );
}

export default App;
