
const App = () => {
  const [first, setFirst] = React.useState('');
  const [sec, setSec] = React.useState('');
  const [op, setOp] = React.useState(null);
  const [pop, setPop] = React.useState(null);
  const [sign, setSign] = React.useState('');
  const [input, setInput] = React.useState('');
  const [result, setResult] = React.useState('0');
  const [o, setO] = React.useState('');

  React.useEffect(() => {
    // Update the document title using the browser API
    setInput(first + (op ? op : '') + sec);
  }, [first, op, sec]);
 

 const appendNumber = (value) => {
    if (op === null) {

      if (Number.isInteger(value)) {
        if (value === 0 && (first === '' || first === '0')) {
          //console.log('fired')
          setFirst('0');
        }
        else {
          setFirst(first.toString() + value.toString())
        }
        //setInput(first);}
      }
      else if (value === '.') {
        if (first.includes('.')) {
          setFirst(first);
          //setInput(first);
        }
        else {
          setFirst(first.toString() + '.');
          //setInput(first);
        }
      }
    }
    else if (op !== null && first !== '') {
      //console.log('fire');

      if (Number.isInteger(value)) {
        if (value === 0 && (sec === '' || sec === '0')) {
          //console.log('fired')
          setSec('0');
        }
        else {
          setSec(sec.toString() + value.toString())
        }
        //setInput(sec);
      }
      else if (value === '.') {
        if (sec.includes('.')) {
          setSec(sec);
          //setInput(sec);
        }
        else {
          setSec(sec.toString() + '.');
          // setInput(sec);
        }
      }

    }
  }
  const operation = (val) => {

    setPop(val);
    if (op === null) {
      setOp(val);

      //console.log('operation pop'+pop);

    }
    else if (op !== null) {

      //console.log('previous operation was===='+op);
      //console.log('current is' +val);
      if (op === '*') {
        if (val === '-') {
          setSign('*');
          //console.log('signchanged');
          //setOp(val);

          //setSign('*');
          evaluate();
          //setOp(val);
        }
        setOp(val);
      }
      else if (op === '/') {
        if (val === '-') {
          setSign('/');
          setOp(val);
          evaluate()
        }
        setOp(val);
      }
      else {
        evaluate();
        setOp(val);
      }
      //console.log('operation is==='+op);
      // console.log('oo is'+o);
      //setInput(first+op+sec);
    }

  }
  const evaluate = () => {
    if (first !== '' && sec !== '') {
      console.log('sign is' + sign);
      if ((sign === "*" || sign === '/') && op === '-') {
        console.log(op);
        let res = (eval(first.toString() + sign + op + sec.toString()));
        setResult(res.toString());


        setFirst(res.toString());

        setSec('');
        setSign('');
      }
      else {
        setSign('');
        console.log(first.toString() + op + sec.toString());
        let res = eval(first.toString() + op + sec.toString());

        setResult(res.toString());


        setFirst(res.toString());

        setSec('');


      }
    }
    else if (first !== '' && sec === '') {

      let res = '';
      if (op === '+' || op === '-') {
        // console.log('previous2_op'+pop);
        // console.log('currentop'+op);
        res = eval(first.toString() + op + '0');
        setFirst(res.toString());
        setResult(res.toString());
        //setInput(first+(op ? op : '')+sec);
        setOp(null);

      }
      else if (op === '*' || op === '/') {
        //console.log('previous2op'+pop);
        //console.log('currentop'+op);

        res = eval(first.toString() + op + '1');
        setFirst(res.toString());
        setResult(res.toString());
        setOp(null);
        //setInput(first+(op ? op : '')+sec);
      }

    }
  }
  const clear = () => {
    setResult('0');
    setOp(null);
    setFirst('');
    setSec('');
    setInput(0);
    setO('');
    setSign('');
  }







  return <>
    <div className="calculator-grid">
      <div className="output" >
        <h1 id='display'>{(first !== '') ? first : result}

        </h1>

        <h2 > {first + sign + (op ? op : '') + sec}</h2>




      </div>
      <button className="span-two" id='clear' onClick={() => clear()} >clear</button>
      <button id='divide' onClick={() => [operation('/'), setO('/')]}>÷</button>
      <button id='one' onClick={() => appendNumber(1)}>1</button>
      <button id='two' onClick={() => appendNumber(2)}>2</button>
      <button id='three' onClick={() => appendNumber(3)}>3</button>
      <button id='multiply' onClick={() => [operation('*'), setO('*')]}>X</button>
      <button id='four' onClick={() => appendNumber(4)}>4</button>
      <button id='five' onClick={() => appendNumber(5)}>5</button>
      <button id='six' onClick={() => appendNumber(6)}>6</button>
      <button id='add' onClick={() => [operation('+'), setO('+')]}>+</button>
      <button id='seven' onClick={() => appendNumber(7)}>7</button>
      <button id='eight' onClick={() => appendNumber(8)}>8</button>
      <button id='nine' onClick={() => appendNumber(9)}>9</button>
      <button id='subtract' onClick={() => [operation('-'), setO('-')]}>-</button>
      <button id='decimal' onClick={() => appendNumber('.')}>.</button>
      <button id='zero' onClick={() => appendNumber(0)}>0</button>






      <button className="equal" id='equals' onClick={() => [evaluate(), setOp(null)]} >=</button>
    </div>
  </>






}

const container = document.getElementById('root');


const root = ReactDOM.createRoot(container);
root.render(<App />)

