# EVOCARE Global - Avaliação Pós Imersão

Formulário inteligente com AYLA (IA Acolhedora) para triagem e acolhimento de participantes.

**Versão:** 1.0.0
**Score QA:** 9.2/10
**Status:** Ready for Production

## Features

- ✅ Validação de Email (regex)
- ✅ Telefone com máscara (XX) 9XXXX-XXXX
- ✅ CPF com validação de checksum
- ✅ AlertDisplay (Verde/Amarelo/Vermelho)
- ✅ Mínimo 10 caracteres em campos abertos
- ✅ Chat com AYLA (System Prompt v2.2)
- ✅ Botão 'Sair' após 3 turnos de conversa

## Requisitos

- Node.js 18+
- npm ou yarn

## Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## Deploy no Vercel

### Opção 1: via GitHub (Recomendado)

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Selecione "Import Git Repository"
4. Autentique com GitHub e selecione `evocare-global`
5. Deixe as configurações padrão (Vercel detectará Vite)
6. Clique em "Deploy"

### Opção 2: via Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer deploy
vercel deploy --prod
```

## Variáveis de Ambiente

Configure no Vercel:

- `VITE_APP_NAME` - Nome da aplicação (padrão: "EVOCARE Global")
- `VITE_APP_VERSION` - Versão (padrão: "1.0.0")

## Arquitetura

- **Framework:** React 19
- **Build Tool:** Vite 6
- **Styles:** Tailwind CSS
- **AI:** Google GenAI API

## Formulário (4 etapas)

1. **Identificação** - Nome, Email, Telefone, CPF
2. **Percepção** - Como você se sente?
3. **Sintomas** - Conte um pouco mais
4. **Triagem** - Avaliação e chat com AYLA

## Componentes

- `FormStep0-3` - Componentes de formulário
- `AlertDisplay` - Componente de alerta (3 níveis)
- `EvoCareChat` - Chat inteligente com AYLA
