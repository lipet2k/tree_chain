import torch
import torch.nn as nn
import requests
import torchvision.transforms as transforms
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from PIL import Image

from io import BytesIO
from model import Model

app = Flask(__name__)
CORS(app)

class_labels = ["orchid", "poppy", "rose", "sunflower", "tulip", "maple_tree", "oak_tree", "palm_tree", "pine_tree", "willow_tree"]

model = Model(num_classes=10)
model.load_state_dict(torch.load('./cifar100_cnn_model.pth'))  # Load your trained model
model.eval()

@app.route('/classify')
@cross_origin()
def post_data():
    if request.method == 'GET':
        try:
            url = request.args.get('url')
            response = requests.get(url)
            image = Image.open(BytesIO(response.content))
            image = image.resize((32, 32), resample=Image.NEAREST)

            transform = transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))])
            input_data = transform(image).unsqueeze(0)  # Add batch dimension

            with torch.no_grad():
                output = model(input_data)

            softmax = nn.Softmax(dim=1)
            probs = softmax(output)

            _, predicted_class = torch.max(probs, 1)

            predicted_label = class_labels[predicted_class.item()]

            return jsonify({"result": predicted_label}), 200

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return jsonify({"error": "Invalid request method"}), 400

if __name__ == '__main__':
    app.run(debug=True)
