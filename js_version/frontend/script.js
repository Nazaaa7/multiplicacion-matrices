function createMatrixInputs() {
    const rows1 = parseInt(document.getElementById('rows1').value);
    const cols1 = parseInt(document.getElementById('cols1').value);
    const rows2 = parseInt(document.getElementById('rows2').value);
    const cols2 = parseInt(document.getElementById('cols2').value);

    // Validar que las matrices se puedan multiplicar
    if (cols1 !== rows2) {
        alert('El número de columnas de la Matriz 1 debe ser igual al número de filas de la Matriz 2.');
        return;
    }

    // Limpiar entradas previas
    document.getElementById('matrices').innerHTML = '';

    const matricesDiv = document.getElementById('matrices');

    // Crear entradas para la Matriz 1
    const matrix1Div = document.createElement('div');
    matrix1Div.classList.add('matrix');
    matrix1Div.innerHTML = `<h3>Matriz 1 (${rows1} x ${cols1})</h3>`;
    for (let i = 0; i < rows1; i++) {
        for (let j = 0; j < cols1; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `a${i}${j}`;
            matrix1Div.appendChild(input);
        }
    }

    // Crear entradas para la Matriz 2
    const matrix2Div = document.createElement('div');
    matrix2Div.classList.add('matrix');
    matrix2Div.innerHTML = `<h3>Matriz 2 (${rows2} x ${cols2})</h3>`;
    for (let i = 0; i < rows2; i++) {
        for (let j = 0; j < cols2; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `b${i}${j}`;
            matrix2Div.appendChild(input);
        }
    }

    matricesDiv.appendChild(matrix1Div);
    matricesDiv.appendChild(matrix2Div);
}

function multiplyMatrices() {
    const rows1 = parseInt(document.getElementById('rows1').value);
    const cols1 = parseInt(document.getElementById('cols1').value);
    const rows2 = parseInt(document.getElementById('rows2').value);
    const cols2 = parseInt(document.getElementById('cols2').value);

    // Validar que los campos estén completos
    if (isNaN(rows1) || isNaN(cols1) || isNaN(rows2) || isNaN(cols2)) {
        alert('Por favor, ingrese números válidos para las filas y columnas.');
        return;
    }

    // Validar que las matrices se puedan multiplicar
    if (cols1 !== rows2) {
        alert('El número de columnas de la Matriz 1 debe ser igual al número de filas de la Matriz 2.');
        return;
    }

    // Crear matrices a partir de los inputs
    const matrix1 = [];
    const matrix2 = [];

    // Llenar Matriz 1
    for (let i = 0; i < rows1; i++) {
        matrix1[i] = [];
        for (let j = 0; j < cols1; j++) {
            const val = parseFloat(document.getElementById(`a${i}${j}`).value);
            if (isNaN(val)) {
                alert('Todos los campos deben ser numéricos.');
                return;
            }
            matrix1[i][j] = val;
        }
    }

    // Llenar Matriz 2
    for (let i = 0; i < rows2; i++) {
        matrix2[i] = [];
        for (let j = 0; j < cols2; j++) {
            const val = parseFloat(document.getElementById(`b${i}${j}`).value);
            if (isNaN(val)) {
                alert('Todos los campos deben ser numéricos.');
                return;
            }
            matrix2[i][j] = val;
        }
    }

    // Realizar la multiplicación de matrices
    let result = new Array(rows1).fill().map(() => new Array(cols2).fill(0));
    for (let i = 0; i < rows1; i++) {
        for (let j = 0; j < cols2; j++) {
            for (let k = 0; k < cols1; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }

    // Mostrar el resultado
    let resultHtml = '<h3>Resultado:</h3><table>';
    for (let i = 0; i < rows1; i++) {
        resultHtml += '<tr>';
        for (let j = 0; j < cols2; j++) {
            resultHtml += `<td>${result[i][j]}</td>`;
        }
        resultHtml += '</tr>';
    }
    resultHtml += '</table>';
    document.getElementById('result').innerHTML = resultHtml;
}
