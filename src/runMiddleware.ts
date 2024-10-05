// import Cors from 'cors';

// // Initialize the cors middleware with your app's origin
// const cors = Cors({
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   origin: 'http://localhost:8081', // Adjust this to match your app's domain
// });

// export function runMiddleware(req: any, res: any, fn: any) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result: any) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// }

// export default cors;