# OmniCmd — Landing Page (Independente)

Esta pasta contém a **Landing Page 100% independente** do OmniCmd, totalmente desacoplada da aplicação desktop Tauri (`src/`).

---

## ✨ Características

- **Totalmente Independente**: Não compartilha rotas, componentes ou estados com o `src/` do Tauri. A aplicação desktop permanece intocada, limpa e dedicada exclusivamente ao HUD nativo.
- **Hero com GIF em Loop**: O primeiro viewport não executa o aplicativo no navegador; em vez disso, exibe uma animação em alta fidelidade (`demo.gif`) simulando a invocação via atalho (`Super+Space`), captura de clipboard e transformação de IA em 14ms.
- **Leve e Ultra-rápida**: Construída com React 19, Vite e Tailwind CSS v4. O bundle CSS tem ~29 kB e o JS ~257 kB.
- **Matriz de Conversão e Downloads**: Detecção automática do sistema operacional do visitante (macOS, Linux, Windows), comando `curl` de instalação com 1 clique e tabela de benchmarks comparativos (Rust vs. Electron).

---

## 📁 Estrutura da Pasta (`landing/`)

```text
landing/
├── public/
│   ├── demo.gif              # Asset servido publicamente na raiz do Vite
│   └── favicon.svg           # Favicon vetorial
├── src/
│   ├── components/
│   │   ├── Navbar.tsx        # Cabeçalho com logo, âncoras e botão de download
│   │   ├── HeroSection.tsx   # Hero com título, especificações e download por SO
│   │   ├── InteractiveHudSimulator.tsx # Simulador interativo do HUD com streaming
│   │   ├── BenchmarksSection.tsx # Tabela comparativa (Rust 24MB vs Electron 380MB)
│   │   ├── WorkflowSection.tsx   # Ergonomia em 3 tempos (Trigger -> Action -> Paste)
│   │   ├── DevlogSection.tsx # Log de atualizações e releases
│   │   ├── DownloadSection.tsx   # Hub de distribuição (.dmg, .deb, .AppImage, .msi)
│   │   ├── Footer.tsx        # Rodapé com licença MIT e links
│   │   ├── GithubIcon.tsx    # Ícone SVG do GitHub
│   │   └── MarkdownView.tsx  # Renderizador estilizado de output markdown
│   ├── constants.ts          # Links, comandos curl e dados de benchmarks
│   ├── types.ts              # Tipagens TypeScript
│   ├── utils.ts              # Detecção automática de SO do visitante
│   ├── LandingPage.tsx       # Orquestrador da página
│   ├── main.tsx              # Ponto de entrada React
│   └── index.css             # Estilização com Tailwind CSS v4 e paleta obsidian
├── index.html                # HTML independente da landing page
├── package.json              # Configurações e scripts independentes
├── tsconfig.json             # Configuração TypeScript isolada
└── vite.config.ts            # Configuração Vite isolada (porta 3000)
```

---

## 🚀 Como Executar

### 1. A partir da raiz do repositório:

```bash
# Iniciar o servidor de desenvolvimento da landing page (porta 3000)
pnpm dev:landing

# Fazer build de produção da landing page (saída em landing/dist)
pnpm build:landing

# Testar o preview local do build da landing page
pnpm preview:landing
```

### 2. De dentro da pasta `landing/`:

```bash
cd landing

# Iniciar o Vite localmente
pnpm dev

# Compilar para produção
pnpm build

# Visualizar o preview local
pnpm preview
```

O servidor abrirá em: [http://localhost:3000](http://localhost:3000)

---

## 🌐 Como Publicar (Vercel, Netlify, Cloudflare Pages, GitHub Pages)

Para publicar a landing page online de forma independente do app Tauri:

1. Conecte o repositório à sua plataforma de hospedagem (ex: **Vercel** ou **Netlify**).
2. Configure as seguintes opções no painel do projeto:
   - **Root Directory**: `landing`
   - **Framework Preset**: Vite
   - **Build Command**: `pnpm build` (ou `npm run build`)
   - **Output Directory**: `dist`
3. Clique em **Deploy**.

A landing page será publicada instantaneamente sem qualquer dependência ou arquivo do Tauri.
