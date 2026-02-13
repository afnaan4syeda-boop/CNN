try:
    from sklearn.ensemble import RandomForestClassifier
    import joblib
    import numpy as np
    
    X = np.array([[0, 0], [1, 1]])
    y = np.array([0, 1])
    clf = RandomForestClassifier(n_estimators=10)
    clf.fit(X, y)
    print("Scikit-learn runs successfully!")
except ImportError as e:
    print(f"Import failed: {e}")
except Exception as e:
    print(f"Error: {e}")
