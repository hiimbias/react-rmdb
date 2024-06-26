// Convert time to hours and minutes
export const calcTime = time => {
  const hours = Math.floor(time / 60);
  const mins = time % 60;
  return `${hours}h ${mins}m`;
};
// Convert a number to money formatting
export const convertMoney = money => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
  return formatter.format(money);
};


export const isPersistedState = stateName => {
  const sessionState = sessionStorage.getItem(stateName);
  return sessionState && JSON.parse(sessionState);
}

// ** stateName is the key to store the state in the session storage and retrieve it later
// ** sessionStorage.getItem() method is used to get the value of the specified Storage Object item.
//*! isPersistedState is a helper function that retrieves the state from the session storage using the provided stateName as the key. If the state exists, it parses the JSON string and returns the resulting JavaScript object.

// The sessionStorage property allows you to access a session Storage object for the current origin. sessionStorage is similar to localStorage; the only difference is while data stored in localStorage has no expiration time, data stored in sessionStorage gets cleared when the page session ends. A page session lasts as long as the browser is open, and survives over page reloads and restores. Opening a page in a new tab or window will cause a new session to be initiated.
