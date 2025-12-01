/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ForecastDisplay } from '../ForecastDisplay';
import { getDemandForecast } from '../../api';

// Mock the API
jest.mock('../../api', () => ({
  getDemandForecast: jest.fn()
}));

describe('ForecastDisplay', () => {
  const mockForecastData = {
    location: 'Plano',
    forecast: [
      { ds: '2024-01-15', yhat: 45.2, yhat_lower: 38.1, yhat_upper: 52.3 },
      { ds: '2024-01-16', yhat: 46.5, yhat_lower: 39.2, yhat_upper: 53.8 }
    ],
    recommendations: [
      {
        ds: '2024-01-20',
        yhat: 65.8,
        recommendation: '! High demand spike forecasted; review inventory and procurement !',
        location: 'Plano'
      }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and display forecast data when location changes', async () => {
    getDemandForecast.mockResolvedValue(mockForecastData);

    const { rerender } = render(<ForecastDisplay location="Plano" />);

    // Should show loading initially
    expect(screen.getByText(/Loading forecast/i)).toBeInTheDocument();

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText(/Demand Forecast - Plano/i)).toBeInTheDocument();
    });

    // Verify API was called with correct location
    expect(getDemandForecast).toHaveBeenCalledWith('Plano');

    // Change location
    getDemandForecast.mockResolvedValue({
      ...mockForecastData,
      location: 'Addison'
    });

    rerender(<ForecastDisplay location="Addison" />);

    // Should fetch new data
    await waitFor(() => {
      expect(getDemandForecast).toHaveBeenCalledWith('Addison');
    });
  });

  it('should display error message when API fails', async () => {
    getDemandForecast.mockRejectedValue(new Error('Network error'));

    render(<ForecastDisplay location="Plano" />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch forecast/i)).toBeInTheDocument();
    });
  });

  it('should display error when API returns error', async () => {
    getDemandForecast.mockResolvedValue({ error: 'No data available' });

    render(<ForecastDisplay location="Plano" />);

    await waitFor(() => {
      expect(screen.getByText(/No data available/i)).toBeInTheDocument();
    });
  });

  it('should display recommendations when available', async () => {
    getDemandForecast.mockResolvedValue(mockForecastData);

    render(<ForecastDisplay location="Plano" />);

    await waitFor(() => {
      expect(screen.getByText(/Recommendations/i)).toBeInTheDocument();
      expect(screen.getByText(/High demand spike/i)).toBeInTheDocument();
    });
  });

  it('should not fetch when location is not provided', () => {
    render(<ForecastDisplay location={null} />);

    expect(getDemandForecast).not.toHaveBeenCalled();
  });
});

