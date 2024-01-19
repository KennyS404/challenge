import env from "react-dotenv";
import axios from 'axios';
import { MOCK_MENU_DETAILS, MOCK_VENUE_DETAILS } from "./mock";

export const fetchVenueDetails = async () => {
  try {
    const response = await axios.get(`${env.VENUE_API_URL}`);
    return response.data;
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Returning MOCK_MENU_DETAILS", MOCK_MENU_DETAILS);
        return MOCK_VENUE_DETAILS;
      
    }
    throw error;
  }
};

export const fetchMenuDetails = async () => {
  try {
    const response = await axios.get(`${env.MENU_API_URL}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Returning MOCK_MENU_DETAILS", MOCK_MENU_DETAILS);
        return MOCK_MENU_DETAILS;
      
    }
    throw error;
  }
};
;



