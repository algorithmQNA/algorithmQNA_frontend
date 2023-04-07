import './App.css'
import SelectArea from "./component/DropDown/SelectArea";
import {useState} from "react";
import {Link} from "react-router-dom";

function App() {
    const [state,setState] = useState('1')
    const test = (value:string) =>{
        setState(value)
    }
  return (
      <div className="App w-[500px]">
          <SelectArea event={test}>
              <option value={'1'}>옵션1</option>
              <option value={'2'}>옵션2</option>
              <option value={'3'}>옵션3</option>
              <option value={'4'}>옵션4</option>
              <option value={'5'}>옵션5</option>
          </SelectArea>
      </div>
  );
}
export default App;
