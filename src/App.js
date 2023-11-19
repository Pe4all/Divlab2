import './App.css';
import CustomInput from './components/CustomInput';

function App() {
  return (
    <div className="App">
      <CustomInput min={-1323400} max={13234000} placeholder='Плейсхолдер' className="customInput"/>
    </div>
  );
}

export default App;
