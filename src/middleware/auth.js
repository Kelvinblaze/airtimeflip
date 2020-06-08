// Middleware for Auth
export default function auth({ next, router }) {
  if (!localStorage.getItem("airtimeFlipToken")) {
    return router.push({ name: "login" });
  }

  return next();
}
