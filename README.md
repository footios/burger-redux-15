
[React 16.6 - The Complete Guide (incl. React Router & Redux)](https://www.udemy.com/react-the-complete-guide-incl-redux/)

> Section 15

> Adding Redux to our Project

> Lectures 296 - 305

> Section 17

> Adding Redux to our Project

> Lectures 322 - 343


> Section 18

> Adding Authentication to our Burger Project

> Lectures 344 - 365


> Section 19

> Improving our Burger Project

> Lectures 366 - 374


> Section 20

> Testing 

> Lectures 375 - 386


> Section 21

> Deploying the App to the Web

> Lectures 387 - 392

Time for all sections (1 -21, with repetitions) 
320 hours 
in 2 1/2 (two and a half) months.



> Section 25

> Bonus: A Brief Introduction to Redux Saga

> Lectures 340 - 451

Sometimes we have code in the action creators...
but you could make the argument that you want action creators 
or the whole idea of dispatching actions
to be very clean, that you don't want to have any other code in there 
which is not really related to dispatching
an action and this is where `redux saga` comes in.

With `redux-saga`,
you create so-called `sagas` which are essentially kind of `functions` 
which you run up on certain actions
and which handle all your side effect logic 
and a side effect simply is something like 
accessing local storage, reaching out to a server, 
maybe changing the route or executing a timer like this here.


### Comments

443. 
When logoutAuth is dispatched (from another action like `authCheckState`) we dispatch the AUTH_INITIATE_LOGOUT action, 
which then via `yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)` in
`watchAuth` calls `logoutSaga`. And `watchAuth` can listen to actions of the store,
because of this `sagaMiddleware.run(watchAuth)` in index.js of our app.

444. 
We could delete all our action creators. But we keep them to have a reliable way of creating our actions. So, now we can call action creators from our `sagas`, instead of hard-coding `actionTypes`.
Also when we can call a `saga` via action creators, by creating an `actionType` which will be returned 
by an action creator. Then `watchAuth` will listen to this action and call our `saga`. Note that in the the action creators, we can pass actions which then will be also passed to the sagas! Needless to say if we don't put the `actionType` in our reducer, it never listens to it! Note too that the `yield` `takeEvery` functions in the `watchAuth` don't run sequentially. So the order doesn't matter.
