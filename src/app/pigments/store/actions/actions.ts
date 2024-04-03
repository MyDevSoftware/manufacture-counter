import { pigmentsSlice } from '../slice/slice';
//repository
import pigmentsRepository from '../../repository/pigments-repository';
//types
import type {
  AppThunk,
  IChangeItemAdditionalSettingActionPayload,
  IClearItemActionPayload,
  IIncDecActionPayload,
} from '../../../../types';

const { increment, decrement, log, clearItem, clearData, changeItemAdditionalSetting } =
  pigmentsSlice.actions;

const incrementAction =
  (action: IIncDecActionPayload): AppThunk =>
  (dispatch, getState) => {
    dispatch(increment(action));

    const newLog = {
      log: action.logText ? action.logText : `+${action.value.toString()}`,
      counterName: action.counterName,
      UNID: action.UNID,
    };

    dispatch(log(newLog));
    pigmentsRepository.sendData(getState().pigments);
  };

const decrementAction =
  (action: IIncDecActionPayload): AppThunk =>
  (dispatch, getState) => {
    dispatch(decrement(action));

    const newLog = {
      log: action.logText ? action.logText : `-${action.value.toString()}`,
      counterName: action.counterName,
      UNID: action.UNID,
    };

    dispatch(log(newLog));
    pigmentsRepository.sendData(getState().pigments);
  };

const clearItemDataAction =
  (action: IClearItemActionPayload): AppThunk =>
  (dispatch, getState) => {
    const clearedItem = pigmentsRepository.getDefaultItemData(action.item.UNID);
    dispatch(clearItem({ item: clearedItem }));

    pigmentsRepository.sendData(getState().pigments);
  };

const clearDataAction = (): AppThunk => (dispatch) => {
  const clearedItem = pigmentsRepository.getDefaultData();
  dispatch(clearData(clearedItem));

  pigmentsRepository.clearData();
};

const changeItemAdditionalSettingAction =
  (action: IChangeItemAdditionalSettingActionPayload): AppThunk =>
  (dispatch, getState) => {
    dispatch(changeItemAdditionalSetting(action));
    pigmentsRepository.sendData(getState().pigments);
  };

export {
  incrementAction,
  decrementAction,
  clearItemDataAction,
  clearDataAction,
  changeItemAdditionalSettingAction,
};
