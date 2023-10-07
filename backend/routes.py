import os
import json
import torch
import PIL
import torchvision.transforms as transforms
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from PIL import Image
import ezkl

app = Flask(__name__)

# Define paths (ensure directories exist)
model_path = './model_outputs/network.onnx'
compiled_model_path = './model_outputs/network.compiled'
pk_path = './model_outputs/test.pk'
vk_path = './model_outputs/test.vk'
settings_path = './model_outputs/settings.json'
srs_path = './model_outputs/kzg.srs'
witness_path = './model_outputs/witness.json'
data_path = './model_outputs/input.json'
proof_path = './model_outputs/test.pf'

# Ensure directories exist
for dir_path in [
    './model_outputs',
    './model_outputs/resources',
]:
    os.makedirs(dir_path, exist_ok=True)

@app.route('/prove', methods=['POST'])
@cross_origin()
def post_data():
    if request.method == 'POST':
        try:
            image = request.files.get('image')
            image = Image.open(image)
            image = image.resize((32, 32), resample=Image.NEAREST)

            transform = transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))])
            input_data = transform(image).numpy().reshape([-1]).tolist()
            data = dict(input_data=[input_data])
            with open(data_path, 'w') as data_file:
                json.dump(data, data_file)

            py_run_args = ezkl.PyRunArgs()
            py_run_args.input_visibility = "public"
            py_run_args.output_visibility = "public"
            py_run_args.param_visibility = "private"

            assert ezkl.gen_settings(model_path, settings_path, py_run_args=py_run_args)
            assert ezkl.calibrate_settings(data_path, model_path, settings_path, "resources")

            assert ezkl.compile_circuit(model_path, compiled_model_path, settings_path)

            # srs path
            assert ezkl.get_srs(srs_path, settings_path)

            # now generate the witness file
            assert ezkl.gen_witness(data_path, compiled_model_path, witness_path)

            assert ezkl.setup(compiled_model_path, vk_path, pk_path, srs_path)

            proof = ezkl.prove(witness_path, compiled_model_path, pk_path, proof_path, srs_path, "single")

            assert os.path.isfile(proof_path)

            return jsonify({"message": "Proof generated successfully"}), 200

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return jsonify({"error": "Invalid request method"}), 400

if __name__ == '__main__':
    app.run(debug=True)
