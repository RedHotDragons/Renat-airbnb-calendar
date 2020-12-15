
import http from 'k6/http';
import { check, sleep } from 'k6';
export let options = {
  // vus: 10,
  // stages: [
  //   {duration: '5s', target: 20},
  //   {duration: '30s', target: 10000},
  //   {duration: '5s', target: 0},
  // ]
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1100,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '20s',
      preAllocatedVUs: 1100, // how large the initial pool of VUs would be
      maxVUs: 5000, // if the preAllocatedVUs are not enough, we can initialize more
    }
  }
};
export default function () {
  let res = http.batch( [
    ['GET','http://127.0.0.1:3002/api/calendar/listings/4900']
  ]);
  sleep(1);
}
// k6 run script.js