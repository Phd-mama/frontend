import { GET } from '../api/experts/route'; 
import { NextResponse } from 'next/server';
import fetchMock from 'jest-fetch-mock';

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data) => ({ json: () => data })),
  },
}));

describe('GET /api/experts', () => {
  jest.setTimeout(10000); // 10 detik
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should return experts data successfully', async () => {
    const mockData = [{ id: 1, name: "Expert 1" }, { id: 2, name: "Expert 2" }];
    
    // Mock the API response
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const result = await GET();
    const json = await result.json();

    expect(result).toBeInstanceOf(Object);  // Mocked response
    expect(json).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("https://puanpakar.cs.ui.ac.id/api/experts/");
  });

  it('should return error when fetch fails', async () => {
    fetchMock.mockReject(new Error("API is down"));

    const result = await GET();
    const json = await result.json();

    expect(json).toEqual({ error: "Failed to fetch data" });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
