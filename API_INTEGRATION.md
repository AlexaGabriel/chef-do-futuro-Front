# API Integration Documentation

## Overview
This document describes the integration of the backend API into the Chef do Futuro frontend application.

## Services Created

### 1. API Base Service (`src/services/api.js`)
- Configures axios with base URL from environment variables
- Implements request/response interceptors
- Handles authentication tokens
- Centralized error handling

### 2. Students Service (`src/services/alunosService.js`)
Endpoints:
- `listar(params)` - GET /api/v1/alunos/
- `buscarPorId(id)` - GET /api/v1/alunos/:id
- `criar(dados)` - POST /api/v1/alunos/
- `atualizar(id, dados)` - PATCH /api/v1/alunos/:id
- `deletar(id)` - DELETE /api/v1/alunos/:id

### 3. Teachers Service (`src/services/professoresService.js`)
Endpoints:
- `listar(params)` - GET /api/v1/professores/
- `buscarPorId(id)` - GET /api/v1/professores/:id
- `criar(dados)` - POST /api/v1/professores/
- `atualizar(id, dados)` - PATCH /api/v1/professores/:id
- `deletar(id)` - DELETE /api/v1/professores/:id

### 4. Courses Service (`src/services/cursosService.js`)
Endpoints:
- `listar(params)` - GET /api/v1/cursos/
- `buscarPorId(id)` - GET /api/v1/cursos/:id
- `buscarPorProfessor(professorId)` - GET /api/v1/cursos/professor/:professorId
- `buscarPorCategoria(categoria)` - GET /api/v1/cursos/categoria/:categoria
- `criar(dados)` - POST /api/v1/cursos/
- `atualizar(id, dados)` - PATCH /api/v1/cursos/:id
- `deletar(id)` - DELETE /api/v1/cursos/:id

### 5. Coordinators Service (`src/services/coordenadoresService.js`)
Endpoints:
- `listar(params)` - GET /api/v1/coordenadores/
- `buscarPorId(id)` - GET /api/v1/coordenadores/:id
- `criar(dados)` - POST /api/v1/coordenadores/
- `atualizar(id, dados)` - PATCH /api/v1/coordenadores/:id
- `deletar(id)` - DELETE /api/v1/coordenadores/:id

## Components Updated

### Student Components
1. **CadastroAluno** (`src/telaAluno/CadastroAluno.jsx`)
   - Integrated with `alunosService.criar()`
   - Updated form fields to match API schema:
     - `dataNascimento` (date format)
     - `nivelCulinaria` (iniciante/intermediario/avancado)
   - Added loading and error states

2. **Catalogo** (`src/telaAluno/Catalogo.jsx`)
   - Fetches courses from API using `cursosService.listar()`
   - Displays loading state
   - Error handling

3. **Inicial** (`src/telaAluno/Inicial.jsx`)
   - Fetches quick access courses from API
   - Limits to 6 courses
   - Dynamic course display

### Teacher Components
1. **CadastroProfessor** (`src/telaProfessor/CadastroProfessor.jsx`)
   - Integrated with `professoresService.criar()`
   - Updated form fields:
     - `especialidades` (array)
     - `cargaHoraria` (number)
     - `bio` (text)
   - Added loading and error states

2. **GerenciarModulos** (`src/telaProfessor/GerenciarModulos.jsx`)
   - Integrated with `cursosService.criar()`
   - Updated to create courses instead of modules
   - Form fields match API schema:
     - `titulo`, `descricao`, `nivel`, `duracao`
     - `categoria`, `imagemUrl`, `professorId`

3. **ListaEspera** (`src/telaProfessor/ListaEspera.jsx`)
   - Fetches students from API using `alunosService.listar()`
   - Delete functionality using `alunosService.deletar()`
   - Updated display to use API fields

## Environment Configuration

### .env File
```env
VITE_API_URL=http://localhost:3000/
# VITE_API_URL=https://chef-do-futuro-back.onrender.com/
```

**Note:** Vite requires the `VITE_` prefix for environment variables.

## API Data Schemas

### Student (Aluno)
```json
{
  "nome": "string",
  "email": "string (email)",
  "telefone": "string",
  "dataNascimento": "string (date)",
  "cpf": "string",
  "nivelCulinaria": "iniciante|intermediario|avancado",
  "turmas": ["string"],
  "observacoes": "string",
  "status": "ativo|inativo|suspenso"
}
```

### Teacher (Professor)
```json
{
  "nome": "string",
  "email": "string (email)",
  "telefone": "string",
  "cpf": "string",
  "especialidades": ["string"],
  "disciplinas": ["string"],
  "bio": "string",
  "cargaHoraria": number
}
```

### Course (Curso)
```json
{
  "titulo": "string",
  "descricao": "string",
  "imagemUrl": "string",
  "nivel": "iniciante|intermediario|avancado",
  "duracao": number,
  "professorId": "string",
  "categoria": "string",
  "tags": ["string"],
  "secoes": [],
  "status": "rascunho|publicado|arquivado"
}
```

## Dependencies Added
- **axios**: ^1.6.0 - HTTP client for API requests

## Features Implemented
- ✅ Centralized API configuration
- ✅ Request/response interceptors
- ✅ Loading states on all forms
- ✅ Error handling and display
- ✅ Dynamic data fetching from backend
- ✅ CRUD operations for all entities
- ✅ Query parameters support (pagination, search, filters)

## Next Steps
1. Implement authentication system
2. Add JWT token management
3. Implement refresh token logic
4. Add optimistic UI updates
5. Implement caching strategy
6. Add request cancellation for pending requests
7. Implement file upload for portfolio/images

## Testing
To test the integration:
1. Ensure backend is running on `http://localhost:3000`
2. Run frontend: `npm run dev`
3. Test student registration
4. Test teacher registration
5. Test course catalog display
6. Test course creation (teacher)
7. Test student list (teacher)
