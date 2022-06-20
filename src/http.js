import axios from "axios";

/**
 * @description generic http function that takes a URL and returns the response data.
 * 
 * @param {string} url - string URL input from the user.
 * @returns {Promise | never} xml response (contains xml Locations).
 */

export default async function fetchFrom(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log({error, origin: '[http] fetchFrom(url)', parameter: url});
  }
}