from distutils.log import debug
import pickle
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


model = pickle.load(open("yield.pkl", "rb"))
crop = pickle.load(open("crop.pkl", "rb"))


@app.route("/predict", methods=["POST"])
def crop_prediction():
    print(f"Starting")
    data = request.get_json()
    selected_values = data.get("selectedValues")
    if request.method == "POST":
        state = int(selected_values[0])
        soil = int(selected_values[1])
        area = int(selected_values[2])
        final_features = [np.array([state, soil, area])]
        prediction = crop.predict(final_features)
        preds = format((prediction[0]))

        body = {}
        data = {}

        data["class"] = preds
        body["data"] = data
        response = jsonify(body)
        return response


@app.route("/yieldpredict", methods=["POST"])
def yield_prediction():
    print(f"Starting")
    data = request.get_json()
    selected_values = data.get("selectedValues")
    if request.method == "POST":
        state = int(selected_values[0])
        crop = int(selected_values[1])
        area = int(selected_values[2])
        soil = int(selected_values[3])
        pred_args = [state, crop, area, soil]
        pred_args_arr = np.array(pred_args)
        pred_args_arr = pred_args_arr.reshape(1, -1)
        output = model.predict(pred_args_arr)
        print(output)
        pred = format(int(output[0]))
        Yield = int(pred) / float(area)
        yields = Yield * 1000

        body = {}
        data = {}

        data["class"] = str(yields)
        body["data"] = data
        response = jsonify(body)
        return response


if __name__ == "__main__":
    app.debug = True
    app.run(port=5000, threaded=True)
