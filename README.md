# Sala de Missões

Aplicação pedagógica gamificada para estudantes do 4º e 5º ano, com frontend React/Vite, API Node/Express, Firebase Authentication e Cloud Firestore.

## Estado da integração

A aplicação usa Firebase Auth no navegador e token Firebase ID nas chamadas à API. O servidor verifica a identidade e o perfil, aplica papel/escopo e usa Firebase Admin para ler/gravar dados. O catálogo administrativo inclui contas, escolas, turmas, estudantes, trilhas, missões, habilidades, cards, conquistas e recompensas. Tentativas/conclusão de missões e resgates de recompensas são processados no servidor; XP/moedas não devem ser escritos pelo cliente.

Não existe configuração de Emulator (`firebase.json`) neste checkout e não foi executado deploy, seed ou gravação de produção nesta implementação. Notificações persistidas, reconhecimentos, exportação de relatórios e alguns fluxos de certificado ainda não possuem endpoint integrado: a interface os identifica como indisponíveis ou vazios, em vez de inventar registros. As questões do diagnóstico permanecem conteúdo pedagógico local; as respostas são persistidas pela API. Não usar conteúdo/demo local como cadastro real.

## Requisitos e instalação local

Requer Node.js compatível com as dependências do projeto e npm.

```bash
npm ci
cp .env.example .env
```

Preencha o `.env` conforme os valores disponibilizados por um administrador do Firebase. Não compartilhe nem versione `.env` ou credenciais de conta de serviço.

### Configuração Firebase

Ative Firebase Authentication (provedor e-mail/senha) e Cloud Firestore no projeto escolhido. As variáveis `VITE_FIREBASE_*` são configuração pública do Web SDK; elas não substituem regras de segurança. O servidor precisa de credencial Admin via ADC ou das variáveis privadas `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL` e `FIREBASE_PRIVATE_KEY`. Nunca prefixe segredo Admin com `VITE_`.

Configure também `VITE_API_URL` com a URL do backend (localmente `http://localhost:3001`). `APP_URL` deve apontar para a URL frontend. Configure CORS e restrições da API Key no ambiente de hospedagem apropriado.

As regras atuais estão em `firestore.rules`, mas precisam ser revisadas no projeto-alvo e aplicadas por uma pessoa autorizada após validação. Regras não foram publicadas nesta execução. Configure os índices compostos necessários conforme erros/consultas do Firestore.

### Provisionar a primeira conta ADM Master

Apenas em ambiente autorizado, configure credenciais Firebase Admin e o e-mail da pessoa aprovada em `MASTER_ADMIN_EMAIL`. Execute deliberadamente:

```bash
npm run admin:provision-master
```

O comando falha se já existir ADM Master ativo, não define senha padrão e cria link temporário de recuperação. Trate a saída como segredo: entregue o link por canal privado e não o registre em tickets/logs compartilhados. Não execute esse provisionamento sem autorização do titular do Firebase.

### Executar localmente

Em terminais separados:

```bash
npm run server:dev
npm run dev
```

A API escuta por padrão na porta 3001 e o Vite na porta 3000. Sem configuração Firebase/backend funcionais, operações autenticadas devem falhar explicitamente; não há fallback legítimo para dados de demonstração.

## Validação local

```bash
npx tsc --noEmit --pretty false
npx tsc --noEmit -p tsconfig.server.json --pretty false
npm test
npm run build
```

Os testes existentes usam doubles/mocks determinísticos para lógica do servidor; eles não substituem uma execução com Firebase Emulator ou validação contra o projeto real. `git diff --check` verifica whitespace. O build pode emitir aviso de bundle acima de 500 kB.

## Provisionamento de conteúdo

O seed atual é explícito e restringe o conteúdo inicial à carga curricular/recompensas suportada, sem contas, alunos ou eventos de demonstração. Leia `scripts/seedFirebase.ts` e execute primeiro o dry-run:

```bash
npm run firebase:seed:dry
```

Só execute `npm run firebase:seed` com autorização explícita, projeto/credenciais confirmados e revisão do relatório do dry-run. Não execute seeds em produção automaticamente. `npm run firebase:verify` consulta coleções do ambiente configurado; use apenas no projeto autorizado.

## Segurança e escopo

- As APIs protegidas exigem Firebase ID token; o papel vem do perfil confiável no servidor, não de uma seleção feita na UI.
- O primeiro Master é criado pelo comando operacional acima. O console Master administra perfis e cadastros.
- A conta de aluno pode autenticar por código/PIN tratado no servidor; PIN/hash não deve ser exposto em coleções consultáveis pelo cliente.
- Professor/coordenação ficam limitados ao escopo escolar/turmas associado ao perfil; aluno somente ao próprio perfil.
- Regras Firestore negam escrita direta nas coleções de negócio protegidas. As gravações autorizadas passam pela API Admin.
- Nunca use cabeçalho `X-Mock-Role`, autenticação simulada ou seed de fixtures. Esses métodos não são modos de operação suportados.
- Não publique, aplique rules ou altere dados de produção sem aprovação explícita e credenciais do responsável.

## Rotas principais

- Sessão: `GET /api/auth/me`; autenticação infantil `POST /api/auth/students/session`.
- Estudantes: `GET /api/students`, `GET /api/students/:studentId`, diagnósticos e domínio conforme papéis/escopo.
- Missões: catálogo, tentativas, conclusão e progresso do próprio aluno.
- Recompensas: catálogo e resgate transacional pelo próprio estudante.
- Intervenções, cards, conquistas e métricas: endpoints autenticados com restrição de papel/escopo conforme as rotas.
- ADM Master: `/api/admin-console/*` para visão geral e CRUD administrativo permitido.

Consulte `server/routes/` para a lista exata de métodos/contratos, que pode evoluir.
