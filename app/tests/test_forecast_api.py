"""
Tests for forecast API endpoints.
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services.model_logic import ALLOWED_LOCATIONS

client = TestClient(app)


def test_forecast_endpoint_valid_location():
    """Test forecast endpoint with valid location."""
    for location in ALLOWED_LOCATIONS:
        response = client.get(f"/api/v1/forecast/demand?location={location}")
        
        # Should return 200 or 404 (if no data), but not 400
        assert response.status_code in [200, 404], f"Unexpected status for {location}: {response.status_code}"
        
        if response.status_code == 200:
            data = response.json()
            assert "location" in data
            assert "forecast" in data
            assert "recommendations" in data
            assert data["location"] == location


def test_forecast_endpoint_invalid_location():
    """Test forecast endpoint with invalid location."""
    response = client.get("/api/v1/forecast/demand?location=InvalidLocation")
    
    assert response.status_code == 400
    data = response.json()
    assert "detail" in data
    assert "Invalid location" in data["detail"]


def test_forecast_endpoint_missing_location():
    """Test forecast endpoint without location parameter."""
    response = client.get("/api/v1/forecast/demand")
    
    # Should return 422 (validation error) since location is required
    assert response.status_code == 422


def test_forecast_endpoint_response_structure():
    """Test that forecast endpoint returns correct structure."""
    # This test assumes orders.json exists with data
    response = client.get("/api/v1/forecast/demand?location=Plano")
    
    if response.status_code == 200:
        data = response.json()
        
        # Check response structure
        assert "location" in data
        assert "forecast" in data
        assert "recommendations" in data
        
        # Check forecast structure
        if data["forecast"]:
            forecast_item = data["forecast"][0]
            assert "ds" in forecast_item
            assert "yhat" in forecast_item
            assert "yhat_lower" in forecast_item
            assert "yhat_upper" in forecast_item
        
        # Check recommendations structure
        if data["recommendations"]:
            rec_item = data["recommendations"][0]
            assert "ds" in rec_item
            assert "yhat" in rec_item
            assert "recommendation" in rec_item
            assert "location" in rec_item


@pytest.mark.parametrize("location", ALLOWED_LOCATIONS)
def test_forecast_endpoint_all_locations(location):
    """Test forecast endpoint for all allowed locations."""
    response = client.get(f"/api/v1/forecast/demand?location={location}")
    
    # Should not return 400 (invalid location)
    assert response.status_code != 400, f"Location {location} should be valid"
    
    if response.status_code == 200:
        data = response.json()
        assert data["location"] == location

