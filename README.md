# Dra. Vitória Caldeira — Site de Clínica de Harmonização Facial

Site institucional premium (HTML5 + CSS + JavaScript puro), responsivo, rápido e
otimizado para conversão via WhatsApp.

**Dados atuais já aplicados**

| Item     | Valor                                                                |
| -------- | -------------------------------------------------------------------- |
| Clínica  | Dra. Vitória Caldeira (logo: “Vitória Caldeira”)                      |
| WhatsApp | `5511953634975` → exibido como (11) 95363-4975                        |
| Endereço | R. Padre Estevão Pernet, 160 — Tatuapé, São Paulo/SP — CEP 03315-000  |
| Instagram| **não possui** — a seção é uma galeria interna, sem link externo      |

---

## 1. Estrutura do projeto

```
/
├── index.html          ← página única (todo o conteúdo)
├── css/style.css       ← identidade visual e layout
├── js/main.js          ← menu, animações, contadores, parallax
├── assets/favicon.svg  ← ícone da aba
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## 2. O que personalizar (5 minutos)

Abra `index.html` e procure pelas marcas abaixo (também estão no topo do arquivo):

| Marca              | O que trocar                                                          |
| ------------------ | --------------------------------------------------------------------- |
| `DATA-CLINICA`     | Nome da clínica (hoje: **Dra. Vitória Caldeira**) e logo              |
| `DATA-WHATS`       | Número do WhatsApp no formato `55DDNÚMERO` (hoje: `5511953634975`)   |
| `DATA-GALERIA`     | Fotos da galeria (a clínica **não tem Instagram** — nenhum link)      |
| `DATA-ENDERECO`    | Endereço, horários e o `src` do mapa do Google Maps                   |
| `DATA-DEPOIMENTO`  | Depoimentos **reais** (os atuais são placeholders)                    |

Também troque:

- **Fotos** — todas vêm do Unsplash (licença gratuita). Substitua pelo acervo real
  da clínica mantendo a proporção indicada em cada `width`/`height`.
- **Resultados “Antes | Depois”** — hoje usam a mesma imagem com filtro diferente,
  apenas como maquete. Coloque fotos reais de antes e depois (mesma luz e enquadramento).
- **Domínio** — em `index.html` (`canonical`, Open Graph), `robots.txt` e `sitemap.xml`
  troque `exemplo.com.br` pelo endereço final do site.

---

## 3. Como visualizar localmente

Basta dar dois cliques em `index.html`. Ou, para testar como no servidor:

```powershell
# PowerShell (Windows)
Start-Process msedge "http://localhost:8000"
```

---

## 4. Publicar (domínio próprio)

1. Envie os arquivos por FTP ou pelo painel do provedor (hospedagem estática).
2. Aponte o domínio para a pasta `public_html` / `www`.
3. Ative SSL (HTTPS) — quase todo hospedador oferece certificado gratuito.
4. Confirme que `https://SEUDOMINIO.com.br/` carrega com o favicon e o mapa.

---

## 5. Recursos técnicos

- HTML5 semântico (`header`, `main`, `section`, `footer`, `figure`)
- SEO: título, meta description, canonical, Open Graph, Twitter Card, JSON-LD
  (`MedicalClinic` com endereço e horários), `robots.txt` e `sitemap.xml`
- Performance: `preload` da imagem principal, `loading="lazy"` nas demais,
  `preconnect`, fontes com `display=swap`, CSS e JS minúsculos e sem dependências
- Acessibilidade: skip link, `alt` descritivos, foco visível, `aria-expanded`,
  navegação por teclado e suporte a `prefers-reduced-motion`
- Animações sutis: fade-in, slide-up, hover elegante, zoom suave e parallax discreto
  (desativados para quem prefere menos movimento)
- Conversão: botão “Agendar avaliação” no header, hero, resultados, CTA final,
  seção de contato e botão flutuante de WhatsApp
