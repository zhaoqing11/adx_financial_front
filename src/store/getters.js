const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  winWidth: state => state.app.winWidth,
  winHeight: state => state.app.winHeight,
  showSidebar: state => state.app.showSidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  clientIpInfo: state => state.user.clientIpInfo
};
export default getters;
