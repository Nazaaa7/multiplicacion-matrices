import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/multiplicar-matrices', (req, res) => {
    const { matriz1, matriz2 } = req.body;
    const filasA = matriz1.length;
    const columnasA = matriz1[0].length;
    const filasB = matriz2.length;
    const columnasB = matriz2[0].length;

    // Validar que el número de columnas de la primera matriz sea igual al número de filas de la segunda
    if (columnasA !== filasB) {
        return res.status(400).json({ error: 'Las matrices no se pueden multiplicar' });
    }

    const resultado = Array(filasA).fill().map(() => Array(columnasB).fill(0));

    // Realizar la multiplicación de matrices
    for (let i = 0; i < filasA; i++) {
        for (let j = 0; j < columnasB; j++) {
            for (let k = 0; k < columnasA; k++) {
                resultado[i][j] += matriz1[i][k] * matriz2[k][j];
            }
        }
    }

    res.json({ resultado });
});

app.listen(5000, () => console.log('Servidor en http://localhost:5000'));
