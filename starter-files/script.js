/* 
STEPS

- Extract all selectors, create helper functions
- Read through the APIs documentation and understand what needs to be included and create generic paramaters object
- Regiter event listeners, fetch the data per the use's input
- Output results to the UI (success and error)
- Adjust UI states accordingly
*/
const submitButton = document.querySelector("#submit");
const input = document.querySelector("#input");
const errorSpan = document.querySelector("#error");
const resultsContainer = document.querySelector("#results");

const endpoint = "https://en.wikipedia.org/w/api.php?";
const params = {
  origin: "*",
  format: "json",
  action: "query",
  prop: "extracts",
  exchars: 250,
  exintro: "exintro",
  explaintext: true,
  generator: "search",
  gsrlimit: 20,
};

const disableUi = () => {
  input.disabled = true;
  submitButton.disabled = true;
};

const enableUi = () => {
  input.disabled = false;
  submitButton.disabled = false;
};

const clearPreviousResults = () => {
  resultsContainer.innerHTML = "";
  errorSpan.innerHTML = "";
};

const isInputEmpty = (input) => {
  if (!input || input === "") return true;
  return false;
};

const showError = (error) => {
  errorSpan.innerHTML = `${error}`;
};

const showResults = () => {};

const getData = async () => {
  const userInput = input.value;
  if (isInputEmpty(userInput)) return;

  params.gsrsearch = userInput;
  disableUi();

  try {
    const { data } = await axios.get(endpoint, { params });
    console.log(data);

    if (data.error) throw new Error(data.error.info);
  } catch (error) {
    showError(error);
  } finally {
    enableUi;
  }
};

const handlerKeyEvent = (e) => {
  if (e.key === "Enter") {
    getData();
  }
};

const registerEventHandlers = () => {
  input.addEventListener("keydown", handlerKeyEvent);
  submitButton.addEventListener("click", getData);
};

registerEventHandlers();
