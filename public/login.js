function Login() {

    const [status, setStatus]  = React.useState('');

    function handle () {
      return true;
    }

    return (
        <>
        <NavBar/>
        <Card
            bgcolor="secondary"
            header="LOGIN"
            login={handle}
            submitButtonLogin="Login Successful"
            status={status}
        />

        <Link to="/">
          <div className="link">
            <button type="submit">Home</button>
          </div>
        </Link>
        </>
    )
}