/* eslint-disable no-console */
import axios from 'axios';

// export default async function getDiaryList() {
//   try {
//     const response = await axios.get('/api/diaryList');
//     console.log(response.data)
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

export default function getDiaryList() {
  return axios.get('/api/diaryList')
}
