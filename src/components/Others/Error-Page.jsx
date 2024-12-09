import "./Error-Page-Styles.css"; // Certifique-se de criar o arquivo CSS correspondente.

const ErrorPage = () => {
  return (
    <div className="error-page">
      <main className="error-content">
        <img
          src="img/monstro-error.png"
          alt="Surprised Monster"
          className="monster-image"
        />
        <div className="error-text">
          <h1>Ops! Página não encontrada.</h1>
          <p>
          Você deve ter escolhido a porta errada porque não consegui colocar os olhos na página que você estava procurando.
          </p>
          <a href="/" className="back-button">
            Volte a Pagina Inicial
          </a>
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;

