import "./Header.css";

function Header(){
    return (
        <header className="header">
            <h1>Campus Eats</h1>
            <nav>
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Cart</a>
            </nav>
        </header>
    );
}

export default Header;