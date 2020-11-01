import { ActionCreator } from "redux";

export enum RobotActionTypes {
  ROBOT_LOAD = "ROBOT_LOAD",
}

export type robotLoadAction = {
  type: RobotActionTypes.ROBOT_LOAD;
};

export const robotLoadAction: ActionCreator<robotLoadAction> = () => ({
  type: RobotActionTypes.ROBOT_LOAD,
});
