# 🚀 Guia de Deploy na Vercel

Este guia passo-a-passo vai te ajudar a subir o projeto **Financial News AI** na Vercel com sucesso.

## 📋 Pré-requisitos

- Conta no GitHub com o repositório criado
- Conta na Vercel (https://vercel.com)
- Banco de dados PostgreSQL (Supabase, Railway, Neon, etc.)
- Chaves de API (Groq, OpenAI, etc.)

## 🔧 Passo 1: Preparar o Repositório Git

```bash
# Navegar até a pasta do projeto
cd financial-news-ai-manchester-final

# Inicializar git (se ainda não estiver)
git init

# Adicionar todos os arquivos
git add .

# Fazer o commit inicial
git commit -m "Initial commit: Financial News AI ready for Vercel"

# Adicionar o remote do GitHub
git remote add origin https://github.com/seu-usuario/financial-news-ai.git

# Fazer push para o GitHub
git branch -M main
git push -u origin main
```

## 🌐 Passo 2: Conectar Vercel ao GitHub

1. Acesse https://vercel.com/dashboard
2. Clique em **"Add New..."** → **"Project"**
3. Selecione **"Import Git Repository"**
4. Conecte sua conta GitHub e autorize
5. Selecione o repositório `financial-news-ai`
6. Clique em **"Import"**

## ⚙️ Passo 3: Configurar Variáveis de Ambiente

Na página de configuração do projeto na Vercel:

1. Vá para **Settings** → **Environment Variables**
2. Adicione as seguintes variáveis:

```
DATABASE_URL = postgresql://user:password@host:5432/database
JWT_SECRET = sua-chave-secreta-super-segura-com-pelo-menos-32-caracteres
GROQ_API_KEY = gsk_xxxxxxxxxxxxxxxxxxxxx
OPENAI_API_KEY = sk-xxxxxxxxxxxxxxxxxxxxx (opcional)
NEWSAPI_KEY = xxxxxxxxxxxxxxxxxxxxx (opcional)
GNEWS_API_KEY = xxxxxxxxxxxxxxxxxxxxx (opcional)
NODE_ENV = production
```

**⚠️ Importante:** Certifique-se de que o `DATABASE_URL` está acessível de fora (não bloqueado por firewall).

## 📊 Passo 4: Configurar o Banco de Dados

### Opção A: Supabase (Recomendado)

1. Acesse https://supabase.com
2. Crie um novo projeto
3. Vá para **Settings** → **Database** → **Connection String**
4. Copie a connection string (URI)
5. Cole em `DATABASE_URL` na Vercel

### Opção B: Railway

1. Acesse https://railway.app
2. Crie um novo projeto PostgreSQL
3. Copie a connection string
4. Cole em `DATABASE_URL` na Vercel

### Opção C: Neon

1. Acesse https://neon.tech
2. Crie um novo projeto
3. Copie a connection string
4. Cole em `DATABASE_URL` na Vercel

## 🗄️ Passo 5: Executar Migrations do Banco

Após o primeiro deploy, você precisa executar as migrations:

```bash
# Localmente, com DATABASE_URL configurado
npm run db:push
```

Ou via Vercel CLI:

```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer login
vercel login

# Executar comando no ambiente de produção
vercel env pull .env.production.local
npm run db:push
```

## 🚀 Passo 6: Fazer o Deploy

A Vercel vai fazer o deploy automaticamente quando você fizer push para a branch `main`:

```bash
# Fazer mudanças no código
git add .
git commit -m "Descrição das mudanças"
git push origin main
```

Você pode acompanhar o progresso em https://vercel.com/dashboard

## ✅ Passo 7: Verificar o Deploy

1. Acesse a URL do seu projeto na Vercel (ex: `https://seu-projeto.vercel.app`)
2. Teste o health check: `https://seu-projeto.vercel.app/api/health`
3. Teste o login: `https://seu-projeto.vercel.app/auth/login`

## 🔍 Troubleshooting

### Erro: "DATABASE_URL não está definida"

- Verifique se a variável está configurada em **Settings** → **Environment Variables**
- Certifique-se de que o DATABASE_URL está acessível de fora

### Erro: "Connection timeout"

- Verifique se o banco de dados está online
- Verifique o firewall do banco de dados
- Aumente o timeout em `src/db/index.ts` se necessário

### Erro: "JWT_SECRET muito curto"

- Use uma chave com pelo menos 32 caracteres
- Exemplo: `openssl rand -base64 32`

### Erro: "GROQ_API_KEY não encontrada"

- Verifique se a chave está configurada corretamente
- Obtenha uma chave em https://console.groq.com

### Função serverless timeout

- Reduza o tempo de processamento nas rotas
- Considere usar cache (já implementado para feed)
- Aumente o `maxDuration` em `vercel.json` (máximo 60s no plano gratuito)

## 📈 Monitoramento

1. Acesse https://vercel.com/dashboard
2. Selecione seu projeto
3. Vá para **Analytics** para ver:
   - Requisições
   - Tempo de resposta
   - Erros
   - Logs

## 🔐 Segurança

- Nunca commite arquivos `.env` com dados reais
- Use o `.env.example` como template
- Rotacione suas chaves de API regularmente
- Monitore logs de erro na Vercel

## 📝 Estrutura do Deploy

```
/
├── api/
│   └── index.ts (Serverless Function)
├── frontend/
│   ├── dist/ (Build do React)
│   └── src/
├── src/ (Código do backend)
├── vercel.json (Configuração)
└── package.json
```

## 🎯 Próximos Passos

1. Configurar domínio customizado (opcional)
2. Configurar CI/CD com GitHub Actions (opcional)
3. Adicionar mais APIs de notícias (opcional)
4. Implementar cache distribuído (Redis) (opcional)

---

**Dúvidas?** Consulte a documentação oficial:
- Vercel: https://vercel.com/docs
- Drizzle ORM: https://orm.drizzle.team
- Express: https://expressjs.com
