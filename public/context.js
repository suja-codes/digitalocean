const Route       = ReactRouterDOM.Route;
const Link        = ReactRouterDOM.Link;
const HashRouter  = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);

function Card(props){
    const [show, setShow]          = React.useState(true);
    const [status, setStatus]      = React.useState('');
    const [name, setName]          = React.useState('');
    const [email, setEmail]        = React.useState('');
    const [password, setPassword]  = React.useState('');
    const [amount, setAmount]      = React.useState(0);

    // context for tracking current User and logged in status
    const ctx = React.useContext(UserContext);
    // from context being cleared and filled with login user this will be their info
    // currently logged in user
    const user = ctx.user[0];
    var transactionIsWithdraw = ctx.transactionType.withdraw;

    // validation function used in handleCreate
    function validate(field, label) {
      if (!field) {
          setStatus('Error: ' + label);
          setTimeout(() => setStatus(''), 3000);
          alert(`Enter field: ${label}`);
          return false;
      }
      
      // email validation
      if (field === email) {
        // check that email string contains the @ symbol
        if (email.includes('@') === true && email.length > 0) return true;
        else {
          alert("Enter Valid Email");
          return false;
        }
      }
      return true;
    }

    function validateForm() {
      return password.length > 8 && name.length > 0 && email.length > 0;
    }

    function validatePassword() {
      return password.length > 8;
    }

    function clearForm() {
      setName('');
      setEmail('');
      setPassword('');
      setShow(true);
    }

    function handleCreate() {
        if (!validate(name,     'name'))     return;
        if (!validate(email,    'email'))    return;
        if (!validate(password, 'password')) return;

        // check if user email exists
        const findUrl = `/account/find/${email}`;
        (async () => {
          var res = await fetch(findUrl);
          var data = await res.json();
          console.log(data);
          // no matching email found: create
          if (data.length === 0) {
            const url =`/account/create/${name}/${email}/${password}`;
            (async () => {
              var res  = await fetch(url);
              var data = await res.json();
              console.log(data);
            })();
            // Login once created
            (async () => {
              handleLogin();
            })(data);
            setShow(false);
            return;
          }
          // user already exists
          if (data[0].email === email) {
            ctx.user[0].name = null;
            ctx.user[0].email = null;
            ctx.user[0].password = null;
            ctx.user[0].balance = 0;
            ctx.login.isLoggedIn = false;
            setShow(true);
            alert("User already exists, please use another email");
            clearForm();
            return;
          } 
        })();
        console.log(name, email, password);
        
    }

    function handleLogin() {
      if (!validate(email,            'email'))    return;
      if (!validatePassword(password, 'password')) return;
      
      const url =`/account/login/${email}/${password}`;
      (async () => {
        var res  = await fetch(url);
        var userRawData = await res.json();
        if (userRawData.error) {
          alert(JSON.stringify(userRawData));
          clearForm();
          setShow(true);
        }
        else {
          ctx.user.pop();
          ctx.user.push(userRawData);
          ctx.login.isLoggedIn = true;
          setShow(false);
        }
      })();
    }

    function handleTransaction() {
      if (!validate(email,       'email'))    return;
      if (!validate(amount,     'amount'))    return;

      if (email === user.email){
        if (transactionIsWithdraw === true) {
          if (user.balance - amount < 0) {
            alert("Overdraft alert");
            clearForm();
            setShow(true);
          } else {
            var withdrawAmount = Number(amount) * -1;
            const url =`/account/update/${email}/${withdrawAmount}`;
            (async () => {
              var res  = await fetch(url);
              var data = await res.json();
              console.log(data);
              ctx.user[0].balance += withdrawAmount;
              setShow(false);
            })();
          }
        } else if (transactionIsWithdraw === false) {
          const url =`/account/update/${email}/${amount}`;
          (async () => {
            var res  = await fetch(url);
            var data = await res.json();
            console.log(data);
            ctx.user[0].balance += Number(amount);
            setShow(false);
          })();
        }
      } else {
        alert(`Incorrect User input.`);
        clearForm();
      }
    }

    function classes(){
        const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
        const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
        return 'card text-center mb-3 ' + bg + txt;
    }
  
    return (
      <>
      <div className={classes()} style={{maxWidth: "18rem"}}>
          <div className="card-header">{props.header}</div>
          <div className="card-body">
              {props.title && (<h5 className="card-title">{props.title}</h5>)}
              {props.text && (<p className="card-text">{props.text}</p>)}
              {props.body}
              {/* Create Account Card */}
              {props.handle && show ? (
                 <>
                 Name<br/>
                 <input type="input" 
                    className="form-control" 
                    id="name" 
                    placeholder="Enter Name" 
                    value={name} 
                    onChange={e => setName(e.currentTarget.value)} /><br/>
                 Email address<br/>
                 <input type="input" 
                    className="form-control" 
                    id="email" 
                    placeholder="Enter Email" 
                    value={email} 
                    onChange={e => setEmail(e.currentTarget.value)} /><br/>
                 Password<br/>
                 <input type="password" 
                    className="form-control" 
                    id="password" 
                    placeholder="Enter Password (8+ characters)" 
                    value={password} 
                    onChange={e => setPassword(e.currentTarget.value)} /><br/>
                 <button type="submit" 
                    disabled={!validateForm()} 
                    className="btn btn-light" 
                    onClick={handleCreate} >Create Account</button>
                 </>
              ) : (
              props.submitButton && (
                 <>
                  <div className="card text-white text-center bg-success mb-3">
                     <h5>Success</h5>
                  </div>
                  <Link to="/account">
                    <button type="submit" className="btn btn-secondary">{props.submitButton}</button>
                  </Link>
                 </>
              )
              )}
              {props.status && (<div className="alert alert-primary" role="alert" id="'createStatus">Status: {props.status}</div>)}
              {/* Deposit Card */}
              {props.deposit && show ? (
                <>
                Current User: {user.name}<br/>
                Account Balance: {user.balance} <br/><br/>
                Confirm Account Email<br/>
                <input type="input" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br/>
  
                Deposit Amount<br/>
                <input type="number" className="form-control" id="amount" placeholder="Enter Deposit Amount" value={amount} onChange={e => setAmount(e.currentTarget.value)} /><br/>
  
                <button type="submit" className="btn btn-light" onClick={handleTransaction} >Deposit</button>
                </>
              ) : (props.submitButtonDeposit && (
                  <>
                  <div className="card text-white text-center bg-success mb-3">
                    <h5>Successful Deposit</h5>
                    Current User Acount<br/>
                    {user.name}<br/>
                    Balance after deposit: {user.balance}<br/>
                  </div>
                  <button type="submit" className="btn btn-secondary" onClick={clearForm}>Make another Transaction</button>
                  </>
                )
              )}
              {/* Withdraw Card */}
              {props.withdraw && show ? (
                <>
                Current User: {user.name}<br/>
                Account Balance: {user.balance} <br/><br/>
                Confirm Account Email<br/>
                <input type="input" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br/>
                
                Withdrawl Amount<br/>
                <input type="number" className="form-control" id="amount" placeholder="Enter Withdrawl Amount" value={amount} onChange={e => setAmount(e.currentTarget.value)} /><br/>
    
                <button type="submit" className="btn btn-light" onClick={handleTransaction} >Withdrawl</button>
                </>
              ) : (props.submitButtonWithdraw && (
                  <>
                  <div className="card text-white text-center bg-success mb-3">
                    <h5>Successful Withdrawl</h5>
                    Current User Acount<br/>
                    {user.name}<br/>
                    Balance after withdrawl: {user.balance}<br/>
                  </div>
                  <button type="submit" className="btn btn-secondary" onClick={clearForm} >Make another Transaction</button>
                  </>
                  )
              )}
              {/* Login Card */}
              {props.login && show ? (
                <>
                Welcome to verification.<br/>
                {!user.name ? "Please Login..." : `Current Logged In User: ${user.name}`}<br/>
                Confirm Account Email<br/>
                <input type="input" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)}/><br/> 
                Enter Password<br/>
                <input type="password" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)}/><br/>
                <button type="submit" disabled={!validatePassword()} className="btn btn-light" onClick={handleLogin} >Submit for verification</button>
                </>
              ) : (props.submitButtonLogin && (
                <>
                <div className="card text-white text-center bg-success mb-3">
                  <h5>Success</h5>
                  User {user.name} Logged In<br/>
                </div>
                <Link to="/account">
                  <button type="submit" className="btn btn-secondary">Continue to Account</button>
                </Link>
                </>
                )
              )}
              {/* {props.status && (<div className="alert alert-primary" role="alert" id="'createStatus">Status: {props.status}</div>)} */}
              {/* Account Info card */}
              {props.account && (
                <>
                Welcome to your bank account<br/><br/>
                  User : {user.name}<br/>
                  Email address: {user.email}<br/>
                  Your current Balance is: {user.balance}<br/><br/>
                  Select an action from the menu above
                </>
              )}
              
              {/* All Data card */}
              {props.allData && (
              <>
                Name: {props.allData[0]}<br/>
                Email: {props.allData[1]}<br/>
                Password: {props.allData[2]}<br/>
                Balance: {props.allData[3]}<br/>
              </>)}
          </div>
        </div>
      </>
    );   
  }