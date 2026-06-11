import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  // Stores the currency code typed by the user
  const [value, setValue] = useState("");

  // Stores exchange rates returned by the API
  const [rates, setRates] = useState(null);

  // Stores the selected currency used to trigger API requests
  const [currency, setCurrency] = useState(null);

  // Fetch exchange rates whenever currency changes
  useEffect(() => {
    console.log("effect run, currency is now", currency);

    // Skip API request on initial render
    if (currency) {
      console.log("fetching exchange rates");

      axios
        .get(`https://open.er-api.com/v6/latest/${currency}`)
        .then((response) => {
          // Store exchange rates returned by the API
          setRates(response.data.rates);
        });
    }
  }, [currency]);

  // Keep input field synchronized with React state
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // Trigger currency search
  const onSearch = (event) => {
    event.preventDefault();

    // Updating currency triggers useEffect
    setCurrency(value);
  };

  return (
    <div>
      <form onSubmit={onSearch}>
        currency: <input value={value} onChange={handleChange} />
        <button type="submit">exchange rate</button>
      </form>

      {/* Display exchange rates once data is available */}
      {rates && <pre>{JSON.stringify(rates, null, 2)}</pre>}
    </div>
  );
};

export default App;

/*
==============================================================================
FILE ROLE
==============================================================================

File Type:
React Function Component

Responsibility:

- Collect user input
- Trigger currency searches
- Fetch exchange rates from an external API
- Store API data in React state
- Render exchange rate results

Depends On:

- React
- useState
- useEffect
- axios
- Exchange Rate API

Used By:

- main.jsx (or parent component)

Architecture Position:

User Input
    ↓
React State
    ↓
useEffect
    ↓
HTTP Request
    ↓
External API
    ↓
React State
    ↓
UI

This component handles both UI logic and API communication.

*/

/*
==============================================================================
RUNTIME FLOW
==============================================================================

Initial Render

App()
    ↓

value = ""
rates = null
currency = null

    ↓

JSX returned
    ↓
UI displayed
    ↓
useEffect runs

currency === null

    ↓

No API request

--------------------------------------------------

User Types "USD"

Input Event
    ↓
handleChange()
    ↓
setValue("USD")
    ↓
React schedules re-render
    ↓
App() executes again
    ↓
Input displays "USD"

--------------------------------------------------

User Clicks "exchange rate"

Form Submit
    ↓
onSearch()
    ↓
event.preventDefault()
    ↓
setCurrency("USD")
    ↓
React schedules re-render
    ↓
App() executes again

currency = "USD"

    ↓

useEffect dependency changed
    ↓
useEffect runs
    ↓
axios.get(...)
    ↓
HTTP request sent

--------------------------------------------------

API responds

Promise resolves
    ↓
.then(...)
    ↓
setRates(response.data.rates)
    ↓
React schedules re-render
    ↓
App() executes again
    ↓
rates now contains exchange rates
    ↓
JSON displayed on screen

*/

/*
==============================================================================
DATA FLOW
==============================================================================

User Input
    ↓
value state
    ↓
setCurrency(value)
    ↓
currency state
    ↓
useEffect
    ↓
axios.get(...)
    ↓
Exchange Rate API
    ↓
response.data.rates
    ↓
setRates(...)
    ↓
rates state
    ↓
JSON.stringify(...)
    ↓
Browser UI

This is a complete example of:

User Input
    ↓
State
    ↓
Side Effect
    ↓
External API
    ↓
State
    ↓
UI

*/

/*
==============================================================================
ASYNC FLOW
==============================================================================

Synchronous Flow

User clicks button
    ↓
setCurrency(...)
    ↓
React re-render

--------------------------------------------------

Asynchronous Flow

useEffect
    ↓
axios.get(...)
    ↓
HTTP request leaves browser

JavaScript continues running.

The browser does NOT wait.

--------------------------------------------------

Later...

API responds
    ↓
Promise resolves
    ↓
.then(...)
    ↓
setRates(...)
    ↓
React re-renders

This is why exchange rates appear after a delay.

*/

/*
==============================================================================
REACT INTERNALS
==============================================================================

State Updates

setValue(...)
setCurrency(...)
setRates(...)

do NOT immediately update the UI.

Instead:

setState(...)
    ↓
React stores new state
    ↓
Schedules re-render
    ↓
App() executes again
    ↓
New JSX created
    ↓
React compares old and new trees
    ↓
(Reconciliation)
    ↓
DOM updated if necessary

--------------------------------------------------

useEffect

Dependency Array:

[currency]

means:

Run effect:

- After initial render
- Whenever currency changes

Do NOT run when:

- value changes
- rates changes

Only currency matters.

*/

/*
==============================================================================
DEBUGGING GUIDE
==============================================================================

Common Issue:

Nothing appears on screen.

Possible Causes:

1. API request failed

Check:

Network Tab
    ↓
Request Status
    ↓
Response Body

--------------------------------------------------

2. Invalid currency code

Example:

"ABC"

The API may return unexpected data.

Log:

console.log(response.data)

--------------------------------------------------

3. Effect not running

Check:

console.log("effect run", currency)

If you never see the log:

- currency was never updated
- onSearch may not be firing

--------------------------------------------------

Useful Debug Logs:

console.log("value", value);

console.log("currency", currency);

console.log("rates", rates);

Focus on verifying:

Input
    ↓
State
    ↓
Request
    ↓
Response
    ↓
UI

*/

/*
==============================================================================
MENTAL MODEL
==============================================================================

Think of this component as a currency lookup machine.

User enters currency
    ↓
Presses search button
    ↓
Machine remembers selected currency
    ↓
Machine contacts exchange-rate service
    ↓
Service returns data
    ↓
Machine stores results
    ↓
Machine displays results

React State acts like the machine's memory.

useEffect acts like the worker that watches
for currency changes and performs the API request.

*/

/*
==============================================================================
PRODUCTION CONNECTIONS
==============================================================================

This pattern appears frequently in real applications.

Examples:

- Weather applications
- Stock market dashboards
- Cryptocurrency trackers
- Search systems
- Product catalogs
- Analytics dashboards

Common production improvements:

- Loading indicators
- Error handling
- Request cancellation
- Debouncing user input
- Caching responses
- Service layer abstraction

Current:

Component
    ↓
axios
    ↓
API

Production-Oriented:

Component
    ↓
Currency Service
    ↓
axios
    ↓
API

This separation improves maintainability.

*/
