import fetch from "node-fetch";

exports.handler = async (event, context) => {
  const apiUrl = "https://swapi.dev/api";
  const { queryStringParameters } = event;

  const urlParams = new URLSearchParams(queryStringParameters).toString();
  const fetchUrl = urlParams ? `${apiUrl}?${urlParams}` : apiUrl;

  try {
    const response = await fetch(fetchUrl);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
  } catch (err) {
    console.error("Error proxying request:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error proxying request" }),
    };
  }
};
