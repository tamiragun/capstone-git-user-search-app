export const getData = async (url) => {
  try {
    //Call the endpoint
    const response = await fetch(url);
    const jsonResponse = await response.json();
    //Return the response
    return jsonResponse;
    //If the request is unsuccessful, print the error message to the console
  } catch (err) {
    console.log(err);
  }
};
