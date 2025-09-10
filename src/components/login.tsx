

export function Login()
{
    function LoginClick(){
        alert('LoginClicked');
    }
    return(
        <div>
            <h2>User Login</h2>
            <dl>
                <dt>User Name</dt>
                <dd><input type="text" /></dd>
                <dt>Password</dt>
                <dd><input type="password" /></dd>
            </dl>
            <button onClick={LoginClick}>Login</button>
        </div>
    )
}