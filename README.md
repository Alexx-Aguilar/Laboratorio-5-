# Laboratorio 5: API REST con Express, Swagger y DeepSeek

**Integrante:** Alex Aguilar (trabajo individual)

API de notas en memoria con operaciones CRUD, validación con Zod, documentación OpenAPI/Swagger e integración de DeepSeek desde el backend mediante el SDK oficial de OpenAI en modo compatible.

## Requisitos

- Node.js 20 o superior y npm.
- Una API key de DeepSeek con saldo disponible.

## Instalación y ejecución

```bash
npm install
```

Crea `.env` en la raíz, basándote en `.env.example`, y agrega tu clave de DeepSeek. No compartas ni subas ese archivo.

```bash
npm run dev
```

Abre `http://localhost:3000/api-docs` para probar la API. `npm start` inicia el servidor sin nodemon.

## Variables de entorno

| Variable | Uso |
| --- | --- |
| `DEEPSEEK_API_KEY` | Clave privada leída por el SDK en el backend |
| `DEEPSEEK_MODEL` | Modelo de DeepSeek; el ejemplo usa `deepseek-v4-flash` |
| `PORT` | Puerto HTTP del servidor |

El servicio usa `https://api.deepseek.com` y el formato compatible Chat Completions. El nombre del modelo disponible puede depender de los modelos habilitados en tu cuenta.

## Endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/notas` | Lista notas |
| GET | `/api/notas/:id` | Obtiene una nota |
| POST | `/api/notas` | Crea una nota |
| DELETE | `/api/notas/:id` | Elimina una nota |
| POST | `/api/ia/preguntar` | Envía una pregunta a DeepSeek |
| POST | `/api/notas/:id/resumen` | Resume una nota en tres viñetas |
| GET | `/api-docs` | Swagger UI |

Las notas se guardan en memoria y se borran al reiniciar el proceso.

## Pruebas manuales sugeridas

Desde Swagger UI, crea dos notas, lista las notas, consulta una nota inexistente (404), envía `{}` al endpoint de creación (400), prueba una pregunta de una letra (400), pregunta a DeepSeek, resume una nota existente y elimina una nota. Las llamadas de IA pueden generar cargos según el saldo y las tarifas de la cuenta.

El documento ordenado de evidencias, con capturas de Swagger agrupadas por prueba, está en [`docs/evidencias.html`](docs/evidencias.html). Los PNG originales se guardan en `docs/capturas/`; no se incluye la captura de terminal que muestra el valor temporal usado para probar una clave inválida. Registra los `prompt_tokens` y `completion_tokens` que devuelve DeepSeek en dos llamadas; la API los agrupa en el objeto `uso`.

## Reflexión

1. La API key no debe estar en el frontend porque el navegador descarga y expone el código y las solicitudes que hace. Cualquier persona podría inspeccionar el código o la pestaña de red, copiar la clave y usar el saldo asociado. El backend conserva la clave y el cliente solo habla con nuestra API.
2. Si DeepSeek devuelve 401, nuestra API lo convierte en `502` con `{ "error": "IA_NO_DISPONIBLE" }`. El 401 original indica un problema de credenciales entre nuestro servidor y DeepSeek, y reenviar detalles internos expondría información innecesaria al cliente.
3. `system` define el rol, idioma o formato que debe seguir el modelo; `messages` contiene la conversación y la solicitud del usuario. En el resumen, `system` instruye resumir en tres viñetas y el contenido de la nota se envía como mensaje.
4. En la primera llamada registrada se obtuvieron 55 `prompt_tokens` y 57 `completion_tokens`; en la segunda, 48 `prompt_tokens` y 87 `completion_tokens`. `max_tokens` limita la longitud de la salida.
5. Sin validar se podrían enviar cuerpos vacíos o de formato incorrecto y causar errores; además, preguntas demasiado largas o vacías podrían consumir saldo, degradar el servicio o facilitar abuso.
6. Trabajo individual: no hubo integración de ramas con otra persona. Si el docente requiere documentar un conflicto, describe uno real solo si sucede; no inventes uno.

## Colaboración y entrega

Este proyecto se realizó individualmente por Alex Aguilar con autorización del docente. Repositorio: https://github.com/Alexx-Aguilar/Laboratorio-5-.git. Guarda las capturas de evidencia en `docs/`. Completa el formulario de coevaluación individual si el docente indica que aplica.
