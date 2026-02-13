import sys
try:
    import tensorflow as tf
    print(f"TensorFlow {tf.__version__} loaded successfully!")
except ImportError as e:
    print(f"Failed to load TensorFlow: {e}")
except Exception as e:
    print(f"An error occurred: {e}")
