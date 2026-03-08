## 📝 Revisión del Simple Counter - Damián Lopez Corrochano

### ✅ Aspectos Positivos

1. **La funcionalidad base está conseguida**: el contador arranca automáticamente, muestra 6 dígitos y separa correctamente el display del contador de los controles.

2. **Respetaste el objetivo pedagógico del ejercicio**: resolviste el proyecto sin hooks, moviendo la lógica principal al entrypoint y renderizando de nuevo la app cuando cambia el contador.

3. **Fuiste más allá del mínimo**: añadiste cuenta atrás y alerta personalizada, lo que demuestra curiosidad y ganas de practicar más allá del enunciado básico.

### 🔍 Áreas de Mejora

#### 1. Diferenciar claramente `Start` y `Resume`

En la versión revisada, ambos botones llamaban al mismo callback, así que visualmente parecían dos acciones distintas, pero técnicamente hacían lo mismo.

**Código actual:**
```javascript
<button onClick={onStart}>Start</button>
<button onClick={onStop}>Stop</button>
<button onClick={onStart}>Resume</button>
```

**Código mejorado:**
```javascript
<button onClick={onStart}>Start</button>
<button onClick={onStop} disabled={!isRunning}>Stop</button>
<button onClick={onResume} disabled={isRunning}>Resume</button>
```

**¿Por qué es mejor?**
- Cada botón comunica una intención distinta.
- El comportamiento coincide con la etiqueta mostrada en pantalla.
- El flujo del contador queda más fácil de mantener y depurar.

#### 2. Evitar consultas al DOM directamente dentro del JSX

La lectura de los inputs estaba incrustada dentro del `onClick`, mezclando UI, acceso al DOM y validación en el mismo bloque.

**Código actual:**
```javascript
<button
    onClick={() => {
        const value = parseInt(document.querySelector("#countdownInput").value);
        if (!isNaN(value)) onCountdown(value);
    }}
>
    Iniciar cuenta atrás
</button>
```

**Código mejorado:**
```javascript
function readNumberFromInput(inputId) {
    const input = document.getElementById(inputId);
    const value = Number.parseInt(input?.value ?? "", 10);

    if (Number.isNaN(value) || value < 0) return null;

    input.value = "";
    return value;
}
```

**¿Por qué es mejor?**
- Reduce duplicación.
- Centraliza la validación en un único punto.
- Hace que el JSX quede más limpio y más fácil de leer.

#### 3. Asegurar que el icono y el markup del proyecto sean reales

El contador renderizaba una etiqueta `<i>` con clases de Font Awesome, pero el proyecto no estaba cargando esa librería, así que el icono no aparecía realmente.

**Código actual:**
```javascript
<div className="clock">
    <i className="fa-regular fa-clock"></i>
</div>
```

**Código mejorado:**
```javascript
import { FaRegClock } from "react-icons/fa";

<div className="clock">
    <FaRegClock aria-hidden="true" />
</div>
```

**¿Por qué es mejor?**
- El icono ahora sí existe en runtime.
- La dependencia usada ya estaba en el proyecto.
- El resultado visual coincide con lo que promete el código.

### 💡 Sugerencias Adicionales

#### Configurar ESLint de verdad

El proyecto define `npm run lint`, pero el comando falla porque no existe configuración de ESLint en el repositorio.

**Nota:** Esto no rompe el build, pero sí te quita una capa útil de feedback automático para futuros proyectos.

## 🎯 Patrones y Anti-patrones Identificados

### Patrones Positivos Encontrados ✅

#### 1. Estado externo sin hooks

**Tipo:** Patrón ✅

**Descripción:** Gestionaste el contador, el intervalo y el modo countdown fuera de los componentes, que es precisamente el objetivo didáctico de este ejercicio antes de entrar en hooks.

**Dónde aparece:**
- Archivo: `src/js/main.jsx`

**Código:**
```javascript
let counter = 0;
let interval = null;
let countdownMode = false;
let alertAt = null;
```

**¿Por qué es importante?**
- Demuestra que entiendes cómo re-renderizar manualmente en React.
- Te obliga a razonar sobre el ciclo de vida del intervalo.
- Encaja con la meta pedagógica del proyecto.

**Conceptos relacionados:**
- `setInterval`
- re-render manual
- separación entre lógica y presentación

#### 2. Componente dedicado al display del contador

**Tipo:** Patrón ✅

**Descripción:** Separaste el renderizado de los dígitos en `SecondsCounter`, evitando meter toda la UI dentro del entrypoint.

**Dónde aparece:**
- Archivo: `src/js/components/SecondsCounter.jsx`

**Código:**
```javascript
function SecondsCounter({ seconds }) {
    const formatted = String(seconds).padStart(6, "0");
    return (
        <div className="bigCounter">
            ...
        </div>
    );
}
```

**¿Por qué es importante?**
- Hace el código más reutilizable.
- Facilita cambios visuales sin tocar la lógica del temporizador.
- Mejora la lectura general del proyecto.

**Conceptos relacionados:**
- componentes funcionales
- props
- responsabilidad única

### Anti-patrones a Mejorar ❌

#### 1. Código boilerplate muerto

**Tipo:** Anti-patrón ❌

**Descripción:** El archivo `Home.jsx` seguía con el contenido de `Hello Rigo!` y no participaba en el flujo real del proyecto.

**Dónde aparece:**
- Archivo: `src/js/components/Home.jsx`

**Código:**
```javascript
<h1 className="text-center mt-5">Hello Rigo!</h1>
```

**¿Por qué es importante?**
- Añade ruido innecesario al proyecto.
- Puede confundir al revisor y al propio estudiante.
- Mantener solo código real mejora mantenibilidad.

**Alternativa:**
```javascript
// Eliminar archivos boilerplate no usados para que el repositorio
// refleje solo la solución real del ejercicio.
```

**Conceptos relacionados:**
- código muerto
- mantenibilidad
- limpieza del repositorio

#### 2. Acceso al DOM inline desde JSX

**Tipo:** Anti-patrón ❌

**Descripción:** Había lógica de búsqueda del DOM y parsing directamente dentro de los botones.

**Dónde aparece:**
- Archivo: `src/js/components/App.jsx`

**Código:**
```javascript
const value = parseInt(document.querySelector("#alertInput").value);
if (!isNaN(value)) onAlert(value);
```

**¿Por qué es importante?**
- Mezcla demasiadas responsabilidades en un mismo sitio.
- Duplica lógica parecida en varios botones.
- Hace más difícil extender la validación después.

**Alternativa:**
```javascript
const value = readNumberFromInput(INPUT_IDS.alert);
if (value !== null) onAlert(value);
```

**Conceptos relacionados:**
- DRY
- separación de responsabilidades
- validación de inputs

## 📊 Evaluación Detallada

### Criterios de Evaluación (Total: 90/100)

| Criterio | Puntos | Obtenido | Comentario |
|----------|--------|----------|------------|
| **Funcionalidad Básica** | 30 | 30 | El contador funciona, arranca solo, muestra 6 dígitos y los controles principales responden correctamente. |
| **Código Limpio** | 20 | 17 | Había buena base, pero quedaba boilerplate muerto y algo de lógica duplicada o demasiado incrustada en JSX. |
| **Estructura** | 15 | 12 | La separación general es buena, aunque parte de la lógica de inputs estaba demasiado acoplada a la UI. |
| **Buenas Prácticas** | 15 | 13 | Bien resuelto el `setInterval` y las `keys`, pero faltaba validación de props. |
| **HTML/CSS** | 10 | 8 | El diseño es atractivo y el CSS está trabajado, pero el icono del reloj no estaba cargando realmente. |
| **UX/Animaciones** | 10 | 10 | Buena presentación visual, hover correcto y layout agradable. |
| **TOTAL** | **100** | **90** | **APROBADO ✅** |

### Desglose de Puntos Perdidos (-10 puntos)

1. **-3 puntos** - `Start` y `Resume` compartían el mismo callback, así que el comportamiento no expresaba bien la intención de cada botón.
2. **-3 puntos** - La lectura de los inputs estaba incrustada con `document.querySelector(...)` dentro del JSX, mezclando lógica y presentación.
3. **-2 puntos** - El icono del reloj no se renderizaba realmente porque Font Awesome no estaba cargado en el proyecto.
4. **-2 puntos** - Faltaba validación de props y seguía presente un archivo boilerplate sin uso real.

### Cómo Llegar a 100/100

Aplicando las correcciones de este PR:
- ✅ +3 puntos - `Start` y `Resume` ahora son acciones distintas y coherentes.
- ✅ +3 puntos - La lectura y validación de inputs quedó extraída en un helper reutilizable.
- ✅ +2 puntos - El reloj ahora usa un icono real y funcional.
- ✅ +2 puntos - Se agregaron `PropTypes`, se actualizó el título del proyecto y se eliminó código muerto.

**= 100/100** 🎉

### 📊 Resumen

| Aspecto | Estado |
|---------|--------|
| Funcionalidad | ✅ Muy buena |
| Estructura | ✅ Buena |
| Limpieza de código | ⚠️ Mejorable |
| Buenas prácticas | ⚠️ Mejorable |
| CSS / UI | ✅ Muy buena |

**Nota final**: Esta segunda revisión deja claro que la base del proyecto es sólida y que ya entendiste lo más importante del ejercicio. Las mejoras aplicadas aquí no corrigen un proyecto roto; lo empujan de “buen proyecto” a una versión más limpia, más consistente y más cercana a un 100/100.
