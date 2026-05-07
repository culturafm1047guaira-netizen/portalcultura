import streamlit as st
import streamlit.components.v1 as components
import os

st.set_page_config(
    page_title="Rádio Cultura FM 104.7 — Portal de Notícias",
    page_icon="📻",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Ocultar menu e footer do Streamlit para parecer um site puro
hide_st_style = """
            <style>
            #MainMenu {visibility: hidden;}
            footer {visibility: hidden;}
            header {visibility: hidden;}
            .block-container {padding: 0;}
            </style>
            """
st.markdown(hide_st_style, unsafe_allow_html=True)

# Caminho para o arquivo HTML principal
html_path = "index.html"

if os.path.exists(html_path):
    with open(html_path, "r", encoding="utf-8") as f:
        html_content = f.read()
    
    # Renderizar o HTML
    components.html(html_content, height=2500, scrolling=True)
else:
    st.error("Arquivo index.html não encontrado na pasta v3.")
