function Deposit() {
    // const [show, setShow]     = React.useState(true);
    // const [status, setStatus] = React.useState('');

    function handle() {
      //ctx.users.push({name: data.name, deposit: data.deposit});
      return true;
  }

  return (
    <>
    <NavBar/>
      <Card
        bgcolor="primary"
        header="DEPOSIT"
        deposit={handle}
        submitButtonDeposit="Deposit Successful"
      />

        <Link to="/">
          <button type="submit">Home</button>
        </Link>
        </>
  )
}