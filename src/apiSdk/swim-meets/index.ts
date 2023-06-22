import axios from 'axios';
import queryString from 'query-string';
import { SwimMeetInterface, SwimMeetGetQueryInterface } from 'interfaces/swim-meet';
import { GetQueryInterface } from '../../interfaces';

export const getSwimMeets = async (query?: SwimMeetGetQueryInterface) => {
  const response = await axios.get(`/api/swim-meets${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSwimMeet = async (swimMeet: SwimMeetInterface) => {
  const response = await axios.post('/api/swim-meets', swimMeet);
  return response.data;
};

export const updateSwimMeetById = async (id: string, swimMeet: SwimMeetInterface) => {
  const response = await axios.put(`/api/swim-meets/${id}`, swimMeet);
  return response.data;
};

export const getSwimMeetById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/swim-meets/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSwimMeetById = async (id: string) => {
  const response = await axios.delete(`/api/swim-meets/${id}`);
  return response.data;
};
