function createMatrixInputs() {
    const rows1 = parseInt(document.getElementById('rows1').value);
    const cols1 = parseInt(document.getElementById('cols1').value);
    const rows2 = parseInt(document.getElementById('rows2').value);
    const cols2 = parseInt(document.getElementById('cols2').value);
    if (cols1 !== rows2) {
        alert('El número de columnas de la Matriz 1 debe ser igual al número de filas de la Matriz 2.');
        return;
    }

    const matricesDiv = document.getElementById('matrices');
    matricesDiv.innerHTML = '';

    const matrix1 = tf.randomUniform([rows1, cols1], 0, 10, 'int32');
    const matrix2 = tf.randomUniform([rows2, cols2], 0, 10, 'int32');

    matrix1.array().then(arr1 => {
        const matrix1Div = document.createElement('div');
        matrix1Div.classList.add('matrix');
        matrix1Div.innerHTML = `<h3>Matriz 1 (${rows1} x ${cols1})</h3>`;
        arr1.forEach(row => {
            matrix1Div.innerHTML += row.join(' ') + '<br>';
        });
        matricesDiv.appendChild(matrix1Div);
    });

    matrix2.array().then(arr2 => {
        const matrix2Div = document.createElement('div');
        matrix2Div.classList.add('matrix');
        matrix2Div.innerHTML = `<h3>Matriz 2 (${rows2} x ${cols2})</h3>`;
        arr2.forEach(row => {
            matrix2Div.innerHTML += row.join(' ') + '<br>';
        });
        matricesDiv.appendChild(matrix2Div);
    });

    // Guardar matrices en variables globales
    window.matrix1 = matrix1;
    window.matrix2 = matrix2;
}

function multiplyMatrices() {
    if (!window.matrix1 || !window.matrix2) {
        alert("Primero generá las matrices.");
        return;
    }

    const result = tf.matMul(window.matrix1, window.matrix2);

    result.array().then(arr => {
        let resultHtml = '<h3>Resultado:</h3><table>';
        arr.forEach(row => {
            resultHtml += '<tr>' + row.map(val => `<td>${val}</td>`).join('') + '</tr>';
        });
        resultHtml += '</table>';
        document.getElementById('result').innerHTML = resultHtml;
    });
}
