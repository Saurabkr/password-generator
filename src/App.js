import './App.css';
import { useCallback, useEffect, useState,useRef } from "react"

function App() {
  const [length, setLength] = useState(8);
  const [digit, setDigit] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let passcode = "";

    if(digit){
      str += "0123456789";
    }
    if(char){
      str += "!@#$%^&*-_+=[]{}~`";
    }

    for(let i = 1; i<=length; i++){
      let ch = Math.floor(Math.random()*str.length + 1);
      passcode += str.charAt(ch);
    }
     
    setPassword(passcode);

  },[length, digit, char, setPassword])

  const copyGeneratedPassword = useCallback(()=>{
     passwordRef.current?.select();
     passwordRef.current?.setSelectionRange(0,999);
     window.navigator.clipboard.writeText(password)

  },[password])

  useEffect(()=>{
    passwordGenerator();
  },[length, digit, char, passwordGenerator])


  return (
    <>
       <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
        <button
        onClick={copyGeneratedPassword}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >Copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={digit}
          id="numberInput"
          onChange={() => {
            setDigit((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Digits</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={char}
              id="characterInput"
              onChange={() => {
                  setChar((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
    </>
  );
}

export default App;
