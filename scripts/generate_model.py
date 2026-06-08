"""
Trains a small MNIST CNN and exports it to TF.js format.
Run once: python scripts/generate_model.py

Requires: pip install tensorflow tensorflowjs
"""
import os, sys

try:
    import tensorflow as tf
except ImportError:
    print("Installing tensorflow...")
    os.system(f"{sys.executable} -m pip install tensorflow-cpu")
    import tensorflow as tf

try:
    import tensorflowjs as tfjs
except ImportError:
    print("Installing tensorflowjs...")
    os.system(f"{sys.executable} -m pip install tensorflowjs")
    import tensorflowjs as tfjs

print(f"TensorFlow {tf.__version__}")

# Load and preprocess MNIST
(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()
x_train = x_train.reshape(-1, 28, 28, 1).astype("float32") / 255.0
x_test  = x_test.reshape(-1, 28, 28, 1).astype("float32") / 255.0
y_train = tf.keras.utils.to_categorical(y_train, 10)
y_test  = tf.keras.utils.to_categorical(y_test, 10)

# Lightweight CNN
model = tf.keras.Sequential([
    tf.keras.layers.Conv2D(32, 3, activation="relu", input_shape=(28, 28, 1)),
    tf.keras.layers.MaxPooling2D(2),
    tf.keras.layers.Conv2D(64, 3, activation="relu"),
    tf.keras.layers.MaxPooling2D(2),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(128, activation="relu"),
    tf.keras.layers.Dropout(0.25),
    tf.keras.layers.Dense(10, activation="softmax"),
])

model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])
model.summary()

print("\nTraining...")
model.fit(x_train, y_train, epochs=5, batch_size=128, validation_split=0.1, verbose=1)

loss, acc = model.evaluate(x_test, y_test, verbose=0)
print(f"\nTest accuracy: {acc*100:.2f}%")

# Export to TF.js
out_dir = os.path.join(os.path.dirname(__file__), "..", "public", "model")
os.makedirs(out_dir, exist_ok=True)
tfjs.converters.save_keras_model(model, out_dir)
print(f"\nModel exported to {os.path.abspath(out_dir)}")
print("Now restart: npm run dev")
