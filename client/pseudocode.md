## Note

- If a user is authenticated, and the browser is refreshed, the user is redirected back to login route which is not meant to be.
 This is because refreshing the browser resets the state back to its initial. A solution to this is to use the `useEffect` method which is going to continually make request every time it's re-rendered in order to guarantee that the user is authenticated or not.