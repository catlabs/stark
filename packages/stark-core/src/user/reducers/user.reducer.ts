import { StarkUserActions, StarkUserActionTypes } from "../actions";
import { StarkUser } from "../entities";

export const starkUserStoreKey: string = "starkUser";

const INITIAL_STATE: undefined = undefined;

export function userReducer(
	state: Readonly<StarkUser[]> | undefined = INITIAL_STATE,
	action: StarkUserActions
): Readonly<StarkUser[]> | undefined {
	// the new state will be calculated from the data coming in the actions
	/* tslint:disable:no-small-switch */
	switch (action.type) {
		case StarkUserActionTypes.GET_ALL_USERS_SUCCESS:
			return action.users;

		default:
			return state;
	}
	/* tslint:enable */
}
