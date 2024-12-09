import { useNavigate } from "react-router-dom";
import "./Login-Styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Obtém os valores dos campos de entrada
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      // Faz uma requisição para a API sem o token no início
      const response = await fetch("http://localhost:3000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message || "Erro ao realizar login. Verifique suas credenciais.");
        return;
      }

      const data = await response.json();

      // Se o login for bem-sucedido, armazena o token no localStorage
      localStorage.setItem("authToken", data.token);

      alert("Login realizado com sucesso!");
      navigate("/menu"); // Redireciona para a página de menu após login
    } catch (error) {
      alert("Erro ao conectar com o servidor. Tente novamente mais tarde.");
      console.error(error);
    }
  };

  const handleRegister = () => {
    navigate("/register"); // Redireciona para a página de cadastro
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-content">
          <div className="login-image-container">
            <img
              src="/img/BANNER-HOME.png"
              alt="Logo"
              className="login-image"
            />
          </div>
          <div className="login-form-container">
            <h2 className="login-title">Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="username">Usuário</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Digite seu usuário"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Digite sua senha"
                  required
                />
              </div>
              <div className="button-container">
                <button type="submit" className="login-button">
                  <span>Entrar</span>
                  <FontAwesomeIcon icon={faSignInAlt} className="icon" />
                </button>
                <button
                  type="button"
                  className="register-button"
                  onClick={handleRegister}
                >
                  Cadastrar-se
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
