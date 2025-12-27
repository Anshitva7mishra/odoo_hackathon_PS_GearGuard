export function roleRedirect(role) {
  if (role === "technician") return "/maintenance";
  return "/dashboard";
}
