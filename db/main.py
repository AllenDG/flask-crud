from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '12345'
app.config['MYSQL_DB'] = 'flask'

mysql = MySQL(app)
# ...

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password']
    cur = mysql.connection.cursor()
    cur.execute('INSERT INTO users (username, password) VALUES (%s, %s)', (username, password))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message': 'User registered successfully'})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM users WHERE username = %s AND password = %s', (username, password))
    user = cur.fetchone()
    cur.close()

    if user:
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

# ...


@app.route('/api/auth/logout', methods=['GET'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logout successful'})

@app.route('/employees', methods=['GET', 'POST', 'PUT', 'DELETE'])
def manage_employees():
    if request.method == 'GET':
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM employees")
        employees = cur.fetchall()
        return jsonify(employees)
    elif request.method == 'POST':
        data = request.get_json()
        name = data.get('name')
        job_title = data.get('job_title')
        department = data.get('department')
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO employees (name, job_title, department) VALUES (%s, %s, %s)", (name, job_title, department))
        mysql.connection.commit()
        return jsonify({'message': 'Employee created successfully'}), 201
    elif request.method == 'PUT':
        data = request.get_json()
        employee_id = data.get('id')
        name = data.get('name')
        job_title = data.get('job_title')
        department = data.get('department')
        cur = mysql.connection.cursor()
        cur.execute(
                "UPDATE employees SET name=%s, job_title=%s, department=%s WHERE id=%s",
                (name, job_title,employee_id, 11)
            )
        mysql.connection.commit()
        return {"message": "Employee updated successfully"}, 200
     
    elif request.method == 'DELETE':
        employee_id = request.args.get('id')
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM employees WHERE id = %s", (employee_id,))
        mysql.connection.commit()
        return jsonify({'message': 'Employee deleted successfully'})
# CRUD operations and other API routes can be added here

if __name__ == '__main__':
    app.run(debug=True)
