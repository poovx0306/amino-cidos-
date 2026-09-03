# Biomoléculas y Macromoléculas — Guía de estudio

Sitio de estudio interactivo del **Tema 2: Biomoléculas y Macromoléculas** (Biología Celular y Molecular, 1er ciclo, curso 2026-2), elaborado a partir de las conferencias de la Dra. Omitsu Agüero Sánchez — Universidad para el Bienestar Benito Juárez García, sede Parque Ecológico de Texcoco.

Está dividido en **tres módulos independientes**, uno por conferencia. Cada módulo tiene sus propios apartados numerados, simuladores y examen.

## Estructura de archivos

| Archivo | Contenido |
|---|---|
| `index.html` | Portada con las tarjetas de los tres módulos |
| `modulo-1-aminoacidos.html` | Módulo 1 — Precursores de proteínas: aminoácidos |
| `modulo-2-proteinas.html` | Módulo 2 — Proteínas y macromoléculas |
| `modulo-3-lipidos.html` | Módulo 3 — Lípidos |
| `estilos.css` | Hoja de estilos compartida |
| `examen.js` | Motor de examen reutilizado por los tres módulos |
| `comun.js` | Barra de progreso, scroll-spy y respuestas desplegables |

Cada módulo define su propio banco de preguntas en `window.BANCO`, dentro de su `<script>` final.

## Módulo 1 — Aminoácidos (14 apartados)

Precursores de macromoléculas · concepto e importancia · funciones y principio de multiplicidad de utilización · lo constante y lo variable · propiedades ópticas · las tres clasificaciones · catálogo de los 21 · interacciones entre cadenas R · propiedades eléctricas · enlace peptídico · conclusiones · preguntas de comprobación · examen de 25 preguntas · glosario.

**Simuladores:** especies iónicas de la glicina con control de pH; interacciones entre dos cadenas laterales.

## Módulo 2 — Proteínas (13 apartados)

Concepto de macromolécula · las ocho características generales · carácter informacional y reconocimiento molecular · péptidos y proteínas · clasificación por forma, solubilidad, composición y función · los cuatro niveles estructurales · α-hélice frente a hoja plegada · la hemoglobina · desnaturalización y renaturalización · propiedades eléctricas · electroforesis · taller con las tablas de la conferencia · examen de 30 preguntas.

**Simulador:** electroforesis, con pH del medio y punto isoeléctrico ajustables y migración animada entre cátodo y ánodo.

## Módulo 3 — Lípidos (13 apartados)

Concepto y clasificación · catálogo de las siete clases · funciones generales · ácidos grasos (nomenclatura, saturación, longitud, esenciales, propiedades) · ceras · acilgliceroles · fosfátidos de glicerina · esfingolípidos · terpenos y vitaminas liposolubles · esteroides y colesterol · eicosanoides · aplicación clínica y conclusiones · examen de 30 preguntas.

**Simuladores:** clasificador de ácidos grasos; constructor de fosfoglicéridos; constructor de esfingolípidos.

## Publicar en GitHub Pages

```bash
git init
git add .
git commit -m "Guía de estudio: Biomoléculas y Macromoléculas"
git branch -M main
git remote add origin https://github.com/poovx0306/NOMBRE-DEL-REPO.git
git push -u origin main
```

Después: **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**.
Queda en `https://poovx0306.github.io/NOMBRE-DEL-REPO/`.

> Importante: sube **todos** los archivos juntos, ya que los módulos comparten `estilos.css`, `examen.js` y `comun.js`.

## Notas técnicas

- Sin dependencias ni build. Tipografías desde Google Fonts (requiere internet en la primera carga).
- Responsive, navegable por teclado, respeta `prefers-reduced-motion`.
- Para añadir o editar preguntas, modifica el arreglo `window.BANCO` del módulo correspondiente.

Material de apoyo; no sustituye las conferencias ni el libro de texto (*Bioquímica Médica*, Cardellá–Hernández, Tomo I).
