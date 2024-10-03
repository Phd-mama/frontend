import { GET } from '../src/app/api/experts/route'; 
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
    const mockData = [
      { name: "Dr. Siti Aisyah", bio: "Researcher in climate change", expertise: "Environmental Science" },
      { name: "Dr. Sarah Amanda", bio: "Expert in artificial intelligence and machine learning.", expertise: "Artificial Intelligence" },
      { name: "Dr. Amelia Novita", bio: "Specialist in bioinformatics and genomic data analysis.", expertise: "Bioinformatics" },
      { name: "Prof. Anisa Pratiwi", bio: "Expert in renewable energy systems and environmental engineering.", expertise: "Renewable Energy" },
      { name: "Dr. Maya Kartika", bio: "Focus on research in human-computer interaction.", expertise: "Human-Computer Interaction" },
      { name: "Prof. Dian Permata", bio: "Expert in cybersecurity and digital privacy.", expertise: "Cybersecurity" },
      { name: "Dr Taylor Swift", bio: "A singer and Popstar", expertise: "singer" }
    ];

    // Mock the API response
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const result = await GET();
    const json = await result.json();

    expect(result).toBeInstanceOf(Object); 
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
