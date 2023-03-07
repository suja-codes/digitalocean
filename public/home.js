function Home() {
    return(
        <>
        <NavBar/>
        <Card
            bgcolor= "secondary"
            txtcolor="black"
            header="YOUR BANK"
            title="Welcome to the bank"
            text="You can move around using the navigation bar."
            body={(<img src="YourBank-1.png" className="img-fluid" alt="Responsive image"/>)}
        />
        </>
    )
}