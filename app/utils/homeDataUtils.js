function getHomeConfigData() {
  return {
    main_image: "http://cdn.zhimiao-culture.com/00-首页顶部banner.jpg",
    four_icon: [ {
      name: "上新",
      image_url: "http://cdn.zhimiao-culture.com/上新.png"
    }, {
      name: "折扣",
      image_url: "http://cdn.zhimiao-culture.com/折扣.png"
    }, {
      name: "系列",
      image_url: "http://cdn.zhimiao-culture.com/系列.png"
    }, {
      name: "我们",
      image_url: "http://cdn.zhimiao-culture.com/我们.png"
    } ],
    video_source: {
      url: "http://cdn.zhimiao-culture.com/视频图.jpg",
      type: "image"
    }
  };
}

module.exports = {
  getHomeConfigData
};
