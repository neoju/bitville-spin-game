export default defineNuxtRouteMiddleware((to) => {
  const { currentUser } = storeToRefs(useAuthStore());

  if (to?.path === "/" && !currentUser.value) {
    abortNavigation();
    return navigateTo("/welcome");
  }
});
