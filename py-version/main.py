from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def multiply_matrices(matrix1, matrix2):
    rows_a = len(matrix1)
    cols_a = len(matrix1[0])
    rows_b = len(matrix2)
    cols_b = len(matrix2[0])
    
    if cols_a != rows_b:
        return {"error": "Las dimensiones de las matrices no permiten la multiplicación"}
    
    result = [[0 for _ in range(cols_b)] for _ in range(rows_a)]
    
    for i in range(rows_a):
        for j in range(cols_b):
            for k in range(cols_a):
                result[i][j] += matrix1[i][k] * matrix2[k][j]
    
    return {"result": result}

@app.route("/multiply", methods=["POST"])
def multiply():
    data = request.get_json()
    matrix1 = data.get("matrix1")
    matrix2 = data.get("matrix2")
    
    if not isinstance(matrix1, list) or not isinstance(matrix2, list):
        return jsonify({"error": "Datos inválidos"}), 400
    
    multiplication_result = multiply_matrices(matrix1, matrix2)
    return jsonify(multiplication_result)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
