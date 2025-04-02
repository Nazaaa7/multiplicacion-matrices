document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("rows1").addEventListener("change", createMatrixInputs);
    document.getElementById("cols1").addEventListener("change", createMatrixInputs);
    document.getElementById("rows2").addEventListener("change", createMatrixInputs);
    document.getElementById("cols2").addEventListener("change", createMatrixInputs);
});

function createMatrixInputs() {
    const rows1 = parseInt(document.getElementById("rows1").value) || 0;
    const cols1 = parseInt(document.getElementById("cols1").value) || 0;
    const rows2 = parseInt(document.getElementById("rows2").value) || 0;
    const cols2 = parseInt(document.getElementById("cols2").value) || 0;
    
    if (cols1 !== rows2) {
        document.getElementById("matrices").innerHTML = "Las columnas de la Matriz 1 deben coincidir con las filas de la Matriz 2.";
        return;
    }
    
    let html = "<h3>Matriz 1</h3>" + createMatrixTable("matrix1", rows1, cols1);
    html += "<h3>Matriz 2</h3>" + createMatrixTable("matrix2", rows2, cols2);
    document.getElementById("matrices").innerHTML = html;
}

function createMatrixTable(id, rows, cols) {
    let table = "<table>";
    for (let i = 0; i < rows; i++) {
        table += "<tr>";
        for (let j = 0; j < cols; j++) {
            table += `<td><input type='number' id='${id}-${i}-${j}'></td>`;
        }
        table += "</tr>";
    }
    table += "</table>";
    return table;
}

async function multiplyMatrices() {
    const rows1 = parseInt(document.getElementById("rows1").value) || 0;
    const cols1 = parseInt(document.getElementById("cols1").value) || 0;
    const rows2 = parseInt(document.getElementById("rows2").value) || 0;
    const cols2 = parseInt(document.getElementById("cols2").value) || 0;
    
    let matrix1 = [], matrix2 = [];
    for (let i = 0; i < rows1; i++) {
        matrix1[i] = [];
        for (let j = 0; j < cols1; j++) {
            matrix1[i][j] = parseInt(document.getElementById(`matrix1-${i}-${j}`).value) || 0;
        }
    }
    for (let i = 0; i < rows2; i++) {
        matrix2[i] = [];
        for (let j = 0; j < cols2; j++) {
            matrix2[i][j] = parseInt(document.getElementById(`matrix2-${i}-${j}`).value) || 0;
        }
    }
    
    const response = await fetch("http://127.0.0.1:5000/multiply_matrices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows1, cols1, rows2, cols2, matrix1, matrix2 })
    });
    
    const result = await response.json();
    if (response.ok) {
        displayResult(result.result);
    } else {
        document.getElementById("result").innerHTML = `<p style='color: red;'>${result.error}</p>`;
    }
}

function displayResult(matrix) {
    let html = "<h3>Resultado</h3><table>";
    matrix.forEach(row => {
        html += "<tr>" + row.map(value => `<td>${value.toFixed(2)}</td>`).join("") + "</tr>";
    });
    html += "</table>";
    document.getElementById("result").innerHTML = html;
}
