const express = require("express");
const router = express.Router();

// Example: Home Page
router.get("/", (req, res) => {
  fetch("http://localhost:3000/api/books") // 替换为实际的 API 地址
    .then((response) => {
      // 检查响应状态
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // 将响应解析为 JSON 格式
    })
    .then((data) => {
      console.log("Books data:", data); // 打印获取到的书籍数据
      //res.render(view, data)
      //"home" is the view file name
      //{ title: "Home Page" } will be sent to view file
      res.render("home", { title: "Home Page", data: JSON.stringify(data) });
    })
    .catch((error) => {
      console.error("Failed to fetch books:", error); // 处理错误
    });
});

module.exports = router;
