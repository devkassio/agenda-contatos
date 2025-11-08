import { useEffect } from 'react';
import './Toast.css';

function Toast({ mensagem, tipo = 'info', onClose, duracao = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duracao);

    return () => clearTimeout(timer);
  }, [duracao, onClose]);

  const obterIcone = () => {
    switch (tipo) {
      case 'sucesso':
        return '✅';
      case 'erro':
        return '❌';
      case 'aviso':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className={`toast toast-${tipo}`}>
      <span className="toast-icone">{obterIcone()}</span>
      <span className="toast-mensagem">{mensagem}</span>
      <button className="toast-fechar" onClick={onClose}>
        ×
      </button>
    </div>
  );
}

export default Toast;
