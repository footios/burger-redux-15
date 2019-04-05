
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