from flask import Flask, render_template, request, jsonify
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/calculate_age', methods=['POST'])
def calculate_age():
    dob_str = request.json['dob']
    dob = datetime.strptime(dob_str, '%Y-%m-%d')
    today = datetime.now()
    
    years = today.year - dob.year
    months = today.month - dob.month
    days = today.day - dob.day
    
    if days < 0:
        months -= 1
        days += 30
    
    if months < 0:
        years -= 1
        months += 12
    
    return jsonify({
        'years': years,
        'months': months,
        'days': days
    })

if __name__ == '__main__':
    app.run(debug=True)