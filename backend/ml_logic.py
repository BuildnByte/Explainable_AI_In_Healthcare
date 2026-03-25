import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import shap
import lime
import lime.lime_tabular
import pickle
import os

# Features based on Huntington's Disease Dataset
FEATURES = [
    "HTT_CAG_Repeat_Length",
    "Motor_Symptoms",
    "Cognitive_Decline",
    "Chorea_Score",
    "Brain_Volume_Loss",
    "Functional_Capacity",
    "HTT_Gene_Expression_Level",
    "Protein_Aggregation_Level"
]

TARGET = "Disease_Stage"
STAGES = ["Pre-Symptomatic", "Early", "Middle", "Late"]

MODEL_PATH = "model.pkl"

def generate_synthetic_data(n_samples=500):
    np.random.seed(42)
    data = {
        "HTT_CAG_Repeat_Length": np.random.randint(36, 60, n_samples),
        "Motor_Symptoms": np.random.uniform(0, 50, n_samples),
        "Cognitive_Decline": np.random.uniform(0, 30, n_samples),
        "Chorea_Score": np.random.uniform(0, 10, n_samples),
        "Brain_Volume_Loss": np.random.uniform(0.01, 0.1, n_samples),
        "Functional_Capacity": np.random.uniform(0, 15, n_samples),
        "HTT_Gene_Expression_Level": np.random.uniform(1, 5, n_samples),
        "Protein_Aggregation_Level": np.random.uniform(0, 100, n_samples)
    }
    
    # Simple logic for synthetic target
    # Higher CAG and lower Functional Capacity -> Late stage
    score = (data["HTT_CAG_Repeat_Length"] - 36) / 24 + \
            (data["Motor_Symptoms"] / 50) - \
            (data["Functional_Capacity"] / 15)
    
    stages = []
    for s in score:
        if s < 0.2: stages.append("Pre-Symptomatic")
        elif s < 0.5: stages.append("Early")
        elif s < 0.8: stages.append("Middle")
        else: stages.append("Late")
        
    df = pd.DataFrame(data)
    df[TARGET] = stages
    return df

def train_stub_model():
    df = generate_synthetic_data()
    X = df[FEATURES]
    y = df[TARGET]
    
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y)
    
    with open(MODEL_PATH, "wb") as f:
        pickle.dump(model, f)
    
    return model, df

def get_model():
    if not os.path.exists(MODEL_PATH):
        return train_stub_model()
    
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    
    # Need synthetic data for explainers
    df = generate_synthetic_data()
    return model, df

model, background_df = get_model()
explainer_shap = shap.TreeExplainer(model)
explainer_lime = lime.lime_tabular.LimeTabularExplainer(
    background_df[FEATURES].values,
    feature_names=FEATURES,
    class_names=model.classes_,
    mode="classification"
)

def get_explanation(patient_data: dict):
    try:
        # Prepare input
        patient_df = pd.DataFrame([patient_data])[FEATURES]
        
        # Prediction
        probs = model.predict_proba(patient_df)[0]
        pred_idx = np.argmax(probs)
        prediction = model.classes_[pred_idx]
        confidence = float(probs[pred_idx] * 100)
        
        # SHAP Explanations (Global model weights for this prediction)
        shap_dict = {}
        try:
            shap_values = explainer_shap.shap_values(patient_df)
            
            # Handle different SHAP output formats (list for classes or single array)
            if isinstance(shap_values, list):
                # Standard for many sklearn classifiers in older SHAP
                class_shap = shap_values[pred_idx][0]
            elif isinstance(shap_values, np.ndarray) and len(shap_values.shape) == 3:
                # Newer SHAP format (n_samples, n_features, n_outputs)
                class_shap = shap_values[0, :, pred_idx]
            else:
                # Fallback
                class_shap = shap_values[0] if len(shap_values.shape) == 2 else shap_values
            
            shap_dict = {feat: float(val) for feat, val in zip(FEATURES, class_shap)}
        except Exception as e:
            print(f"SHAP Error: {e}")
            shap_dict = {feat: 0.0 for feat in FEATURES} # Fallback
        
        # LIME Explanations (Local instance weighting)
        lime_dict = {}
        try:
            lime_exp = explainer_lime.explain_instance(
                patient_df.values[0], 
                model.predict_proba, 
                num_features=len(FEATURES),
                labels=(pred_idx,)
            )
            
            lime_list = lime_exp.as_list(label=pred_idx)
            for feat_expr, weight in lime_list:
                for f in FEATURES:
                    if f in feat_expr:
                        lime_dict[f] = float(weight)
                        break
        except Exception as e:
            print(f"LIME Error: {e}")
            lime_dict = {feat: 0.0 for feat in FEATURES} # Fallback
                    
        return {
            "prediction": prediction,
            "confidence": confidence,
            "shap": shap_dict,
            "lime": lime_dict,
            "raw_features": patient_data
        }
    except Exception as e:
        print(f"General Prediction Error: {e}")
        raise e
