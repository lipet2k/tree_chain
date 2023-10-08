import torch.nn as nn

class Model(nn.Module):
    def __init__(self, num_classes):
        super(Model, self).__init__()

        self.conv1 = nn.Conv2d(in_channels=3, out_channels=3, kernel_size=5, stride=2)
        self.conv2 = nn.Conv2d(in_channels=3, out_channels=3, kernel_size=5, stride=2)

        self.relu = nn.ReLU()

        self.d1 = nn.Linear(3 * 5 * 5, 32)
        self.d2 = nn.Linear(32, num_classes)

    def forward(self, x):
        x = self.conv1(x)
        x = self.relu(x)
        x = self.conv2(x)
        x = self.relu(x)

        x = x.flatten(start_dim = 1)

        x = self.d1(x)
        x = self.relu(x)

        logits = self.d2(x)

        return logits