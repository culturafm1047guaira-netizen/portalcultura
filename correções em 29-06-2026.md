# Plano de Correção Global — 29-06-2026

## Objetivo
Este plano estabelece a sequência de correções necessárias para elevar o portal Rádio Cultura FM 104.7 a um nível de produção mais seguro, estável e escalável, com foco em riscos reais observados na auditoria técnica.

## Critérios de priorização
1. Reduzir risco de segurança em produção.
2. Eliminar falhas que possam comprometer disponibilidade.
3. Melhorar confiabilidade das integrações externas.
4. Aumentar cobertura de testes e visibilidade operacional.
5. Preparar o produto para crescimento de audiência sem regressões.

## Prioridades globais

### 0–15 dias: Correções críticas
- Corrigir vulnerabilidades de dependências identificadas pelo `npm audit`.
- Implementar bloqueio de SSRF para URLs recebidas de feeds externos.
- Trocar o endpoint de revalidação para método seguro (`POST`) com autenticação forte.
- Remover fallback inseguro para chaves de demonstração em produção.
- Revisar e apertar a CSP para reduzir superfície de XSS.
- Validar configuração de variáveis sensíveis e garantir que secrets sejam obrigatórios em produção.

### 15–45 dias: Correções importantes
- Adicionar timeouts, retry com backoff e circuit breaker para integrações externas.
- Introduzir logs estruturados e alertas básicos para falhas de conteúdos e APIs.
- Migrar imagens críticas para `next/image` para melhorar performance e LCP.
- Ajustar a suíte de testes para refletir a arquitetura atual do App Router.
- Padronizar fallback de notícias para manter consistência editorial.

### 45–90 dias: Otimizações
- Introduzir fila assíncrona para ingestão de notícias e atualização de cache.
- Melhorar estratégia de cache distribuído e revalidação inteligente.
- Separar responsabilidades entre scraping, enriquecimento e renderização de páginas.
- Implementar dashboard operacional mínimo com métricas de disponibilidade externa e latência.

### 90+ dias: Escala e crescimento
- Avaliar persistência de conteúdo próprio, se houver necessidade de personalização ou comentários.
- Planejar evolução para arquitetura com filas, workers e monitoramento avançado.
- Preparar estratégia de crescimento com CDN, limites de consumo e resiliência multi-região.

## Entregáveis obrigatórios
- Patch de segurança com dependências atualizadas.
- Regras de validação de domínios externos para feeds.
- Endpoint de revalidação protegido.
- Checklist de deploy com variáveis obrigatórias.
- Relatório de disponibilidade e falhas das integrações externas.

## Métricas de sucesso
- `npm audit --audit-level=high` sem vulnerabilidades críticas.
- Build de produção sem falhas em CI/CD.
- Taxa de falha de integrações externas reduzida.
- Tempo médio de carregamento da homepage melhorado.
- Cobertura relevante de regressão acima do nível atual.

## Responsáveis sugeridos
- Engenheiro sênior de frontend/backend: correções de código e integrações.
- DevOps/Cloud: configuração de secrets, monitoramento e deploy.
- Product/Editorial: revisão de fallback e consistência editorial.

## Resumo executivo
A prioridade imediata é estabilizar a plataforma em produção, reduzindo riscos de segurança e de dependência externa, antes de qualquer investimento em crescimento funcional. O foco deve ser em segurança, resiliência e observabilidade.
