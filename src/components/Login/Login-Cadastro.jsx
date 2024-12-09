import { useNavigate } from "react-router-dom";
import "./Register-Styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

function Register() {
  const navigate = useNavigate();

  // Função para manipular o cadastro
  const handleRegister = async (e) => {
    e.preventDefault();

    // Captura os valores do formulário
    const username = e.target.username.value.trim();
    const password = e.target.password.value.trim();
    const email = e.target.email.value.trim();

    if (!username || !password || !email) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        navigate("/"); // Redireciona para a página de login
      } else {
        alert(data.message || "Erro ao realizar cadastro. Tente novamente.");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor. Tente novamente mais tarde.");
      console.error("Erro ao tentar cadastrar:", error);
    }
  };

  // Função para redirecionar ao login
  const handleLogin = () => {
    navigate("/"); // Redireciona para a página de login
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-content">
          {/* Container de imagem */}
          <div className="register-image-container">
            
            <img
          //    src="/img/BANNER-HOME.png" // Substitua pelo caminho correto da imagem
          //    alt="Logo"
          //    className="register-image"
              />

          </div>

          {/* Container do formulário */}
          <div className="register-form-container">
            <h2 className="register-title">Crie sua Conta</h2>
            <form className="register-form" onSubmit={handleRegister}>
              <div className="input-group">
                <label htmlFor="username">Usuário</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Digite seu nome de usuário"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Digite seu e-mail"
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
                <button type="submit" className="register-button">
                  <span>Cadastrar</span>
                  <FontAwesomeIcon icon={faUserPlus} className="icon" />
                </button>
                <button
                  type="button"
                  className="login-button"
                  onClick={handleLogin}
                >
                  Voltar ao Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
