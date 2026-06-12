# NOLEGGIA-LO — Sito Hugo

Sito statico per **NOLEGGIA-LO**, servizio di noleggio furgoni cargo con base a Brecciarola di Chieti, Abruzzo.  
Costruito con [Hugo](https://gohugo.io/) — zero dipendenze JavaScript a runtime, nessun framework.

---

## Prerequisiti

| Tool | Versione minima |
|------|----------------|
| [Hugo Extended](https://gohugo.io/installation/) | v0.120.0+ |
| Git | qualsiasi |

> **Nota:** Hugo Extended non è strettamente necessario (non usiamo SCSS), ma è la scelta consigliata per compatibilità futura con Hugo Pipes.

Verifica l'installazione:

```bash
hugo version
```

---

## Struttura del progetto

```
hugo-porting/
├── hugo.toml              # Configurazione Hugo
├── content/
│   └── _index.md          # Front matter della home page
├── data/
│   ├── vans.yaml          # Dati flotta furgoni
│   ├── chiSiamo.yaml      # Feature cards "Chi Siamo"
│   └── perche.yaml        # Feature items "Perché Noi"
├── layouts/
│   ├── _default/
│   │   └── baseof.html    # Template base HTML
│   ├── index.html         # Layout home page
│   └── partials/
│       ├── head.html      # <head> SEO + CSS + fonts
│       ├── navbar.html    # Navbar fissa
│       ├── hero.html      # Sezione hero
│       ├── chi-siamo.html # Sezione Chi Siamo
│       ├── flotta.html    # Sezione flotta furgoni
│       ├── stripe.html    # Divisore diagonale
│       ├── perche.html    # Sezione Perché Noi
│       ├── contatti.html  # Sezione Contatti + mappa
│       └── footer.html    # Footer
├── assets/
│   ├── css/
│   │   └── main.css       # Tutti gli stili (vanilla CSS)
│   └── js/
│       └── main.js        # Scroll-reveal + nav scroll effect
└── static/
    ├── robots.txt
    └── images/            # Asset immagini (vedi setup)
```

---

## Setup iniziale

### 1. Copia le immagini

Copia le immagini dal progetto originale nella cartella `static/images/`:

**PowerShell (Windows):**
```powershell
$src = "..\src\assets"
$dst = "static\images"
New-Item -ItemType Directory -Force $dst
Copy-Item "$src\Furgone-piazzale.png"        "$dst\"
Copy-Item "$src\furgone-laterale.jpg"        "$dst\"
Copy-Item "$src\furgone-retro.jpg"           "$dst\"
Copy-Item "$src\furgone-vista-completa.jpg"  "$dst\"
```

**Bash (macOS/Linux):**
```bash
mkdir -p static/images
cp ../src/assets/Furgone-piazzale.png       static/images/
cp ../src/assets/furgone-laterale.jpg       static/images/
cp ../src/assets/furgone-retro.jpg          static/images/
cp ../src/assets/furgone-vista-completa.jpg static/images/
```

*(Opzionale)* Aggiungi anche un `static/images/og-image.jpg` per l'anteprima Open Graph sui social.

### 2. (Opzionale) Favicon

Posiziona un file `static/favicon.ico` con la tua icona.

---

## Sviluppo locale

```bash
hugo server --disableFastRender
```

Apri il browser su [http://localhost:1313](http://localhost:1313).

Usa `--disableFastRender` per evitare artefatti visivi durante l'hot-reload.

---

## Build produzione

```bash
hugo --minify
```

L'output viene generato nella cartella `public/`. Questa directory è pronta per essere caricata su qualsiasi hosting statico.

---

## Deploy

### Netlify

Il file `netlify.toml` è già incluso. Basta connettere il repository su [netlify.com](https://netlify.com):

- **Build command:** `hugo --minify`
- **Publish directory:** `public`
- **Hugo version:** impostata automaticamente da `netlify.toml`

### GitHub Pages

Il workflow `.github/workflows/hugo.yml` è già incluso. Abilitare GitHub Pages nel repository:

1. Settings → Pages → Source: **GitHub Actions**
2. Fare push su `main` — il sito verrà pubblicato automaticamente.

### Cloudflare Pages

- Framework preset: **Hugo**
- Build command: `hugo --minify`
- Build output directory: `public`
- Environment variable: `HUGO_VERSION = 0.128.0`

---

## Configurazione

Tutti i parametri del sito (telefono, WhatsApp, descrizione SEO, ecc.) si modificano in `hugo.toml` sotto `[params]`:

```toml
[params]
  phone    = "350 506 4929"
  tel      = "tel:3505064929"
  whatsapp = "https://wa.me/393505064929"
  description = "..."
```

I contenuti dinamici (furgoni, card, feature) si trovano nei file `data/*.yaml`.

---

## Aggiungere una nuova pagina

1. Creare `content/pages/nome-pagina.md` con front matter:

```markdown
---
title: "Titolo Pagina"
description: "Meta description per SEO"
---

Contenuto in Markdown...
```

2. Creare `layouts/pages/single.html` se si vuole un layout personalizzato.

---

## Licenza

© 2025 NOLEGGIA-LO — Tutti i diritti riservati.
