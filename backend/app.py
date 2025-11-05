from flask import Flask, jsonify
import model_logic 
import os


if not os.path.exists("orders.json"):
    print("orders.json not found. Running data generators...")
  
    os.system("python ../MockOrders.py") 
    
    print("Data generation complete.")


app = Flask(__name__)

@app.route("/api/forecast")
def get_forecast():
    """
    API endpoint to get the demand forecast and recommendations.
    """
    try:
        #Run the model logic
        forecast_df, recommendations_df = model_logic.run_demand_forecast()
      
        future_forecast_json = forecast_df[forecast_df['ds'] > pd.Timestamp.now()].to_dict(orient='records')
        recommendations_json = recommendations_df.to_dict(orient='records')
        
        #
        return jsonify({
            "forecast": future_forecast_json,
            "recommendations": recommendations_json
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    
    app.run(debug=True, host='0.0.0.0', port=5000)
