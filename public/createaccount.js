function CreateAccount() {
  const [status, setStatus] = React.useState('');

    function handle(){
      return true;
    }

    return (
      <>
      <NavBar/>
        <Card
            bgcolor="secondary"
            header="CREATE ACCOUNT"
            handle={handle}
            submitButton="Continue to Account"
            status={status}
        />
      </>
    )
}