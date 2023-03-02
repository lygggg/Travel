export const removeValueFromQueries = (
  value: string,
  currentQueries: string[],
) => {
  return currentQueries.filter((element) => element !== value);
};

export const addQueriesToUrlParams = (
  urlParams: URLSearchParams,
  query: string,
  values: string[],
) => {
  values.forEach((value) => {
    urlParams.append(query, value);
  });
};

export const searchFilterAndExecute = (value: string, query: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  const currentQueries = urlParams.getAll(query);

  if (currentQueries.includes(value)) {
    urlParams.delete(query);
    const updateQueries = removeValueFromQueries(value, currentQueries);
    addQueriesToUrlParams(urlParams, query, updateQueries);
  } else {
    addQueriesToUrlParams(urlParams, query, [value]);
  }
  return urlParams;
};
