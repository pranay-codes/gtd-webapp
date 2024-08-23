import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchNextActionItems } from './api';

describe('fetchNextActionItems', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should fetch the next action items successfully', async () => {
    // Arrange: Set up the mock response
    const data = [
      {
        title: 'Item 1',
        dueDate: '2024-08-01',
        context: 'Work',
        details: 'Detail 1',
      },
      {
        title: 'Item 2',
        dueDate: '2024-08-05',
        context: 'Home',
        details: 'Detail 2',
      },
    ];
    mock.onGet('http://localhost:5000/nextActionItems').reply(200, data);

    // Act: Call the function
    const response = await fetchNextActionItems();

    // Assert: Check if the response is as expected
    expect(response.data).toEqual(data);
  });

  it('should handle an empty list of next action items', async () => {
    // Arrange: Mock an empty array response
    mock.onGet('http://localhost:5000/nextActionItems').reply(200, []);

    // Act: Call the function
    const response = await fetchNextActionItems();

    // Assert: Check if the response is an empty array
    expect(response.data).toEqual([]);
  });

  it('should handle a 404 error', async () => {
    // Arrange: Mock a 404 response
    mock.onGet('http://localhost:5000/nextActionItems').reply(404);

    // Act & Assert: Call the function and expect an error
    await expect(fetchNextActionItems()).rejects.toThrow(
      'Request failed with status code 404'
    );
  });

  it('should handle network errors', async () => {
    // Arrange: Mock a network error
    mock.onGet('http://localhost:5000/nextActionItems').networkError();

    // Act & Assert: Call the function and expect an error
    await expect(fetchNextActionItems()).rejects.toThrow('Network Error');
  });
});
