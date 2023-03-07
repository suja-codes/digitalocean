function Spa() {
    return (
        <HashRouter>
            <div>
                <UserContext.Provider 
                  value={{
                      user:[{
                          name:null,
                          email:null,
                          password:null,
                          balance:0
                        }],
                      login: {
                          isLoggedIn: false
                        },
                      transactionType: {
                          withdraw: false
                      }
                    }}>
                    <div className="container" style={{padding: "20px"}}>
                        <Route path="/" exact component={Home} />
                        <Route path="/CreateAccount/" component={CreateAccount} />
                        <Route path="/allData/" component={AllData} />
                        <Route path="/login/" component={Login} />
                        <Route path="/withdraw/" component={Withdraw} />
                        <Route path="/deposit/" component={Deposit} />
                        <Route path="/account/" component={AccountDetails} />
                    </div>
                  </UserContext.Provider>
            </div>
        </HashRouter>
    )
}

ReactDOM.render(<Spa/>,
    document.getElementById('root')
);