from flask import Flask, render_template, request, jsonify
from flask_cors import CORS  # Importa CORS

app = Flask(__name__)

# Habilitar CORS para todas las rutas y orígenes
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/multiply_matrices', methods=['POST'])
def multiply_matrices():
    data = request.get_json()

    rows1 = data['rows1']
    cols1 = data['cols1']
    rows2 = data['rows2']
    cols2 = data['cols2']

    matrix1 = data['matrix1']
    matrix2 = data['matrix2']

    if cols1 != rows2:
        return jsonify({'error': 'El número de columnas de la Matriz 1 debe ser igual al número de filas de la Matriz 2 para poder multiplicarlas.'}), 400

    result_matrix = [[0] * cols2 for _ in range(rows1)]

    for i in range(rows1):
        for j in range(cols2):
            for k in range(cols1):
                result_matrix[i][j] += matrix1[i][k] * matrix2[k][j]

    return jsonify({'result': result_matrix})

if __name__ == '__main__':
    app.run(debug=True)
