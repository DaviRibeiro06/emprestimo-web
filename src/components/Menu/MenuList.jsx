import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faPlus,
  faMagnifyingGlass,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import "./Menu-styles.css";

function Menu() {
  const navigate = useNavigate();

  // Configuração dos botões, tornando o código mais limpo e escalável
  const buttons = [
    {
      id: 1,
      label: "Cadastro de Usuários",
      icon: faUserPlus,
      route: "/cadastro-usuarios",
    },
    {
      id: 2,
      label: "Cadastro de Itens",
      icon: faPlus,
      route: "/cadastro-itens",
    },
    {
      id: 3,
      label: "Buscar",
      icon: faMagnifyingGlass,
      route: "/buscar",
    },
    {
      id: 4,
      label: "Empréstimos",
      icon: faHandshake,
      route: "/emprestimos",
    },
  ];

  // Função para navegar usando a rota configurada
  const handleButtonClick = (route) => {
    navigate(route);
  };

  return (
    <div className="painel-container">
      <div className="button-grid">
        {buttons.map(({ id, label, icon, route }) => (
          <button
            key={id}
            className="grid-button"
            onClick={() => handleButtonClick(route)}
          >
            <FontAwesomeIcon icon={icon} className="button-icon" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Menu;
