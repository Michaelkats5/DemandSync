"""
Tests for model_logic.py demand forecasting functionality.
"""
import pytest
import pandas as pd
import json
from pathlib import Path
from app.services.model_logic import run_demand_forecast, ALLOWED_LOCATIONS


@pytest.fixture
def sample_orders_data():
    """Create sample orders.json data for testing."""
    base_date = pd.Timestamp('2024-01-01')
    orders = []
    
    for location in ALLOWED_LOCATIONS:
        for i in range(30):
            orders.append({
                "order_date": (base_date + pd.Timedelta(days=i)).strftime("%Y-%m-%d"),
                "location": location,
                "item_id": i % 10 + 1,
                "quantity": 10 + (i % 5),
                "unit_cost": 5.0 + (i % 3)
            })
    
    return orders


@pytest.fixture
def temp_orders_file(tmp_path, sample_orders_data):
    """Create a temporary orders.json file for testing."""
    orders_file = tmp_path / "orders.json"
    with open(orders_file, 'w') as f:
        json.dump(sample_orders_data, f)
    return orders_file


def test_allowed_locations():
    """Test that only the four allowed locations are defined."""
    assert len(ALLOWED_LOCATIONS) == 4
    assert "Plano" in ALLOWED_LOCATIONS
    assert "Addison" in ALLOWED_LOCATIONS
    assert "Uptown" in ALLOWED_LOCATIONS
    assert "Irving" in ALLOWED_LOCATIONS


def test_run_demand_forecast_invalid_location():
    """Test that invalid locations raise ValueError."""
    with pytest.raises(ValueError, match="Invalid location"):
        run_demand_forecast("InvalidLocation")


def test_run_demand_forecast_requires_location():
    """Test that location parameter is required (no None allowed)."""
    with pytest.raises(TypeError):
        run_demand_forecast(None)


@pytest.mark.parametrize("location", ALLOWED_LOCATIONS)
def test_run_demand_forecast_each_location(location, tmp_path, sample_orders_data, monkeypatch):
    """Test forecast for each allowed location."""
    # Create temporary orders.json
    orders_file = tmp_path / "orders.json"
    with open(orders_file, 'w') as f:
        json.dump(sample_orders_data, f)
    
    # Monkeypatch Path to use tmp_path
    original_cwd = Path.cwd()
    monkeypatch.chdir(tmp_path)
    
    try:
        forecast_df, recommendations_df = run_demand_forecast(location)
        
        # Verify forecast DataFrame structure
        assert not forecast_df.empty, f"Forecast should not be empty for {location}"
        assert "ds" in forecast_df.columns
        assert "yhat" in forecast_df.columns
        assert "yhat_lower" in forecast_df.columns
        assert "yhat_upper" in forecast_df.columns
        
        # Verify recommendations DataFrame structure
        assert not recommendations_df.empty, f"Recommendations should not be empty for {location}"
        assert "ds" in recommendations_df.columns
        assert "yhat" in recommendations_df.columns
        assert "recommendation" in recommendations_df.columns
        assert "location" in recommendations_df.columns
        
        # Verify location is set correctly
        assert all(recommendations_df["location"] == location)
        
        # Verify forecast has future dates (30 days)
        assert len(forecast_df) >= 30
        
    finally:
        monkeypatch.chdir(original_cwd)


def test_run_demand_forecast_different_data_per_location(tmp_path, monkeypatch):
    """Test that different locations produce different forecasts when data differs."""
    # Create orders with different patterns per location
    orders = []
    base_date = pd.Timestamp('2024-01-01')
    
    for i, location in enumerate(ALLOWED_LOCATIONS):
        # Each location has different demand pattern
        multiplier = (i + 1) * 10
        for day in range(30):
            orders.append({
                "order_date": (base_date + pd.Timedelta(days=day)).strftime("%Y-%m-%d"),
                "location": location,
                "item_id": 1,
                "quantity": multiplier + (day % 5),
                "unit_cost": 5.0
            })
    
    orders_file = tmp_path / "orders.json"
    with open(orders_file, 'w') as f:
        json.dump(orders, f)
    
    monkeypatch.chdir(tmp_path)
    
    forecasts = {}
    for location in ALLOWED_LOCATIONS:
        forecast_df, _ = run_demand_forecast(location)
        forecasts[location] = forecast_df["yhat"].mean()
    
    # Verify forecasts are different (at least some variation)
    unique_forecasts = len(set(round(f, 2) for f in forecasts.values()))
    assert unique_forecasts > 1, "Different locations should produce different forecasts"


def test_run_demand_forecast_empty_data(tmp_path, monkeypatch):
    """Test handling of empty data for a location."""
    # Create orders.json with no data for a specific location
    orders = [{
        "order_date": "2024-01-01",
        "location": "Plano",
        "item_id": 1,
        "quantity": 10,
        "unit_cost": 5.0
    }]
    
    orders_file = tmp_path / "orders.json"
    with open(orders_file, 'w') as f:
        json.dump(orders, f)
    
    monkeypatch.chdir(tmp_path)
    
    # Try to forecast for location with no data
    forecast_df, recommendations_df = run_demand_forecast("Addison")
    
    # Should return empty DataFrames
    assert forecast_df.empty
    assert recommendations_df.empty

