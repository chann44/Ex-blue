// import { NextFunction, Response } from "express";

// export const RequestMetricsMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const start = Date.now();

//   res.on("finish", () => {
//     const duration = (Date.now() - start) / 1000; // Convert to seconds
//     requestCount.inc({
//       route: req.path,
//       code: res.statusCode.toString(),
//       method: req.method,
//     });
//     requestsDuration.observe(
//       { route: req.path, code: res.statusCode.toString(), method: req.method },
//       duration
//     );
//   });

//   next();
// };
