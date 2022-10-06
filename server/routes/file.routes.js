const Router = require("express");
const router = new Router();
const fs = require("fs");
const Image = require("../models/Image");

router.post("/", async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: "Файл не был загружен" });
    }
    const { folder } = req.headers;
    const path = `${__dirname}/../../client/public/img/marketItems/${folder}/`;
    const file = req.files.file;
    newFileName = Date.now() + "." + file.name.split(".")[1];
    file.mv(path + newFileName);
    const newImage = await Image.create({
      name: newFileName,
      straightPath: path,
      htmlPath: `img/marketItems/${folder}/${newFileName}`,
    });
    res.status(200).send(newImage);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
router.patch("/", async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: "Файл не был загружен" });
    }
    const { data } = req.headers;
    const file = req.files.file;
    const image = await Image.findById(data);
    const newFileName = Date.now() + "." + file.name.split(".")[1];

    await fs.unlink(image.straightPath + image.name, (err) => {
      if (err) {
        console.log(err);
      }
    });
    const path = image.htmlPath.split("/");
    console.log(path);
    path.pop();
    path.push(newFileName);
    console.log(path);

    file.mv(image.straightPath + newFileName);
    const updatedImage = await Image.findByIdAndUpdate(
      image._id,
      {
        name: newFileName,
        straightPath: image.straightPath,
        htmlPath: path.join("/"),
      },
      {
        new: true,
      }
    );
    res.send(updatedImage);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { data } = req.body;
    const removedImage = await Image.findById(data);
    await removedImage.remove();

    fs.unlink(removedImage.straightPath + removedImage.name, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.status(201).json({ message: "Файл удалён" });
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
