export default {
  items: [
    // {
    //   name: 'Page404',
    //   url: '/page404',
    //   icon: 'icon-speedometer',
    //   badge: {
    //     variant: 'info',
    //   },
    // },
    {
      title: true,
      name: 'Navigation',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Users Info',
      url: '/Base/Forms',
      icon: 'icon-pencil',
    },
    {
      name: 'Meeting History',
      url: '/Base/Tables',
      icon: 'icon-drop',
    },
  


  ],
};
