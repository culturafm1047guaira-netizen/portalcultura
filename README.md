# Rádio Cultura FM 104.7 - Portal de Notícias (v3)

Este repositório contém a versão modernizada (v3) do portal de notícias da Rádio Cultura FM 104.7 de Guaíra-SP. O portal foi redesenhado para oferecer uma experiência premium, focada em conteúdo editorial, performance e monetização.

## 🚀 Tecnologias Utilizadas
- **HTML5 & CSS3**: Estrutura e estilização moderna com suporte a Modo Noturno.
- **JavaScript (Vanilla)**: Lógica de integração de dados e interatividade.
- **APIs Dinâmicas**:
  - **RSS2JSON**: Para buscar notícias em tempo real via RSS (G1, Agência Brasil).
  - **Open-Meteo**: Informações meteorológicas precisas de Guaíra-SP.
  - **AwesomeAPI**: Cotações de moedas e indicadores agropecuários.
- **Python (Streamlit)**: Servidor de visualização e deploy simplificado.

## 📁 Estrutura do Projeto
- `/index.html`: Página principal com design de alta performance.
- `/css/`: Estilos centralizados.
- `/js/`: Lógica de negócios modularizada.
- `/img/`: Ativos visuais e logos oficiais processados.
- `/sw.js`: Service Worker para suporte a PWA e cache offline.

## 📄 Documentos de gestão
- [Plano de Correção Global — 29-06-2026](correções%20em%2029-06-2026.md)

## 🛠 Como Rodar Localmente
1. Certifique-se de ter o Python instalado.
2. Instale as dependências: `pip install streamlit`
3. Execute o servidor: `streamlit run server.py`

## 🌐 Deploy
O portal foi preparado para deploy no **Streamlit Cloud**, garantindo acesso rápido e escalável.

---
© 2026 Rádio Cultura FM 104.7. Guaíra-SP.
