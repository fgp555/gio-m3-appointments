import { Request, Response, NextFunction } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers;
  if (token === "autenticado") next();
  else res.status(400).json({ message: "error falta autenticacion" });
  // console.log(token);
};

export default auth;
