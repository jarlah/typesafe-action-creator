# Typesafe Action Creator

[![NPM](https://nodei.co/npm/typesafe-action-creator.png)](https://nodei.co/npm/typesafe-action-creator/)

This super simple library enables you to create dirt cheap and simple typesafe action creators, that uses type inference and no dark magic or type tricks.

For example:

```
const setName = createAction("SET_NAME")<string>();

const action1 = setName("Jarl"); // compiles

const action2 = setName(1); // does NOT compile
```

in addition you can omit payload type and it will create an action creator that renders an empty action, with no payload value or type.

```
const doStuff = createAction("DO_STUFF")();

const action3 = doStuff(); // compiles, because of no type provided above
```

for all action creators created by this library you get a getType(): T and toString(): T method. This is especially handy in reducers. You will never have to think about those type constants again.

```
switch(action.type) {
 case doStuff.getType():
   // do stuff
   break:
 default:
   break;
}
```

You can also create an async action creator object, containing three action creator functions, request, success and failure.

```
const loadUserById = createAsyncAction(
  "LOAD_USER_BY_ID_START",
  "LOAD_USER_BY_ID_SUCCESS",
  "LOAD_USER_BY_ID_FAILURE",
)<void, User, Error>();

const successAction = loadUserById.success(someUser);
const failureAction = loadUserById.failure(new Error());
const requestAction = loadUserById.request();
```

Have fun!
