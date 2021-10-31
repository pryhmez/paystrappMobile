import openSocket from 'socket.io-client';
import store from './configureStore';

// const store = getStore();

const socket = openSocket('http://192.168.0.115:8080', {
  query: {token: '3749384208402'},
});

socket.on('connect', () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx

  socket.on('INCOMING_SLOT', (data, currentTime, cb) => {
    const newDate = new Date(data.dateCreated);
    const startTime = newDate.getTime();
    const endTime = startTime + 86400000;
    const tickedSeconds = ((currentTime - startTime) / 1000).toFixed(0);
    let timer = 0;
    let count = 0;

    var remainder = tickedSeconds;
    

    for (i = 0; i < data.slots.length; i++) {
      if (data.slots[i] < remainder) {
        // console.log("===========")
        remainder = remainder - data.slots[i];
        console.log(remainder)
      } else {
        timer = data.slots[i] - remainder;
        count = i
        console.log(timer)
        break;
      }
    }

    const date = new Date(currentTime);
    const date2 = new Date(startTime);
    const date3 = new Date(1634176282078);
    // console.log(date.getHours(), date.getMinutes(), date.getSeconds());
    // console.log(date2.getHours(), date2.getMinutes(), date2.getSeconds());
  // console.log(date3.getSeconds());
  // var seconds = ((1634176282078) / 1000).toFixed(0);
  // console.log(seconds)

    const payload = {
      type: 'REGISTER_TIME_SLOT',
      startTime,
      userId: data.userId,
      timeSlot: data.slots,
      count,
      timer,
      endTime,
      currentTime,
      tickedSeconds,
    };
    store.dispatch(payload);

    // console.log(payload);

    // console.log(data);
    console.log(store.getState());
    cb('recieved');
  });
});

function privateMessenger(message, cb) {
  socket.emit('privatemessage', message, response => {
    cb(response);
  });
}
export {privateMessenger, socket};
