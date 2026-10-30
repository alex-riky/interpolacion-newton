# Interpolación polinomial de Newton

Programa del laboratorio de Métodos Numéricos. Automatiza el método de Newton mediante diferencias divididas para una cantidad variable de nodos distintos, incluso si no son equidistantes.

## Abrir el programa

1. Descarga `Interpolacion_Newton.html` (botón **Download raw file** en GitHub).
2. Abre el archivo con Chrome, Edge o Firefox.
3. Ingresa un par `x, y` por línea y pulsa **Calcular polinomio**.

No necesita instalación, servidor, conexión a internet ni bibliotecas externas. El cálculo se realiza localmente en el navegador con JavaScript.

## Funciones

- Tabla completa de diferencias divididas y coeficientes de Newton.
- Polinomio en forma de Newton y forma desarrollada.
- Evaluación en cualquier valor finito de x mediante multiplicación anidada.
- Detección de nodos repetidos, datos inválidos y resultados fuera del rango numérico.
- Identificación de extrapolaciones y comprobación del residuo en los nodos.
- Descarga del procedimiento como texto e impresión.

## Ejemplo

```text
-1, 2
0, 1
2, 5
3, 22
```

Resultado: `P(x) = x^3 - 2x + 1`; al evaluar en `x = 1`, se obtiene `P(1) = 0`.

## Método

La primera columna contiene `D[i,0] = y[i]`. Las siguientes se calculan con:

```text
D[i,j] = (D[i+1,j-1] - D[i,j-1]) / (x[i+j] - x[i])
a[j] = D[0,j]
P(x) = a[0] + a[1](x-x[0]) + a[2](x-x[0])(x-x[1]) + ...
```

Con n nodos distintos, el grado máximo es n-1. Se usa doble precisión; grados elevados y nodos muy cercanos pueden generar errores de redondeo.

## Pruebas

El archivo `pruebas_newton.cjs` ejecuta nueve pruebas sobre el mismo núcleo JavaScript extraído del HTML. Requiere Node.js solamente para ejecutar las pruebas:

```sh
node pruebas_newton.cjs
```

Se verifican polinomios cúbicos y de grado 6, nodos no equidistantes o desordenados, interpolación constante, el polinomio cero, notación científica y rechazo de entradas inválidas.
