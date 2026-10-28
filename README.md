# Portfólio — Heitor Neves (PT | EN)

Rodar no VS Code (terminal):

    npm install
    npm run dev      # http://localhost:5173
    npm run build    # gera dist/ para deploy (Vercel)

Onde editar:
- src/i18n/translations.js → todos os textos em português (pt) e inglês (en). Mesmas chaves nos dois.
- src/main.js (topo) → PROJECTS (IDs dos 4 Shorts) e CONTACTS.
- public/images/heitor-1.webp, heitor-2.webp, heitor-3.webp → fotos do hero (a 1 é a grande).
- public/images/heitor-editor-workspace.png → imagem da seção "Sobre".
- public/images/comu-da-arte-logo.png → logo da Comunidade da Arte (PNG com fundo transparente; aparece no bloco de experiência).
- index.html → estrutura e links do rodapé (Instagram e WhatsApp).
- src/style.css → visual.

O idioma começa em português e a escolha fica salva no navegador (localStorage, chave hn-lang).
