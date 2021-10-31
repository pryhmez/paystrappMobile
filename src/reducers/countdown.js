

const initialState = {
  currentTime: '',
  startTime: '',
  endTime: '',
  userId: '',
  // userId: '5e7a5fe9e8763909af2975a4',
  timeSlot: [],
  count: 0,
  timer: '',
  tickedSeconds: '' 
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'REGISTER_TIME_SLOT':
      return {
        ...state,
        startTime: action.startTime,
        userId: action.userId,
        timeSlot: action.timeSlot,
        count: action.count,
        endTime: action.endTime,
        timer: action.timer,
        currentTime: action.currentTime,
        tickedSeconds: action.tickedSeconds      
      };
      break;
    case 'TICK_TIMER':
      if(state.timer == 0) {
        return {
          ...state,
          timer: state.timeSlot[state.count + 1],
          count: state.count + 1
        }
      } else {

        return {
          ...state,
          timer: state.timer-1
        }
      }
        break;
    case 'RESET_TIMER':
      return {
        ...state,
        timer: state.timeSlot[state.count],
      };
    case 'SET_COUNT':
      return {
        ...state,
        count
      }
    default:
      return state;
  }


}





