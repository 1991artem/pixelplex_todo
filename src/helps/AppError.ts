class AppError extends Error {
  statusCode: number;
  constructor(message: string, code = 500) {
    super(message);
    this.statusCode = code;
  }
}

export default AppError;
