from flask import Flask, request, jsonify
from flask_cors import CORS
import csv

app = Flask(__name__)
CORS(app)

def read_csv():
    with open("data.csv", "r") as f:
        reader = csv.DictReader(f)
        diamonds = [dict(diamond) for diamond in reader]
        return diamonds

def write_csv(diamonds):
    with open("data.csv", "w") as f:
        writer = csv.DictWriter(f, fieldnames=["id", "carat", "cut", "color", "clarity", "depth", "table", "price", "x", "y", "z"])
        writer.writeheader()
        for i, diamond in enumerate(diamonds):
            diamond["id"] = i
            writer.writerow(diamond)

@app.route("/diamonds", methods=["GET", "POST"])
def diamonds():
    diamonds = read_csv()
    if request.method == "GET":
        # Read all diamonds from csv and return as json
        return jsonify(diamonds)
    elif request.method == "POST":
        # Create a new diamond and write to csv
        diamond = request.get_json()
        diamonds.append(diamond)
        write_csv(diamonds)
        # return jsonify({"message": "Diamond created successfully"})
        return diamond

@app.route("/diamonds/<int:id>", methods=["GET", "PUT", "DELETE"])
def diamond(id):
    diamonds = read_csv()
    diamond = next((d for d in diamonds if d["id"] == id), None)
    if not diamond:
        return jsonify({"error": "Diamond not found"}), 404
    if request.method == "GET":
        # Return a single diamond as json
        return jsonify(diamond)
    elif request.method == "PUT":
        # Update an existing diamond and write to csv
        update = request.get_json()
        diamond.update(update)
        write_csv(diamonds)
        return jsonify({"message": "Diamond updated successfully"})
    elif request.method == "DELETE":
        # Delete a diamond from csv
        diamonds.remove(diamond)
        write_csv(diamonds)
        return jsonify({"message": "Diamond deleted successfully"})

if __name__ == "__main__":
    app.run(debug=True)