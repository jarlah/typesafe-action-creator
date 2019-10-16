/**
 * This super nice method enables us to create dirt cheap and simple typesafe action creators.
 *
 * for example:
 *
 * const setName = createAction("SET_NAME")<string>();
 *
 * const action1 = setName("Jarl"); // compiles
 *
 * const action2 = setName(1); // does NOT compile
 *
 * in addition you can say that the payload is void, not having to specify it
 *
 * const doStuff = createAction("DO_STUFF")<void>();
 *
 * const action3 = doStuff(); // compiles, because of void above
 *
 * for all actions created by this method you get a getType(): T and toString(): T method.
 *
 * switch(action) {
 *     case doStuff.getType():
 *       // do stuff
 *       break:
 *     default:
 *       break;
 * }
 *
 * @param type
 */
export function createStandardAction<T extends string>(type: T) {
  function createActionCreator<P, M>() {
    const constructor = (payload: P, meta: M) => {
      return { type, payload, meta };
    };
    return Object.assign(constructor, {
      getType: () => type,
      toString: () => type,
    });
  }
  return <P = void, M = void>() => createActionCreator<P, M>();
}

/**
 * This extra function lets you create an object containing predefined functions for request, success and failure.
 *
 * Like so:
 *
 * const loadUserById = createAsyncAction(
 *   "LOAD_USER_BY_ID_START",
 *   "LOAD_USER_BY_ID_SUCCESS",
 *   "LOAD_USER_BY_ID_FAILURE",
 * )<void, User, Error>();
 *
 * const successAction = loadUserById.success(someUser);
 * const failureAction = loadUserById.failure(new Error());
 * const requestAction = loadUserById.request();
 *
 * @param request constant type string
 * @param success constant type string
 * @param failure constant type string
 */
export function createAsyncAction<TR extends string, TS extends string, TF extends string>(
  request: TR,
  success: TS,
  failure: TF,
) {
  return <Request = void, Success = void, Failure = void>() => ({
    failure: createStandardAction(failure)<Failure>(),
    request: createStandardAction(request)<Request>(),
    success: createStandardAction(success)<Success>(),
  });
}
