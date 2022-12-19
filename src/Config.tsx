export const SERVER_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "http://ec2-3-83-151-62.compute-1.amazonaws.com:8080";
